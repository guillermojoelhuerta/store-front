import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { from, Observable, throwError    } from 'rxjs';
import { environment } from '../../../environments/environment'; 
import { Apunte } from '../models/Apunte.model';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2'; 
      
@Injectable({
  providedIn: 'root'
})
export class ApunteService {

  constructor(private http: HttpClient) { }

  crearApunte(apunte: any){      
    return this.http.post<Apunte>(`${environment.url_api}/apuntes/save-apunte`,apunte);
  }

  getTodos(queryParams: HttpParams): Observable<Apunte[]>{     
    return this.http.get<Apunte[]>(`${environment.url_api}/apuntes/get-apuntes`,{params:queryParams});
  }   
  
  getBusqueda(body:any){ 
    return this.http.post(        
      `${environment.url_api}/apuntes/get-busqueda`,
      body
    );                     
  }                      

  getById(id: number){        
    return this.http.get<Apunte>(`${environment.url_api}/apuntes/get-apunte-by-id/`+id);
  }
        
  update(apunte:any){           
    return this.http.put<Apunte>(`${environment.url_api}/apuntes/update-apunte`, apunte);
  } 
            
  eliminarApunte(id: number){           
    return this.http.delete(`${environment.url_api}/apuntes/delete-apunte/`+id, {responseType:'text'});
  }

  eliminarArchivo(archivo_usuario: any){           
    return this.http.post(        
      `${environment.url_api}/apuntes/delete-archivo`,archivo_usuario,                   
      {responseType:'text'}
    );
  }       
  
  downloadFile(body:any){                        
    return this.http.post(`${environment.url_api}/apuntes/download-file`, body, {responseType: 'blob'}).pipe(
        map((res: Blob) => {         
          const filename = body.filename;                                            
          let a = document.createElement("a");
          a.href = URL.createObjectURL(res); 
          a.setAttribute("download", filename);
          a.click();                                   
        }), catchError((error:any) => {
            let errorMessage = ''; 
            error.text().then((text:any) => {    
            const err = JSON.parse(text);             
            console.log(err["errorMessage"]);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err["errorMessage"]
            })
          });    
          return throwError(() => {
            return "Error no se puede descargar el archivo";      
          });      
        })   
      );
  } 
                   
  handleError(error:any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
        return errorMessage;
    });           
  }

}
