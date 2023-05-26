import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CategoryService } from '@app/shared/services/category.service';
import { ErrorResponse } from '@app/core/models/ErrorResponse.model';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent implements OnInit {

  constructor(private categoryService: CategoryService){}

  ngOnInit(){
  }

  createCategoryForm : FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  saveData(){
    if (this.createCategoryForm.valid) {
      this.categoryService.saveCategory(this.createCategoryForm.value).subscribe((response:any) => {
        this.createCategoryForm.reset();
      },(error: ErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          //html: error.errorMessage.join('<br>')
          html: error.errorMessage
        });
      });
    }
  }
}
