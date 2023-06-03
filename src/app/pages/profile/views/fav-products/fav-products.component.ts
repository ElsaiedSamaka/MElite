import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fav-products',
  templateUrl: './fav-products.component.html',
  styleUrls: ['./fav-products.component.css'],
})
export class FavProductsComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log('favProduct');
  }
}
