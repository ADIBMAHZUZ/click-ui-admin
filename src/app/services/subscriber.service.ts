import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { ConfigService } from "./config.service";
import { Observable } from "rxjs";

declare var require: any;
const FileSaver = require("file-saver");

@Injectable({
  providedIn: "root",
})
export class SubscriberService {
  subscriberUrl = this.config.getConfig().subscribers;

  constructor(
    private http: HttpClient,
    private router: Router,
    private config: ConfigService
  ) {}

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  listSubscriber() {
    return this.http.get<any>(this.subscriberUrl.list);
  }
  getSubscriber(id): Observable<any> {
    return this.http.get(this.subscriberUrl.get.replace(":id", id));
  }
  createSubscriber(params): Observable<any> {
    return this.http.post(this.subscriberUrl.create, params);
  }

  updateSubscriber(id, params): Observable<any> {
    return this.http.patch(
      this.subscriberUrl.update.replace(":id", id),
      params
    );
  }

  updateStatus(id): Observable<any> {
    return this.http.delete(this.subscriberUrl.updateStatus.replace(":id", id));
  }

  searchSubscriber(text): Observable<any> {
    // return this.http.get(`${this.subscriberUrl.search}?search=<${text}>`);
    return this.http.get(this.subscriberUrl.search + "?search=" + text);
  }

  listPageSubscriber(params) {
    return this.http.get<any>(this.subscriberUrl.list, {
      params,
    });
  }

  listSubscriberLibrary(params) {
    return this.http.get<any>(this.subscriberUrl.list, {
      params,
    });
  }

  downloadFile() {
    // const pdfUrl = '/assets/csv/Subscriber.csv';
    //const pdfName = 'your_pdf_file';
    // FileSaver.saveAs(pdfUrl, pdfName);
    const pdfUrl = "/assets/csv/Subscriber.csv";
    //const pdfName = 'your_pdf_file';
    FileSaver.saveAs(pdfUrl, "Subscriber.csv", {
      type: "text/csv;charset=utf-8",
    });
  }

  importCsvSubscribers(params): Observable<any> {
    return this.http.post(this.subscriberUrl.import, params);
  }

  updateMaxDevice(id, params): Observable<any> {
    return this.http.patch(
      this.subscriberUrl.update_max_device.replace(":id", id),
      params
    );
  }

  deleteSubscriber(id): Observable<any> {
    return this.http.delete(this.subscriberUrl.delete.replace(":id", id));
  }

  deleteSubscriberMulti(params): Observable<any> {
    return this.http.delete<any>(this.subscriberUrl.deleteMulti, params);
  }
}
