import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { ErrorComponent } from './error/error.component';

@Injectable()
export class ErrorinterceptorInterceptor implements HttpInterceptor {

  constructor(private dialog:MatDialog) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler){
    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse)=>{
        let errorMessage = "An Unknown Error has Occured";
        if(error.error.message)
        {
          errorMessage = error.error.message;
        }
        this.dialog.open(ErrorComponent,{data:{message:errorMessage}})
        return throwError(error);
      })
    );
  }
}
