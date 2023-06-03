import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { ProductsService } from '../services/products.service';

@Injectable({
  providedIn: 'root',
})
export class ProductResolverService implements Resolve<any> {
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}
  resolve(route: ActivatedRouteSnapshot) {
    const { id } = route.params;
    return this.productsService.getById(id).pipe(
      catchError((err) => {
        console.log(err);
        this.router.navigateByUrl('index/not-found');
        return EMPTY;
      })
    );
  }
}
