import { ProfileService } from "./../../profile/profile.service";
import { AuthService } from "./../auth.service";
import { Injectable } from "@angular/core";
import { initialState, AuthStateModel } from "./auth-state.module";
import { GetProfile } from "./auth.action";
import { Action, Select, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
@State<AuthStateModel>({
  name: "auth",
  defaults: initialState,
})
export class AuthState {
  @Selector() static getProfile({ profile }: AuthStateModel) {
    return profile;
  }

  constructor(private profileService: ProfileService) {}

  @Action(GetProfile)
  getProfile(
    { patchState }: StateContext<AuthStateModel>,
    { payload }: GetProfile
  ) {
    let lang = localStorage.getItem("language");
    return this.profileService.getProfile(lang).pipe(
      tap((data) => {
        patchState({
          profile: data,
        });
      })
    );
  }
}
