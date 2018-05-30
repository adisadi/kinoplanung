import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable, of, empty,throwError  } from "rxjs";
import { catchError, map } from 'rxjs/operators';

import { Router } from "@angular/router";

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

    return next.handle(req).pipe(
      catchError(err => of(HttpErrorResponse)),
      map(err => {
        console.log(JSON.stringify(err));
        if (err instanceof HttpErrorResponse && (err.status === 401 || err.status === 403)) {
          this.router.navigate(['/login'], {
            queryParams: {
              returnUrl: document.location.pathname
            }
          });

          // this response is handled
          // stop the chain of handlers by returning empty
          //return empty();
          return empty();
        }
        return throwError(err);
      })
    );
  }
}