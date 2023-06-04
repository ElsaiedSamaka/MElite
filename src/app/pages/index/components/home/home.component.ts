import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/core/services/cart.service';
import { CategoriesService } from 'src/core/services/categories.service';
import { ProductsService } from 'src/core/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: any[];
  categories: any[] = [];
  categoryId: string = '';
  productId: string = '';
  productsToDisplay: any[] = [];
  product: any;
  size: number = 5;
  cartItems: any[] = [];

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getProducts();
    this.getCategories();
    this.cartItems = this.cartService.items$.value;
  }
  getProducts(): void {
    this.productsService.getAll().subscribe((res) => {
      this.products = this.productsService.products$.value;
      this.productsToDisplay = this.products.slice(0, this.size);
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
  getProductsByCategory(id?: string) {
    this.categoryId = id;
    this.productsService.getByCategory(id).subscribe({
      next: (res) => {
        this.products = res['rows'];
        this.productsToDisplay = this.products.slice(0, this.size);
      },
      error: (err) => {
        console.log('error', err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
  // checkIfCartItemExists(cartItems, productId) {
  //   return cartItems.some((cartItem) => cartItem.productId === productId);
  // }
}
