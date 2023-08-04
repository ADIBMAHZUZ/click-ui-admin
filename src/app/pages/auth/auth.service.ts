import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { ConfigService } from "../../services/config.service";
import { User } from "../../models/user";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  loginUrl = this.config.getConfig().auth.login;
  logoutUrl = this.config.getConfig().auth.logout;
  forgotPasswordUrl = this.config.getConfig().auth.forgotPassword;
  createNewPasswordUrl = this.config.getConfig().auth.createNewPassword;
  headers = new HttpHeaders();
  // headers.set('Content-Type', 'application/json; charset=utf-8');

  constructor(
    private http: HttpClient,
    private router: Router,
    private config: ConfigService,
    public jwtHelper: JwtHelperService
  ) {}

  login({ username, password, device, language }) {
    localStorage.removeItem("token");
    localStorage.removeItem("user_type");
    let headers = new HttpHeaders();
    headers = headers.set("Accept-Language", language);

    return this.http
      .post<any>(
        this.loginUrl,
        { username, password, device, language },
        {
          headers: headers,
        }
      )
      .pipe(
        map((user) => {
          if (user) {
            // localStorage.setItem('user', JSON.stringify(user));
            if (user.token != undefined && user.user_type != undefined) {
              localStorage.setItem("token", user.token);
              localStorage.setItem("user_type", user.user_type);
              localStorage.setItem("user_id", user.user_id);
            }
          } else {
            catchError(this.handleError<User>("login"));
          }
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_type");
    localStorage.removeItem("user_id");
    localStorage.removeItem("language");
    return this.http.post<any>(this.logoutUrl, {});
  }

  forgotPassword({ username, email }) {
    return this.http.post<any>(this.forgotPasswordUrl, { username, email });
  }

  createNewPassword({ token, password, new_password, confirm_password }) {
    return this.http.post<any>(this.createNewPasswordUrl, {
      token,
      password,
      new_password,
      confirm_password,
    });
  }

  getUser() {
    var user = localStorage.getItem("user");
    return JSON.parse(user);
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    const user_type = localStorage.getItem("user_type");
    if (token != undefined) {
      return true;
    }
    return false;
  }
}
