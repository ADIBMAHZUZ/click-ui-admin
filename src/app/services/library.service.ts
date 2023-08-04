import { Injectable } from "@angular/core";
import { ConfigService } from "../../app/services/config.service";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class LibraryService {
  libraryUrl = this.config.getConfig().librarians;
  librariesUrl = this.config.getConfig().librarians.list_libraries;

  constructor(
    private http: HttpClient,
    private router: Router,
    private config: ConfigService
  ) {}

  listLibraries() {
    return this.http.get<any>(this.librariesUrl);
  }

  listLibrary() {
    return this.http.get<any>(this.libraryUrl.list);
  }

  getLibrary(id): Observable<any> {
    return this.http.get(this.libraryUrl.get.replace(":id", id));
  }

  createLibrary(params): Observable<any> {
    return this.http.post(this.libraryUrl.create, params);
  }

  updateLibrary(id, params): Observable<any> {
    return this.http.patch(this.libraryUrl.update.replace(":id", id), params);
  }

  deleteLibrary(id): Observable<any> {
    return this.http.delete(this.libraryUrl.delete.replace(":id", id));
  }

  searchLibrary(text): Observable<any> {
    // return this.http.get(`${this.libraryUrl.search}?search=<${text}>`);
    return this.http.get(this.libraryUrl.search + "?search=" + text);
  }

  listPageLibrary(params) {
    return this.http.get<any>(this.libraryUrl.list, {
      params,
    });
  }

  listLibraryOfLibrary(params) {
    return this.http.get<any>(this.libraryUrl.list, {
      params,
    });
  }

  getCurrentSubscriber(): Observable<any> {
    return this.http.get(this.libraryUrl.current_subscriber);
  }

  getTrackingSubscriber(params): Observable<any> {
    return this.http.get<any>(this.libraryUrl.tracking, {
      params,
    });
  }

  // getTrackingSubscriberPage(): Observable<any>{
  //   return this.http.get(this.libraryUrl.tracking);
  // }

  search(params): Observable<any> {
    return this.http.post<any>(this.libraryUrl.list_libraries, params);
  }

  updateStatus(id): Observable<any> {
    return this.http.delete(this.libraryUrl.media_view.replace(":id", id));
  }

  delete(params): Observable<any> {
    return this.http.delete(this.libraryUrl.deleteMulti, params);
  }
}
