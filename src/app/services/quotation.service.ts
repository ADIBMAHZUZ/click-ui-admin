import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ConfigService } from "./config.service";

@Injectable({
  providedIn: "root",
})
export class QuotationService {
  quotationUrl = this.config.getConfig().quotation;
  constructor(
    private http: HttpClient,
    private router: Router,
    private config: ConfigService
  ) {}

  viewQuotation(id): Observable<any> {
    return this.http.get<any>(this.quotationUrl.view.replace(":id", id));
  }

  sendQuotation(id, param): Observable<any> {
    return this.http.post<any>(
      this.quotationUrl.send.replace(":id", id),
      param
    );
  }
}
