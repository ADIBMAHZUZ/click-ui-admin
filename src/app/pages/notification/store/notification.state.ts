import { MediaService } from "./../../../services/media.service";
import {
  LoadCountMediaExpired,
  LoadCountNotification,
} from "./notification.actions";
import {
  initialState,
  NotificationStateModel,
} from "./notification-state.module";
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { NotificationService } from "src/app/services/notification.service";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
@State<NotificationStateModel>({
  name: "notification",
  defaults: initialState,
})
export class NotificationState {
  @Selector()
  static countNotification({ countNotification }: NotificationStateModel) {
    return countNotification;
  }
  @Selector()
  static countMediaExpired({ countMediaExpired }: NotificationStateModel) {
    return countMediaExpired;
  }

  constructor(
    private notificationService: NotificationService,
    private mediaService: MediaService
  ) {}

  @Action(LoadCountNotification)
  loadCountNotification(
    { patchState }: StateContext<NotificationStateModel>,
    {}: LoadCountNotification
  ) {
    return this.notificationService.countNotification().pipe(
      tap((data) => {
        patchState({
          countNotification: data?.data,
        });
      })
    );
  }

  @Action(LoadCountMediaExpired)
  loadCountMediaExpired(
    { patchState }: StateContext<NotificationStateModel>,
    {}: LoadCountMediaExpired
  ) {
    return this.mediaService.countExpiredMedia().pipe(
      tap((data) => {
        patchState({
          countMediaExpired: data?.data,
        });
      })
    );
  }
}
