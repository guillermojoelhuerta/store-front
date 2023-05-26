import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Pagination } from '@app/core/models/Pagination.model';
import { Product } from '@app/core/models/Product.model';
import { ErrorResponse } from '@app/core/models/ErrorResponse.model';
import { ImageProduct } from '@app/core/models/ImageProduct.model';
import { SearchPagination } from '@app/core/models/SearchPagination.model';
import { ProductService } from '@app/shared/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todos-productos',
  templateUrl: './todos-productos.component.html',
  styleUrls: ['./todos-productos.component.css']
})
export class TodosProductosComponent implements OnInit{
  products:Product[] = [];
  searchForm = this.fb.group({
    searchBy: new FormControl(''),
    search: new FormControl(''),
  });
  itemsPerPage = 2;
  sortBy = "name,desc";
  pagination: Pagination = {
    page: 0,
    itemsPerPage: this.itemsPerPage,
    totalElements: 0,
    totalPages: 0,
    sortBy: this.sortBy
  };
  constructor(
    private productservice: ProductService,
    private fb: FormBuilder
  ){}

  ngOnInit(){
    this.getProductsPage();
  }

  getProductsPage(){
    this.pagination = {
      page: 0,
      itemsPerPage: this.itemsPerPage,
      totalElements: 0,
      totalPages: 0,
      sortBy: this.sortBy
    };

    const searchPagination: SearchPagination = {
      searchBy: this.searchForm.value.searchBy ?? '',
      search: String(this.searchForm.value.search),
      page: this.pagination.page,
      size: this.pagination.itemsPerPage,
      sortBy: this.sortBy
    };

    this.getTodosBusqueda(searchPagination);
  }

  paginate(value: number){
    if(value < this.pagination.totalPages){
      this.pagination.page = value;
      this.datosPaginados();
    }
  }

  datosPaginados(){
    const searchPagination: SearchPagination = {
      searchBy: this.searchForm.value.searchBy ?? '',
      search: String(this.searchForm.value.search),
      page: this.pagination.page,
      size: this.pagination.itemsPerPage,
      sortBy: this.sortBy
    };
    this.getTodosBusqueda(searchPagination);
  }

  getTodosBusqueda(body: SearchPagination){
    this.productservice.getProductsPage(body).subscribe((res: any) => {
      this.products = res.content;
      this.pagination = {
        page: res.number,
        itemsPerPage: this.itemsPerPage,
        totalElements: res.totalElements,
        totalPages: res.totalPages,
        sortBy: this.sortBy
      };
    },((error: ErrorResponse) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.errorMessage
      });
    }));
  }

  clean(){
    this.searchForm.controls["searchBy"].setValue("");
    this.searchForm.controls["search"].setValue("");
    this.getProductsPage();
  }

  deleteProduct(indice: number, imageProduct: ImageProduct){
    Swal.fire({
      title: 'Estás seguro de eliminar?',
      text: "No podras revertir la situación!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productservice.deleteProduct(imageProduct).subscribe((res: any) =>{
          this.products.splice(indice, 1);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
        },(error: ErrorResponse)=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.errorMessage
          });
        });
      }
    })
  }
}
