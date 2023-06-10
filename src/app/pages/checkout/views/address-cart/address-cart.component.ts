import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressService } from 'src/core/services/address.service';

@Component({
  selector: 'app-address-cart',
  templateUrl: './address-cart.component.html',
  styleUrls: ['./address-cart.component.css'],
})
export class AddressCartComponent implements OnInit {
  userAddress: any;
  showSucsessToast: boolean = false;
  toastSucsessMessage: string = '';
  showErrToast: boolean = false;
  toastErrMessage: string = '';
  isAddressFormSubmitted: boolean = false;

  constructor(private addressService: AddressService) {}

  ngOnInit() {}
  addressForm = new FormGroup({
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    neighborhood: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
  });
  onSubmit() {
    if (this.addressForm.invalid) {
      return;
    }
    this.addressService.post(this.addressForm.value).subscribe({
      next: (address) => {
        this.isAddressFormSubmitted = true;
        this.toastSucsessMessage = 'تم حفظ البيانات بنجاح';
        this.toggleSucsessToast();
      },
      error: (err) => {
        this.toastErrMessage = err.message || 'خطأ غير متوقع';
        this.toggleErrToast();
      },
      complete: () => {},
    });
  }
  getUserAddress(): void {
    this.addressService.get().subscribe({
      next: (address) => {
        this.userAddress = address;
      },
      error: (err) => {
        this.toastErrMessage = err.message || 'خطأ غير متوقع';
        this.toggleErrToast();
      },
      complete: () => console.log('complete'),
    });
  }
  resetForm() {
    this.addressForm.reset();
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
}
