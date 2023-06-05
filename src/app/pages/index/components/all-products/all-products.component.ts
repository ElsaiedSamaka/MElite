import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/core/services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  products: any[] = [];
  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.getAllProducts();
  }
  getAllProducts(): void {
    this.productsService.getAll().subscribe((res) => {
      this.products = this.productsService.products$.value;
    });
  }
}
