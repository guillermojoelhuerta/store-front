import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Product } from '@app/core/models/Product.model';
import { ImageProduct } from '@app/core/models/ImageProduct.model';
import { SearchPagination } from '@app/core/models/SearchPagination.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getById(id: number){
    return this.http.get<Product>(`${environment.url_api}/product/get-product-by-id/`+id)
          .pipe(
            catchError(this.handleError)
          );
  }

  getByIdPublic(id: number){
    return this.http.get<Product>(`${environment.url_api}/product_p/get-product-by-id/`+id)
          .pipe(
            catchError(this.handleError)
          );
  }

  createProduct(product: any){
    return this.http.post<Product>(`${environment.url_api}/product/create-product`, product)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProductsPage(data: SearchPagination){
    return this.http.post<Product>(`${environment.url_api}/product/get-products-page`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProductsPageP(data: SearchPagination){
    return this.http.post<Product>(`${environment.url_api}/product_p/get-products-page`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProduct(product: any){
    return this.http.put<Product>(`${environment.url_api}/product/update-product`, product);
  }

  deleteProduct(imageProduct: ImageProduct){
    return this.http.post(`${environment.url_api}/product/delete-product`, imageProduct)
    .pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse){
    return throwError(error);
  }
}
