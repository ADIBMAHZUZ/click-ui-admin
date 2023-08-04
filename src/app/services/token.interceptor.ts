import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
    HttpResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');

        let modifiedReq: any = request.clone();

        if (token) {
            modifiedReq.headers = modifiedReq.headers.set('Authorization', `Token ${token}`)
        }
        
        return next.handle(modifiedReq).pipe(
            
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                }
                return event;
            }),

            catchError((error: HttpErrorResponse) => {
                if (error.status == 401) {
                    localStorage.removeItem("token");
                    this.router.navigate(['/auth/login']);
                }
                return throwError(error);
            })
        );
    }
}
