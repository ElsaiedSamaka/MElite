import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/core/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: any = {
    colors: [],
    sizes: [],
  };
  showWarnToast: boolean = false;
  toastWarnMessage: string = '';
  showErrToast: boolean = false;
  toastErrMessage: string = '';
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getProduct();
  }
  productCardForm = new FormGroup({
    colors: new FormArray(this.product.colors, [Validators.required]),
    sizes: new FormArray(this.product.sizes, [Validators.required]),
  });
  getProduct() {
    this.route.data.subscribe((data) => {
      this.product = data['product'];
    });
  }

  postCartItem(product: any): void {
    this.product = product;
    let cartItem = {
      productId: product.id,
      quantity: 1,
      price: product.price,
      colors: this.productCardForm.get('colors').value.join(','),
    };
    if (!this.productAlreadyExistOnCart()) {
      this.cartService.post(cartItem).subscribe({
        next: (cartItem) => {
          // this.cartItems = this.cartService.items$.value;
        },
        error: (err) => {
          console.log('error while posting cart item', err);
          this.toastWarnMessage = 'يلزم تسجيل الدخول';
          this.toggleWarnToast();
        },
        complete: () => {},
      });
    } else {
      this.toastErrMessage = 'المنتج موجود بالفعل بالسلة';
      this.toggleErrToast();
    }
  }
  productAlreadyExistOnCart(): boolean {
    let alreadyExist = this.cartService.items$.value.find(
      (item) => item.productId == this.product.id
    );
    if (alreadyExist) return true;
    return false;
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
  toggleWarnToast(): void {
    this.showWarnToast = !this.showWarnToast;
    setTimeout(() => {
      this.showWarnToast = false;
    }, 3000);
  }
  toggleErrToast(): void {
    this.showErrToast = !this.showErrToast;
    setTimeout(() => {
      this.showErrToast = false;
    }, 3000);
  }
}
