import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";

import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  changePasswordUrl = this.config.getConfig().users.changePassword;

  constructor(
    private http: HttpClient,
    private router: Router,
    private config: ConfigService,
  ) { }

  changePassword({ password, new_password, confirm_password  }) {
    return this.http.patch(this.changePasswordUrl, { password, new_password, confirm_password });
  }


  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

}
