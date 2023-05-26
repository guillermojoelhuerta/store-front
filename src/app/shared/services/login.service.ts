import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Credenciales } from '@app/core/models/Credenciales.model';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public isLogged = (this.storage.getKey('isLogged') === "true")?true:false;
  public loggedIn$ = new BehaviorSubject<boolean>(this.isLogged);

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) {}

  ngOnInit(){}

  loguearse(credenciales: Credenciales) {
    return this.http.post(`${environment.url_api}/auth/login`, credenciales);
  }

  get isAuthenticated() {
    return this.loggedIn$.asObservable();
  }

  entrar(){
    this.loggedIn$.next(true);
  }

  salir(){
    this.loggedIn$.next(false);
  }

}
