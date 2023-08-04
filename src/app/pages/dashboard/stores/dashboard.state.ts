import { DashboardService } from "./../../../services/dashboard.service";
import { GetDashboard } from "./dashboard.actions";
import { Injectable } from "@angular/core";
import { Action, Select, State, StateContext } from "@ngxs/store";
import { DashboardStateModel, initialState } from "./dashboard-state.model";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
@State({ name: "dashboard", defaults: initialState })
export class DashboardState {
  @Select()
  static getDashboard({ dashboard }: DashboardStateModel) {
    return dashboard;
  }

  constructor(private apiService: DashboardService) {}

  @Action(GetDashboard)
  getDashboard(
    ctx: StateContext<DashboardStateModel>,
    { payload }: GetDashboard
  ) {
    return this.apiService.listDashboard(payload).pipe(
      tap((data) => {
        ctx.patchState({
          dashboard: data,
        });
      })
    );
  }
}
