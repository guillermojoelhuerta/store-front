import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Category } from '@app/core/models/Category.model';
import { SearchPagination } from '@app/core/models/SearchPagination.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategoryById(id: number){
    return this.http.get(`${environment.url_api}/category/delete-category-by-id/`+id)
    .pipe(
      catchError(this.handleError)
    );
  }

  getCategories(searchPagination: SearchPagination){
    return this.http.post(`${environment.url_api}/category/get-categories-page`, searchPagination)
    .pipe(
      catchError(this.handleError)
    );
  }

  getCategoriesList(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.url_api}/category/get-categories-list`).pipe(
      map((data: Category[]) => {
        return data;
      }), catchError(this.handleError)
    );
  }

  getCategoriesListPublic(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.url_api}/product_p/get-categories-list`)
    .pipe(
      catchError(this.handleError)
    );
  }

  saveCategory(category: Category){
    return this.http.post(`${environment.url_api}/category/save-category`, category)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateCategory(category: Category){
    return this.http.put<Category>(`${environment.url_api}/category/update-category`, category)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteCategory(id: number){
    return this.http.delete(`${environment.url_api}/category/delete-category-by-id/`+id,
    { responseType: 'json'});
  }

  handleError(error: HttpErrorResponse){
    return throwError(error);
  }
}
