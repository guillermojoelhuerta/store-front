import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '@app/shared/services/category.service';
import { Category } from '@app/core/models/Category.model';
import { ProductService } from '@app/shared/services/product.service';
import { Product } from '@app/core/models/Product.model';
import { ErrorResponse } from '@app/core/models/ErrorResponse.model';
import { SoloNumbersDirective } from '@app/shared/directives/solo-numbers.directive';
import { NumerosPuntoyComaDirective } from '@app/shared/directives/numeros-puntoy-coma.directive';
import { MascaraMonedaDirective } from '@app/shared/directives/mascara-moneda.directive';
import { StorageService } from '@app/shared/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.css']
})
export class CrearProductosComponent implements OnInit{
  createProduct: FormGroup = new FormGroup({
    idCategory: new FormControl('', [Validators.required]),
    name: new FormControl(''),
    //price: new FormControl('', [Validators.required, Validators.min(0), Validators.max(10000), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    price: new FormControl('', [Validators.required]),
    amount:  new FormControl('', {
      validators: [Validators.required, Validators.min(0), Validators.max(10000), SoloNumbersDirective.validaNumber]
    }),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });
  catCategorias : Category[] = [];
  images: File[] = [];
  image:  File = new File([], '');
  @ViewChild('imageInput', {static: false})
  imageInput!: ElementRef;
  @ViewChild(MascaraMonedaDirective) mascaraMoneda!: MascaraMonedaDirective;

  constructor(
    private categoryService : CategoryService,
    private productService: ProductService,
    private storage: StorageService
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategoriesList().subscribe((res: Category[]) => {
      this.catCategorias = res;
    });
  }

  cambiarSelect(){
    const idCategory = this.createProduct.value.idCategory;
    const result: Category = this.catCategorias.find( item =>{
      return item["idCategory"] == idCategory;
    }) as Category;
    return result;
  }

  saveProduct(){
    const idUsuario = Number(this.storage.getKey('idUsuario'));
    const categories: Category[] = [this.cambiarSelect()];
    const price = this.mascaraMoneda.clearMask(this.createProduct.value.price);
    const product : Product = {
      name: this.createProduct.value.name,
      price: parseFloat(price),
      amount: this.createProduct.value.amount,
      description: this.createProduct.value.description,
      idUsuario: idUsuario
    }

    let formData = new FormData();

    this.images.forEach((image:File) => {
      formData.append("images", image);
    });
    formData.append("product", JSON.stringify(product));
    formData.append("categories", JSON.stringify(categories));
    this.productService.createProduct(formData).subscribe((res: Product) => {
        console.log("crearProducto", res);
        this.images = [];
        Swal.fire(
          {
            icon: 'success',
            title: 'Se ha registrado exitosamente!!'
          }
        );
        this.createProduct.reset();
        this.createProduct.controls['idCategory'].setValue('');
        this.imageInput.nativeElement.value = '';
    },(error: ErrorResponse)=>{
      let porciones = error.errorMessage.split('.');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: porciones.join('.<br>')
      });
    });
  }

  imageChangeEvent(event: any){
    this.images = [];
    for(let x = 0; x < event.target.files.length; x++){
      this.images.push(event.target.files[x]);
    }
  }
}
