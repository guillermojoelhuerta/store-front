import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorResponse } from '@app/core/models/ErrorResponse.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const tok = localStorage.getItem('token');
    const modified = tok !== null ? request.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + tok
      }
    }) : request;
    return next.handle(modified);
  }

}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log("ErrorInterceptor = ", error)
        let err: ErrorResponse = {
          errorCode : error.status,
          errorMessage : ""
        };
        if(error.error){
          err = error.error;
        }else{
          if ([401].includes(error.status)) {
            err.errorMessage = "Error 401 (Unauthorized)";
          }
        }
        return throwError(err);
      })
    );
  }
}

