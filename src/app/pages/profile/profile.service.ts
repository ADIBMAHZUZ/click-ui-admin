import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, of, from } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { ConfigService } from "../../services/config.service";
import { User } from "../../models/user";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  profileUrl = this.config.getConfig().profile;
  profileUrlUpdate = this.config.getConfig().users;

  constructor(
    private http: HttpClient,
    private router: Router,
    private config: ConfigService
  ) {}

  profile() {
    return this.http.get<any>(this.profileUrl);
  }

  updateProfile(params): Observable<any> {
    return this.http.patch(this.profileUrlUpdate.profile, params);
  }

  getProfile(language): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Accept-Language", language);
    // headers = headers.set('Access-Control-Allow-Origin', this.profileUrlUpdate.profile);
    // headers = headers.set('Access-Control-Allow-Methods', "GET OPTIONS");
    // headers = headers.set('Access-Control-Allow-Headers', "Origin, Content-Type, X-Auth-Token");
    // headers = headers.set('Access-Control-Allow-Origin', "*");
    // headers = headers.set('Allow', "GET");
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Access-Control-Allow-Origin':'*',
    //     // "Allow": "GET",
    //     "Accept-Language": language
    //   })
    // };
    // return this.http.get(this.profileUrlUpdate.profile, {headers : httpOptions});
    return this.http.get(this.profileUrlUpdate.profile, {
      headers: headers,
    });
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  getImageFromUrl(url): Observable<any> {
    return this.http.get(url, { responseType: "blob" });
  }

  getThemeDefault(): Observable<any> {
    return this.http.get("/assets/json/theme.json");
  }

  requestDelete(id): Observable<any> {
    return this.http.post(
      this.profileUrlUpdate.request_delete.replace(":id", id),
      {}
    );
  }
}
