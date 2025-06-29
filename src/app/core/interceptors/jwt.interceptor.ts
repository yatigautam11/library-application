import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs'; 

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       const JWT_TOKEN = localStorage.getItem('token');

        if (JWT_TOKEN) {
            request = request.clone({ setHeaders: { Authorization: `Bearer ${JWT_TOKEN}`, }, });
        }
        return next.handle(request);
    }
}