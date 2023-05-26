import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Pagination } from '@app/core/models/Pagination.model';
import { Product } from '@app/core/models/Product.model';
import { ProductService } from '@app/shared/services/product.service';
import { SearchPagination } from '@app/core/models/SearchPagination.model';
import { CategoryService } from '@app/shared/services/category.service';
import { Category } from '@app/core/models/Category.model';
import { ErrorResponse } from '@app/core/models/ErrorResponse.model';
import { environment } from '../../../../../environments/environment';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import * as fromActions from '../../ngrx/pagination.actions';
import { PaginationState } from '../../ngrx/pagination.state';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit{
  searchByCategory = false;
  searchForm = this.fb.group({
    searchBy: new FormControl('', [Validators.required]),
    search: new FormControl('', [Validators.required]),
    categoryValue: new FormControl('')
  });
  products: Array<Product[]> = [];
  catCategorias : Category[] = [];
  itemsPerPage = 12;
  sortBy = "name,desc";
  pagination: Pagination = {
    page: 0,
    itemsPerPage: this.itemsPerPage,
    totalElements: 0,
    totalPages: 0,
    sortBy: this.sortBy
  };
  img = `${environment.url_api}/uploads/`;
  searchBusquedaNGRX!: SearchPagination;
  constructor(
    private fb: FormBuilder,
    private productservice: ProductService,
    private CategoryService : CategoryService,
    private store: Store<PaginationState>,
  ){}

  ngOnInit(){
    this.getCategories();
    this.store.select('pagination').subscribe((res :any)=>{
      this.searchBusquedaNGRX = res.pagination;
    });
    let searchBusquedaInicio = this.setSearchPagination();
    if(searchBusquedaInicio.searchBy !== this.searchBusquedaNGRX?.searchBy ||
      searchBusquedaInicio.search !== this.searchBusquedaNGRX?.search ||
      searchBusquedaInicio.page !== this.searchBusquedaNGRX?.page ||
      searchBusquedaInicio.size !== this.searchBusquedaNGRX?.size ||
      searchBusquedaInicio.sortBy !== this.searchBusquedaNGRX?.sortBy){
      this.searchForm.controls['searchBy'].setValue(this.searchBusquedaNGRX.searchBy ?? '');
      this.searchForm.controls['search'].setValue(this.searchBusquedaNGRX.search ?? '');
      searchBusquedaInicio = this.searchBusquedaNGRX;
    }
    this.getAllSearch(searchBusquedaInicio);
    this.searchValueChanged();
  }

  resetPagination(){
    this.pagination = {
      page: 0,
      itemsPerPage: this.itemsPerPage,
      totalElements: 0,
      totalPages: 0,
      sortBy: this.sortBy
    };
  }

  setSearchPagination() : SearchPagination {
    const search = this.getCategoryValue();
    const searchPagination: SearchPagination = {
      searchBy: this.searchForm.value.searchBy ?? '',
      search: search,
      page: this.pagination.page,
      size: this.pagination.itemsPerPage,
      sortBy: this.sortBy
    };
    return searchPagination;
  }

  getCategories(){
    this.CategoryService.getCategoriesListPublic().subscribe((response: Category[]) =>{
      this.catCategorias = response;
    },((error: ErrorResponse) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.errorMessage
      });
    }));
  }

  searchValueChanged(){
    const searchBy = this.searchForm.controls['searchBy'];
    const search = this.searchForm.controls['search'];
    const categoryValue = this.searchForm.controls['categoryValue'];
    searchBy.valueChanges.subscribe((value: any) => {
        if(value === 'category') {
            this.searchByCategory = true;
            categoryValue.setValidators([Validators.required]);
            search.clearValidators();
        }else{
            this.searchByCategory = false;
            categoryValue.clearValidators();
            search.setValidators([Validators.required]);
        }
        categoryValue.updateValueAndValidity();
        search.updateValueAndValidity();
    });
}

  getCategoryValue(){
    let search = this.searchForm.value.search ?? '';
    const idCategory = Number(this.searchForm.value.categoryValue);
    if(this.searchForm.value.searchBy === 'category'){
      const resultado = this.catCategorias.find( current => current.idCategory === idCategory );
      search = resultado?.name ?? '';
    }
    return search;
  }

  paginate(value: number){
    if(value < this.pagination.totalPages){
      this.pagination.page = value;
      const setSearchPagination = this.setSearchPagination();
      this.getAllSearch(setSearchPagination);
    }
  }

  getProductsPage(){
    this.resetPagination();
    const searchPagination = this.setSearchPagination();
    this.getAllSearch(searchPagination);
  }

  getAllSearch(searchPagination: SearchPagination){
    this.store.dispatch(fromActions.set({ value: searchPagination }));
    this.productservice.getProductsPageP(searchPagination).subscribe((res: any) => {
      const filas = Math.trunc(res.content.length / 3) + (res.content.length % 3);
      let arrayProduct = new Array<Product[]>(filas);
      let cont = 1;
      let product: Product;
      for(let x = 0; x < arrayProduct.length; x++){
        arrayProduct[x] = new Array<Product>(3);
        for(let y = 0; y < arrayProduct[x].length; y++){
          if( cont > res.content.length){
            product =  {
              idProduct: 0,
              name: '',
              price: 0,
              amount: 0,
              description: '',
              idUsuario: 0
            };
          }else{
            product = res.content[cont-1];
          }
          arrayProduct[x][y] = product;
          cont++;
        }
      }
      this.products = arrayProduct;

      this.pagination = {
        page: res.number,
        itemsPerPage: this.itemsPerPage,
        totalElements: res.totalElements,
        totalPages: res.totalPages,
        sortBy: this.sortBy
      };
    },(error: ErrorResponse)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.errorMessage
      });
    });
  }

  clean(){
    this.searchForm.controls["searchBy"].setValue("");
    this.searchForm.controls["search"].setValue("");
    this.searchForm.controls["categoryValue"].setValue("");
    this.getProductsPage();
  }
}
