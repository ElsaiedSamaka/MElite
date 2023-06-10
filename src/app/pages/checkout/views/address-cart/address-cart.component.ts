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
      next: (address) => console.log(address),
      error: (err) => console.log(err),
      complete: () => console.log('complete'),
    });
    console.log(this.addressForm.value);
  }
  getUserAddress(): void {
    this.addressService.get().subscribe({
      next: (address) => (this.userAddress = address),
      error: (err) => console.log(err),
      complete: () => console.log('complete'),
    });
  }
}
