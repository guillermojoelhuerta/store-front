import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '@app/shared/services/storage.service';
import { LoginService } from '@app/shared/services/login.service';

@Component({
  selector: 'app-adminlayout',
  templateUrl: './adminlayout.component.html',
  styleUrls: ['./adminlayout.component.css']
})
export class AdminlayoutComponent {
  isLogged!: boolean;
  loggedIn$!: Observable<boolean>;

  constructor(
    private router: Router,
    private storage: StorageService,
    private loginService : LoginService
  ){}

  ngOnInit(){
    this.loggedIn$ = this.loginService.isAuthenticated;
    this.loggedIn$.subscribe(isLogged => {
      this.isLogged = isLogged;
    });
  }

  logout(){
    this.storage.clearAllStorage();
    this.loginService.salir();
    this.router.navigateByUrl("/acceso/login");
  }
}
