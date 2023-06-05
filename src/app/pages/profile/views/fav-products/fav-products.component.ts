import { Component, OnInit } from '@angular/core';
import { FavService } from 'src/core/services/fav.service';

@Component({
  selector: 'app-fav-products',
  templateUrl: './fav-products.component.html',
  styleUrls: ['./fav-products.component.css'],
})
export class FavProductsComponent implements OnInit {
  favProducts: any[] = [];
  constructor(private favService: FavService) {}

  ngOnInit() {
    this.getFavProducts();
  }
  getFavProducts(): void {
    this.favService.getFavProducts().subscribe({
      next: (favProducts) => {
        this.favProducts = this.favService.favProducts$.value;
      },
      error: (err) => {
        console.log('error while returning fav products', err);
      },
      complete: () => {},
    });
  }
  unfavProduct(favProductId: string): void {
    this.favService.delete(favProductId).subscribe({
      next: (res) => {
        this.favProducts = this.favService.favProducts$.value;
      },
      error: (err) => {
        console.log('error while unfav product', err);
      },
      complete: () => {},
    });
  }
}
