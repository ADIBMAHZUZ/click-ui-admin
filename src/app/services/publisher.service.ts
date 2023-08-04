import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { ConfigService } from "./config.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PublisherService {
  publisherUrl = this.config.getConfig().publishers;

  constructor(
    private http: HttpClient,
    private router: Router,
    private config: ConfigService
  ) {}

  listPublisher() {
    return this.http.get<any>(this.publisherUrl.list);
  }

  search(params): Observable<any> {
    return this.http.post<any>(this.publisherUrl.list_all, params);
  }

  getPublisher(id): Observable<any> {
    return this.http.get(this.publisherUrl.get.replace(":id", id));
  }

  createPublisher(params): Observable<any> {
    return this.http.post(this.publisherUrl.create, params);
  }

  updatePublisher(id, params): Observable<any> {
    return this.http.patch(this.publisherUrl.update.replace(":id", id), params);
  }

  updateStatusPublisher(id): Observable<any> {
    return this.http.delete(this.publisherUrl.updateStatus.replace(":id", id));
  }

  searchPublisher(text): Observable<any> {
    // return this.http.get(`${this.publisherUrl.search}?search=<${text}>`);
    return this.http.get(this.publisherUrl.search + "?search=" + text);
  }

  listPagePublisher(params) {
    return this.http.get<any>(this.publisherUrl.list, {
      params,
    });
  }

  listAllPublisher(): Observable<any> {
    return this.http.get<any>(this.publisherUrl.list_all);
  }

  buyStoragePublisher(params): Observable<any> {
    return this.http.post<any>(this.publisherUrl.buy_storage, params);
  }

  deletePublisher(params): Observable<any> {
    return this.http.delete(this.publisherUrl.delete, params);
  }
}
