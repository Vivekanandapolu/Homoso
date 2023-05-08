import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let data = JSON.parse(JSON.stringify(localStorage.getItem('token')))
    const reqCopy = request.clone({
      setHeaders: { Authorization: `Bearer ${data}` }
    })
    return next.handle(reqCopy);
  }
}
