import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CategoryService } from '@app/shared/services/category.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit{
  id!: number;
  categoryForm : FormGroup = new FormGroup({
    idCategory: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    active: new FormControl('', Validators.required)
  });
  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(){
    this.activatedRoute.params.subscribe((params : Params) =>{
      this.id = params["id"];
    });
    this.categoryService.getCategoryById(this.id).subscribe((res: any) =>{
      this.categoryForm.setValue(res);
    },((error: any) => {
      alert(error);
    }));
  }

  saveData(){
    if (this.categoryForm.valid) {
      this.categoryService.updateCategory(this.categoryForm.value).subscribe((response:any) => {
        console.log("response = ", response);
        Swal.fire(
          {
            icon: 'success',
            title: 'Se ha actualizado exitosamente!!'
          }
        );
      },(error: any) => {
        console.log("error = ", error);
      });
    }
  }
}
