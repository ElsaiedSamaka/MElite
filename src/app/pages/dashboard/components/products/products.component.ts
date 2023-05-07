import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/core/services/categories.service';
import { ProductsService } from 'src/core/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [CategoriesService],
})
export class ProductsComponent implements OnInit {
  products: any[];
  categories: any[] = [];
  categoryId: string = '';
  showCategoryFilterDDL: boolean = false;
  showAddProductModal: boolean = false;
  showEditProductModal: boolean = false;
  showDeleteProductModal: boolean = false;
  showToast: boolean = false;
  productId: string = '';
  itemsToDisplay: any[] = [];
  size: number = 2;
  currentPage = 0;
  totalPages: number = 0;
  totalItems: number = 0;
  available: any;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService
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
        size || this.size,
        available
      )
      .subscribe((res) => {
        this.products = this.productsService.products$.value;
        this.totalItems = res['totalItems'];
        this.totalPages = res['totalPages'];
        this.currentPage = res['currentPage'];
        this.itemsToDisplay = this.products.slice(0, this.size);
      });
  }
  getCategories() {
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
  getProductsByCategory(id: string) {
    this.categoryId = id;
    this.productsService.getByCategory(id).subscribe({
      next: (res) => {
        this.products = res['rows'];
        this.itemsToDisplay = this.products.slice(0, this.size);
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
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.maxLength(2000)]),
    image: new FormControl('', [Validators.required]),
    product_img: new FormControl('', [Validators.required]),
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
    image: new FormControl('', [Validators.required]),
    product_img: new FormControl('', [Validators.required]),
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
    this.getProducts(this.currentPage, this.size, this.available);
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
    // const formData = new FormData();
    // formData.append('image', this.addProductForm.get('product_img').value);

    if (this.addProductForm.invalid) return;
    this.productsService.post(this.addProductForm.value).subscribe({
      next: () => {
        this.toggleToast();
        this.addProductForm.reset();
      },
      error: (err) => {
        console.log('err', err);
        // this.toggleAddProductModal();
      },
      complete: () => {
        this.toggleAddProductModal();
      },
    });
    console.log('addProductForm', this.addProductForm.value);
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
        this.toggleToast();
        this.editProductForm.reset();
      },
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {
        this.toggleEditProductModal();
      },
    });
  }
  onDeleteProductSubmit() {
    this.productsService.deleteById(this.productId).subscribe({
      next: () => {
        this.toggleToast();
        this.toggleDeleteProductModal();
      },
      error: (err) => {
        this.toggleDeleteProductModal();
        console.log('err', err);
      },
      complete: () => {
        this.products = this.products.filter(
          (product) => product.id !== this.productId
        );
        this.itemsToDisplay = this.products.slice(0, this.size);
      },
    });
  }
  toggleCategoryFilterDDL() {
    this.getCategories();
    this.showCategoryFilterDDL = !this.showCategoryFilterDDL;
  }
  toggleAddProductModal() {
    this.getCategories();
    this.showAddProductModal = !this.showAddProductModal;
  }
  toggleEditProductModal(product?) {
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
  toggleToast() {
    this.showToast = !this.showToast;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
  toggleDeleteProductModal(product?) {
    this.showDeleteProductModal = !this.showDeleteProductModal;
    if (product) {
      this.productId = product.id;
    }
  }
  handleItemsLength(e) {
    this.size = e.target.value;
    this.getProducts(this.currentPage, this.size, this.available);
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
