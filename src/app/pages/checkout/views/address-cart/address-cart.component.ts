import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressService } from 'src/core/services/address.service';
import { DataService } from '../../service/data.service';

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
  isAddressSubmitted: boolean = true;

  constructor(
    private addressService: AddressService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataService.isAddressSubmitted$.next(false);
    this.dataService.isAddressSubmitted$.subscribe((value) => {
      this.isAddressSubmitted = value;
    });
  }
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
    this.dataService.isAddressSubmitted$.next(true);
    this.addressService.post(this.addressForm.value).subscribe({
      next: (address) => {
        this.toastSucsessMessage = 'تم حفظ البيانات بنجاح';
        this.toggleSucsessToast();
        this.toggleAddressForm();
      },
      error: (err) => {
        console.log('but why?', err);
      },
      complete: () => {},
    });
  }
  getUserAddress(): void {
    this.addressService.get().subscribe({
      next: () => {},
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
  toggleAddressForm(): void {
    this.dataService.isAddressSubmitted$.next(
      !this.dataService.isAddressSubmitted$.value
    );
    this.dataService.isAddressSubmitted$.subscribe((value) => {
      this.isAddressSubmitted = value;
    });
    if (!this.isAddressSubmitted) {
      this.addressForm.get('state').enable();
      this.addressForm.get('city').enable();
      this.addressForm.get('neighborhood').enable();
      this.addressForm.get('street').enable();
    } else {
      this.addressForm.get('state').disable();
      this.addressForm.get('city').disable();
      this.addressForm.get('neighborhood').disable();
      this.addressForm.get('street').disable();
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
}
