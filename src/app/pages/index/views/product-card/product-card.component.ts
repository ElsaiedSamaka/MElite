import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/core/services/cart.service';
import { FavService } from 'src/core/services/fav.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: any = {
    colors: [],
    sizes: [],
  };
  showQuickViewModal: boolean = false;
  showToastMssg: boolean = false;
  productId: any;

  constructor(
    private cartService: CartService,
    private favService: FavService
  ) {}

  ngOnInit() {}
  productCardForm = new FormGroup({
    colors: new FormArray(this.product.colors, [Validators.required]),
    sizes: new FormArray(this.product.sizes, [Validators.required]),
  });
  postCartItem(product: any): void {
    this.product = product;
    // TODO: if the product already exist in the cart items update its quantity instead
    // TODO: check the availablity of product and if it's not available will prevent posting cartItem
    let cartItem = {
      productId: product.id,
      quantity: 1,
      price: product.price,
      colors: this.productCardForm.get('colors').value.join(','),
    };

    this.cartService.post(cartItem).subscribe({
      next: (cartItem) => {
        // this.cartItems = this.cartService.items$.value;
      },
      error: (err) => {
        console.log('error while posting cart item', err);
        this.showQuickViewModal = false;
        this.toggleToastMssg();
      },
      complete: () => {
        this.showQuickViewModal = false;
      },
    });
  }
  favProduct(product: any): void {
    this.product = product;
    let favItem = {
      productId: product.id,
    };
    this.favService.post(favItem).subscribe({
      next: (res) => {
        if (res.authentication == false) this.toggleToastMssg();
      },
      error: (err) => {
        console.log('error while fav a product', err);
      },
      complete: () => {},
    });
  }
  handleColorChange(e: any) {
    let colorArr = this.productCardForm.get('colors') as FormArray;
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
  handleSizeChange(e: any) {
    let sizeArr = this.productCardForm.get('sizes') as FormArray;
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
  toggleQuickViewModal(product?: any) {
    this.showQuickViewModal = !this.showQuickViewModal;
    this.product = product;
  }
  dismissQuickViewModal() {
    this.showQuickViewModal = !this.showQuickViewModal;
  }
  toggleToastMssg(): void {
    this.showToastMssg = !this.showToastMssg;
    setTimeout(() => {
      this.showToastMssg = false;
    }, 3000);
  }
}
