import { Injectable } from "@angular/core";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { ConfigService } from "./config.service";
const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

@Injectable({
  providedIn: "root",
})
export class StatisticService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private config: ConfigService
  ) {}

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  statisticsUrl = this.config.getConfig().statistics;

  public exportAsExcelFile(json: any[], excelFileName: string) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  numberOfMedia(params) {
    return this.http.post<any>(this.statisticsUrl.number_of_media, params);
  }

  numberOfDownload(params) {
    return this.http.post<any>(this.statisticsUrl.number_of_download, params);
  }

  mediaPerCategory(params) {
    return this.http.post<any>(this.statisticsUrl.media_per_category, params);
  }

  subscriberPerLibrary(params) {
    return this.http.post<any>(this.statisticsUrl.subscriber_per_media, params);
  }

  topDownload(params) {
    return this.http.post<any>(this.statisticsUrl.top_download_media, params);
  }

  numberOfRegister() {
    return this.http.get<any>(this.statisticsUrl.number_of_register, {});
  }

  numberOfBorrowedMaterial(params) {
    return this.http.post<any>(
      this.statisticsUrl.number_of_borrowed_material,
      params
    );
  }
  rankingDownloadedMaterial(params) {
    return this.http.post<any>(
      this.statisticsUrl.ranking_downloaded_material,
      params
    );
  }
  rankingActiveSubscriber(param) {
    return this.http.post<any>(
      this.statisticsUrl.ranking_active_subscriber,
      param
    );
  }
}
