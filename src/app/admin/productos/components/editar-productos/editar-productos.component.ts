import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { CategoryService } from '@app/shared/services/category.service';
import { Category } from '@app/core/models/Category.model';
import { ImageProduct } from '@app/core/models/ImageProduct.model';
import { ProductService } from '@app/shared/services/product.service';
import { Product } from '@app/core/models/Product.model';
import { StorageService } from '@app/shared/services/storage.service';
import { ErrorResponse } from '@app/core/models/ErrorResponse.model';
import Swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.css']
})
export class EditarProductosComponent implements OnInit{
  id!: number;
  updateProduct: FormGroup = new FormGroup({
    idCategory: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0), Validators.max(10000), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    amount: new FormControl('', [Validators.required, Validators.min(0), Validators.max(10000), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    description: new FormControl('', [Validators.required])
  });
  catCategorias : Category[] = [];
  images: File[] = [];
  image:  File = new File([], '');
  @ViewChild('imageInput', {static: false})
  imageInput!: ElementRef;
  img: String = '';
  imageProduct!: ImageProduct;

  constructor(
    private CategoryService : CategoryService,
    private productService: ProductService,
    private storage: StorageService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params : Params) =>{
      this.id = params["id"];
    });

    this.CategoryService.getCategoriesList()
    .pipe(
      mergeMap((res:Category[]) => {
        this.catCategorias = res;
        return this.productService.getById(this.id)
      })
    ).subscribe((res2:Product) => {
      if(res2.imageProduct !== undefined) {
        this.imageProduct = res2.imageProduct;
      }
      this.img = `${environment.url_api}/uploads/` + res2.imageProduct?.name;
      this.updateProduct.patchValue({
        idCategory : res2.categories?.[0]?.idCategory,
        name: res2.name,
        price: res2.price,
        amount: res2.amount,
        description: res2.description
      });
    },(error: ErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.errorMessage
        })
    });
  }

  changeSelect(){
    const idCategory = this.updateProduct.value.idCategory;
    const result: Category = this.catCategorias.find( item =>{
      return item["idCategory"] == idCategory;
    }) as Category;
    return result;
  }

  saveProduct(){

    const idUsuario = Number(this.storage.getKey('idUsuario'));
    const categories: Category[] = [this.changeSelect()];

    const product : Product = {
      idProduct: this.id,
      name: this.updateProduct.value.name,
      price: this.updateProduct.value.price,
      amount: this.updateProduct.value.amount,
      description: this.updateProduct.value.description,
      idUsuario: idUsuario
    }

    let formData = new FormData();

    this.images.forEach((image:File) => {
      formData.append("images", image);
    });
    formData.append("product", JSON.stringify(product));
    formData.append("categories", JSON.stringify(categories));
    formData.append("imageProduct", JSON.stringify(this.imageProduct));
    this.productService.updateProduct(formData).subscribe((res: Product) => {
        if(res.imageProduct !== undefined && res.imageProduct !== null) {
          this.imageProduct = res.imageProduct;
        }
        if(this.images.length > 0 && res.imageProduct?.name){
          this.img = `${environment.url_api}/uploads/` + res.imageProduct?.name;
          this.images = [];
        }
        Swal.fire(
          {
            icon: 'success',
            title: 'Se ha actualizado exitosamente!!'
          }
        );
        this.imageInput.nativeElement.value = '';
    });
  }

  imageChangeEvent(event: any){
    this.images = [];
    for(let x = 0; x < event.target.files.length; x++){
      this.images.push(event.target.files[x]);
    }
  }

}
