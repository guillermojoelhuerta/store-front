import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '@app/shared/services/login.service';
import { StorageService } from '@app/shared/services/storage.service';
import { Credenciales } from '@app/core/models/Credenciales.model';

@Component({
  selector: 'app-acceso',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent {

  error_message: string = '';
  loginForm: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10),
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*#-_\.])[A-Za-z\d$@$!%*#-_\.].{5,10}')])
  });

  constructor(
    private loginService : LoginService,
    private router: Router,
    private storage: StorageService
  ) { }

  ngOnInit(): void {
    this.cerrarSesion();
    this.storage.storeKey('isLogged', false);
  }

  enviarForm(){
    const credenciales: Credenciales = {
      "nombreUsuario": this.loginForm.value.email,
      "password": this.loginForm.value.password
    }
    this.loginService.loguearse(credenciales).subscribe((response: any) => {
      this.storage.storeKey('idUsuario', response["idUsuario"]);
      this.storage.storeKey('token', response["token"]);
      this.storage.storeKey('rol', response.authorities[0].authority);
      this.storage.storeKey('isLogged', true);
      this.loginService.entrar();
      this.router.navigateByUrl("/admin/productos/todos-producto");
    },(error: any) => {
      this.error_message = "Error de acceso.";
      console.log("error", error);
    });
  }

  cerrarSesion(){
    console.log("Borrando datos");
    this.storage.clearAllStorage();
  }
}
