import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ConfigService } from "./config.service";
import { Observable } from "rxjs";

declare var require: any;
const FileSaver = require("file-saver");

@Injectable({
  providedIn: "root",
})
export class MediaService {
  mediaUrl = this.config.getConfig().medias;
  categoriesUrl = this.config.getConfig().categories;
  constructor(
    private http: HttpClient,
    private router: Router,
    private config: ConfigService
  ) {}
  listMedia(params) {
    return this.http.get<any>(this.mediaUrl.list, {
      params,
    });
  }

  listMediaForLibrarian(params) {
    return this.http.get<any>(this.mediaUrl.library_media_view, {
      params,
    });
  }

  getMedia(id): Observable<any> {
    return this.http.get(this.mediaUrl.get.replace(":id", id));
  }

  createMedia(params): Observable<any> {
    return this.http.post(this.mediaUrl.create, params, {
      reportProgress: true,
      observe: "events",
    });
  }

  updateMedia(id, params): Observable<any> {
    return this.http.patch(this.mediaUrl.update.replace(":id", id), params);
  }

  updateStatusMedia(id): Observable<any> {
    return this.http.delete(this.mediaUrl.delete.replace(":id", id));
  }

  searchMedia(params): Observable<any> {
    return this.http.get<any>(this.mediaUrl.search, {
      params,
    });
  }

  listCategories() {
    return this.http.get<any>(this.categoriesUrl.list);
  }

  listPageMedia(params) {
    return this.http.get<any>(this.mediaUrl.list, {
      params,
    });
  }

  listAllMedia(params) {
    return this.http.get<any>(this.mediaUrl.all, {
      params,
    });
  }

  listAllPageMedia(params) {
    return this.http.get<any>(this.mediaUrl.all, {
      params,
    });
  }

  searchAllMedia(params): Observable<any> {
    return this.http.get<any>(this.mediaUrl.search_all, {
      params,
    });
  }

  addToCart(params): Observable<any> {
    return this.http.post(this.mediaUrl.cart, params);
  }

  getMediaPublisher(): Observable<any> {
    return this.http.get(this.mediaUrl.media_log);
  }

  acceptMediaPublisher(id, params): Observable<any> {
    return this.http.patch(
      this.mediaUrl.media_accept.replace(":id", id),
      params
    );
  }

  downloadFile() {
    // var blob = new Blob(myBigCSVFile, {type: "text/csv;charset=utf-8"});
    const pdfUrl = "/assets/csv/multi-upload-template.csv";
    //const pdfName = 'your_pdf_file';
    FileSaver.saveAs(pdfUrl, "multi-upload.csv", {
      type: "text/csv;charset=utf-8",
    });
  }

  multiUpload(params): Observable<any> {
    return this.http.post(this.mediaUrl.multi_upload, params, {
      reportProgress: true,
      observe: "events",
    });
  }

  getText(url): Observable<any> {
    return this.http.get(url, { responseType: "text" });
  }

  deleteMedia(id): Observable<any> {
    return this.http.delete(this.mediaUrl.delete_media.replace(":id", id));
  }

  getMediaDetail(id): Observable<any> {
    return this.http.get(this.mediaUrl.library_media_detail.replace(":id", id));
  }

  countExpiredMedia(): Observable<any> {
    return this.http.get(this.mediaUrl.count_expired_media);
  }
}
