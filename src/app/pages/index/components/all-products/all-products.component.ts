import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/core/services/categories.service';
import { ProductsService } from 'src/core/services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  showCategoryFilterDDL: boolean = false;
  showPriceSlider: boolean = false;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit() {
    this.getAllProducts();
    this.getCategories();
  }
  getAllProducts(): void {
    this.productsService.getAll().subscribe((res) => {
      this.products = this.productsService.products$.value;
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
  collapseCategries(): void {
    this.showCategoryFilterDDL = !this.showCategoryFilterDDL;
  }
  collapsePrice(): void {
    this.showPriceSlider = !this.showPriceSlider;
  }
}
