import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { CategoryService } from '@app/shared/services/category.service';
import { Category } from '@app/core/models/Category.model';
import { Pagination } from '@app/core/models/Pagination.model';
import { SearchPagination } from '@app/core/models/SearchPagination.model';
import { ErrorResponse } from '@app/core/models/ErrorResponse.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todas-categorias',
  templateUrl: './todas-categorias.component.html',
  styleUrls: ['./todas-categorias.component.css']
})
export class TodasCategoriasComponent implements OnInit {

  categorias: Category[] = [];
  itemsPerPage = 5;
  sortBy = "name,desc";
  pagination: Pagination = {
    page: 0,
    itemsPerPage: this.itemsPerPage,
    totalElements: 0,
    totalPages: 0,
    sortBy: this.sortBy
  };
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.datosPaginados();
  }

  paginaPag(value: number){
    if(value < this.pagination.totalPages){
      this.pagination.page = value;
      this.datosPaginados();
    }
  }

  datosPaginados(){
    this.pagination = {
      page: 0,
      itemsPerPage: this.itemsPerPage,
      totalElements: 0,
      totalPages: 0,
      sortBy: this.sortBy
    };

    const searchPagination: SearchPagination = {
      page: this.pagination.page,
      size: this.pagination.itemsPerPage,
      sortBy: this.sortBy
    };

    this.categoryService.getCategories(searchPagination).subscribe((res: any) =>{
      this.categorias = res.content;
      this.pagination = {
        page: res.number,
        itemsPerPage: this.itemsPerPage,
        totalElements: res.totalElements,
        totalPages: res.totalPages,
        sortBy: this.sortBy
      }
    },(error: ErrorResponse) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: error.errorMessage
      });
    });
  }

  eliminarCategoria(indice : number, categoria : Category){
    const idCategory =  this.categorias[indice]["idCategory"] as number;
    const nombre_categoria = this.categorias[indice]["name"];

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
          this.categoryService.deleteCategory(idCategory).subscribe((res:any) => {
            this.categorias.splice(indice, 1);
            Swal.fire(
              'Deleted!',
              'El registro ha sido eliminado.',
              'success'
            );
          });
        }
      })
  }
}
