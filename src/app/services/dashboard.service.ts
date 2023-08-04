import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ConfigService } from "./config.service";
import { DashBoardInput } from "../pages/dashboard/shared/models/model";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  dashboardUrl = this.config.getConfig().dashboard;
  constructor(private http: HttpClient, private config: ConfigService) {}

  listDashboard(params) {
    return this.http.get<any>(this.dashboardUrl.list, { params: params });
  }
}
