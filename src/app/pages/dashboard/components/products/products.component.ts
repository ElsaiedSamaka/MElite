import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/core/services/categories.service';
import { ColorsService } from 'src/core/services/colors.service';
import { ProductsService } from 'src/core/services/products.service';
import { SizesService } from 'src/core/services/sizes.service';
import { NotzeroNorNegative } from 'src/core/validators/notzero-nor-negative';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [CategoriesService],
})
export class ProductsComponent implements OnInit {
  products: any[];
  categories: any[] = [];
  colors: any[] = [];
  sizes: any[] = [];
  categoryId: string = '';
  showCategoryFilterDDL: boolean = false;
  showAddProductModal: boolean = false;
  showEditProductModal: boolean = false;
  showDeleteProductModal: boolean = false;
  showSucsessToast: boolean = false;
  toastSucsessMessage: string = '';
  showErrToast: boolean = false;
  toastErrMessage: string = '';
  productId: string = '';
  itemsToDisplay: any[] = [];
  perPage: number = 3;
  currentPage = 0;
  totalPages: number = 0;
  totalItems: number = 0;
  available: any;
  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private colorsService: ColorsService,
    private sizesService: SizesService,
    private notzeroNorNegative: NotzeroNorNegative
  ) {}

  ngOnInit() {
    this.getProducts();
  }
  getProducts(
    currentPage?: number,
    size?: number,
    available: any = 'All'
  ): void {
    this.productsService
      .getProducts(
        currentPage || this.currentPage,
        size || this.perPage,
        available
      )
      .subscribe((res) => {
        this.products = this.productsService.products$.value;
        this.totalItems = res['totalItems'];
        this.totalPages = res['totalPages'];
        this.currentPage = res['currentPage'];
        this.itemsToDisplay = this.products
          .slice(0, this.perPage)
          .sort((a, b) => b.id - a.id);
      });
  }
  getCategories(): void {
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => {
        console.log('err while returning categories :', err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
  getColors(): void {
    this.colorsService.getAll().subscribe({
      next: (colors) => {
        this.colors = this.colorsService.colors$.value.map(
          (colors) => colors.name
        );
      },
      error: (err) => {
        console.log('err while returning colors :', err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
  getSizes(): void {
    this.sizesService.getAll().subscribe({
      next: (sizes) => {
        this.sizes = this.sizesService.sizes$.value.map((sizes) => sizes.name);
      },
      error: (err) => {
        console.log('err while returning sizes :', err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
  getProductsByCategory(id: string): void {
    this.categoryId = id;
    this.productsService.getByCategory(id).subscribe({
      next: (res) => {
        this.products = res['rows'];
        this.itemsToDisplay = this.products.slice(0, this.perPage);
      },
      error: (err) => {
        console.log('error', err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
  addProductForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    category: new FormControl('1', [Validators.required]),
    stock: new FormControl('', [Validators.required]),
    price: new FormControl('', [
      Validators.required,
      this.notzeroNorNegative.validate,
    ]),
    description: new FormControl('', [Validators.maxLength(2000)]),
    product_img: new FormControl('', [Validators.required]),
    colors: new FormArray([], [Validators.required]),
    sizes: new FormArray([], [Validators.required]),
  });
  editProductForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    category: new FormControl('1', [Validators.required]),
    stock: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.maxLength(2000)]),
  });
  showOnlyForm = new FormGroup({
    available: new FormControl('All'),
  });
  searchForm = new FormGroup({
    searchControl: new FormControl('', Validators.required),
  });
  handleSearchOverProducts() {
    const term = this.searchForm.controls['searchControl'].value;
    if (this.searchForm.invalid) return;
    this.productsService.search(term).subscribe({
      next: (res) => {
        this.itemsToDisplay = res['products'];
      },
      error: (err) => {
        console.log('err while searching over products', err);
      },
      complete: () => {
        this.searchForm.reset();
      },
    });
  }
  handleShowOnlyToggle() {
    this.available = this.showOnlyForm.controls['available'].value;
    this.getProducts(this.currentPage, this.perPage, this.available);
  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addProductForm.patchValue({
        product_img: file,
      });
    }
  }
  onAddProductSubmit() {
    let model = this.prepareForm();
    if (this.addProductForm.invalid) return;
    this.productsService.post(model).subscribe({
      next: () => {
        this.products = this.productsService.products$.value;
        this.itemsToDisplay = this.products.slice(0, this.perPage);
        this.toastSucsessMessage = 'تم انشاء المنتج بنجاح';
        this.toggleSucsessToast();
        this.addProductForm.reset();
      },
      error: (err) => {
        this.toastErrMessage =
          err.message || 'عفوا , حدث خطأ اثناء انشاء المنتج';
        this.toggleErrToast();
        console.log('err', err);
      },
      complete: () => {
        this.products = this.productsService.products$.value;
        this.itemsToDisplay = this.products
          .slice(0, this.perPage)
          .sort((a, b) => b.id - a.id);
        this.toggleAddProductModal();
      },
    });
  }
  onEditProductSubmit(): void {
    const product = {
      name: this.editProductForm.controls['name'].value,
      category: this.editProductForm.controls['category'].value,
      stock: this.editProductForm.controls['stock'].value,
      price: this.editProductForm.controls['price'].value,
      description: this.editProductForm.controls['description'].value,
    };
    if (this.editProductForm.invalid) return;
    this.productsService.put(this.productId, product).subscribe({
      next: () => {
        this.toastSucsessMessage = 'تم تعديل المنتج بنجاح';
        this.toggleSucsessToast();
        this.editProductForm.reset();
      },
      error: (err) => {
        this.toastErrMessage =
          err.message || 'عفوا , حدث خطأ اثناء تحديث المنتج';
        this.toggleErrToast();
        console.log('err', err);
      },
      complete: () => {
        this.toggleEditProductModal(product);
      },
    });
  }
  prepareForm() {
    let formData = new FormData();
    Object.entries(this.addProductForm.value).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return formData;
  }
  onDeleteProductSubmit() {
    this.productsService.deleteById(this.productId).subscribe({
      next: () => {
        this.toastSucsessMessage = 'تم حذف المنتج بنجاح';
        this.toggleSucsessToast();
        this.toggleDeleteProductModal();
      },
      error: (err) => {
        this.toggleDeleteProductModal();
        this.toastErrMessage = err.message || 'عفوا , حدث خطأ اثناء حذف المنتج';
        this.toggleErrToast();
        console.log('err', err);
      },
      complete: () => {
        this.products = this.products.filter(
          (product) => product.id !== this.productId
        );
        this.itemsToDisplay = this.products.slice(0, this.perPage);
      },
    });
  }
  toggleCategoryFilterDDL() {
    if (!this.showCategoryFilterDDL) {
      this.getCategories();
    }
    this.showCategoryFilterDDL = !this.showCategoryFilterDDL;
  }
  toggleAddProductModal() {
    if (!this.showAddProductModal) {
      this.getCategories();
      this.getColors();
      this.getSizes();
    }
    this.showAddProductModal = !this.showAddProductModal;
  }
  toggleEditProductModal(product?: any) {
    this.getCategories();
    this.showEditProductModal = !this.showEditProductModal;
    if (product) {
      this.productId = product.id;
    }
    this.editProductForm.patchValue({
      name: product.name,
      category: product.categoryId,
      stock: product.stock,
      price: product.price,
      description: product.description,
    });
  }
  handleSizeChange(e: any) {
    let sizeArr = this.addProductForm.get('sizes') as FormArray;
    if (e.target.checked) {
      sizeArr.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      sizeArr.controls.forEach((item) => {
        if (item.value == e.target.value) {
          sizeArr.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  handleColorChange(e: any) {
    let colorArr = this.addProductForm.get('colors') as FormArray;

    if (e.target.checked) {
      colorArr.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      colorArr.controls.forEach((item) => {
        if (item.value == e.target.value) {
          colorArr.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  toggleSucsessToast() {
    this.showSucsessToast = !this.showSucsessToast;
    setTimeout(() => {
      this.showSucsessToast = false;
    }, 4000);
  }
  toggleErrToast() {
    this.showErrToast = !this.showErrToast;
    setTimeout(() => {
      this.showErrToast = false;
    }, 4000);
  }
  toggleDeleteProductModal(product?) {
    this.showDeleteProductModal = !this.showDeleteProductModal;
    if (product) {
      this.productId = product.id;
    }
  }
  handleItemsLength(e) {
    this.perPage = e.target.value;
    this.getProducts(this.currentPage, this.perPage, this.available);
  }
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
  }

  onCopy(event: ClipboardEvent) {
    event.preventDefault();
  }
  public onNext(): void {
    if (this.currentPage === this.totalPages) return;
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getProducts();
    }
  }
  public onPrevious(): void {
    if (this.currentPage === 0) return;
    if (this.currentPage >= 1) {
      this.currentPage--;
      this.getProducts();
    }
  }
}
