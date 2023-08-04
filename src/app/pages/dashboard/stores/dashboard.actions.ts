import { DashBoardInput } from "../shared/models/model";

const enum Actions {
  GET_DASHBOARD = "[Dashboard] Get dashboard",
}

export class GetDashboard {
  static readonly type = Actions.GET_DASHBOARD;
  constructor(public readonly payload?: DashBoardInput) {}
}
