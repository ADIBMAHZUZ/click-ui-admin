import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  logUrl = this.config.getConfig().log;
  constructor(
    private http: HttpClient,
    private router: Router,
    private config: ConfigService,
  ) { }

  // listLogAdmin(params): Observable<any>{
  //   return this.http.get<any>(this.logUrl.list_admin, {
  //     params
  //   })
  // }

  listLog(params): Observable<any>{
    return this.http.get<any>(this.logUrl.list_log, {
      params
    })
  }
}
