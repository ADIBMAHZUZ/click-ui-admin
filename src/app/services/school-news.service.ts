import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchoolNewsService {
  schoolNewsUrl = this.config.getConfig().school_news_board;

  constructor(private http: HttpClient,
    private router: Router,
    private config: ConfigService,) { }

  listSchoolNews() {
    return this.http.get<any>(this.schoolNewsUrl.list)
  }
  getSchoolNews(id): Observable<any>{
    return this.http.get(this.schoolNewsUrl.get.replace(':id', id));
  }
  createSchoolNews(params): Observable<any>{
    return this.http.post(this.schoolNewsUrl.create, params);
  }

  updateSchoolNews(id, params): Observable<any>{
    return this.http.patch(this.schoolNewsUrl.update.replace(':id', id), params);
  }

  deleteSchoolNews(id): Observable<any>{
    return this.http.delete(this.schoolNewsUrl.delete.replace(':id', id));
  }

  deleteSchoolNewsReal(id): Observable<any>{
    return this.http.delete(this.schoolNewsUrl.remove.replace(':id', id));
  }

  searchSchoolNews(title): Observable<any>{
    // return this.http.get(`${this.schoolNewsUrl.search}?title=${title}`);
    return this.http.get(this.schoolNewsUrl.search + "?title=" + title);
  }

  listPageSchoolNews(params){
    return this.http.get<any>(this.schoolNewsUrl.list, {
      params
    })
  }
}
