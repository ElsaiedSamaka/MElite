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
  showQuickViewModal: boolean = false;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getProducts();
    this.getCategories();
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
  postCartItem(product: any): void {
    this.product = product;
    // TODO: if the product already exist in the cart items update its quantity instead
    // TODO: check the availablity of product and if it's not available will prevent posting cartItem
    // TODO: reach to the current user through usersService or authSerivce and get current user
    // and replace the hard coded userId with current user id
    let cartItem = {
      productId: product.id,
      quantity: 1,
      userId: 1,
    };
    if (cartItem.productId == this.productId) {
      console.log("repeat")
    } else {
      console.log("not repeat")
    }
    this.productId = product.id
    this.cartService.post(cartItem).subscribe({
      next: (cartItem) => {},
      error: (err) => {
        console.log('error while posting cart item', err);
      },
      complete: () => {},
    });
  }
  increaseCartItemQty(id: string, cartItem: any): void {
    const updatedCartItem = {
      ...cartItem,
      quantity: cartItem.quantity + 1,
    };
    this.cartService.put(id, updatedCartItem).subscribe({
      next: (updatedCartItem) => {
        // this.cartItems = this.cartService.items$.value;
      },
      error: (err) => {
        console.log('error while updateCartItem', err);
      },
      complete: () => {},
    });
  }
  toggleQuickViewModal(product: any) {
    this.product = product;
    this.showQuickViewModal = !this.showQuickViewModal;
  }
}
