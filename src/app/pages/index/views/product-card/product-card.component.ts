import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/core/services/cart.service';
import { FavService } from 'src/core/services/fav.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;
  showQuickViewModal: boolean = false;
  showToastMssg: boolean = false;
  productId: any;

  constructor(
    private cartService: CartService,
    private favService: FavService
  ) {}

  ngOnInit() {}
  postCartItem(product: any): void {
    this.product = product;
    // TODO: if the product already exist in the cart items update its quantity instead
    // TODO: check the availablity of product and if it's not available will prevent posting cartItem
    let cartItem = {
      productId: product.id,
      quantity: 1,
    };

    this.cartService.post(cartItem).subscribe({
      next: (cartItem) => {
        // this.cartItems = this.cartService.items$.value;
      },
      error: (err) => {
        console.log('error while posting cart item', err);
        this.toggleToastMssg();
      },
      complete: () => {},
    });
  }
  favProduct(product: any): void {
    this.product = product;
    let favItem = {
      productId: product.id,
    };
    this.favService.post(favItem).subscribe({
      next: (favProduct) => {
        console.log(favProduct);
      },
      error: (err) => {
        console.log('error while fav a product', err);
        this.toggleToastMssg();
      },
      complete: () => {},
    });
  }
  unfavProduct(favProductId: string): void {
    this.favService.delete(favProductId).subscribe({
      next: (res) => {},
      error: (err) => {
        console.log('error while unfav product', err);
      },
      complete: () => {},
    });
  }
  toggleQuickViewModal(product?: any) {
    this.showQuickViewModal = !this.showQuickViewModal;
    this.product = product;
  }
  dismissQuickViewModal() {
    this.showQuickViewModal = !this.showQuickViewModal;
  }
  toggleToastMssg(): void {
    this.showToastMssg = !this.showToastMssg;
  }
}
