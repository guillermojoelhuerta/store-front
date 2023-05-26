
import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private onSubject = new Subject<{ key: string, value: any }>();
  constructor() { }

  clearAllStorage() {
    localStorage.removeItem("token");                 
    for (let i = 0; i < localStorage.length; i++) {
      localStorage.removeItem(""+ localStorage.key(i) +"");           
    }                                                                                                                   
  }     

  public storeKey(key: string, data: any): void {
    localStorage.setItem(key, data);
    this.onSubject.next({ key: key, value: data });
  }

  public getKey(key: string){
    return localStorage.getItem(key);
  }

  public clearKey(key: any) {
    localStorage.removeItem(key);
    this.onSubject.next({ key: key, value: null });
  }
}
