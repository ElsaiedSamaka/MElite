import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/core/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;
  showQuickViewModal: boolean = false;
  showToastMssg: boolean = false;

  constructor(private cartService: CartService) {}

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
