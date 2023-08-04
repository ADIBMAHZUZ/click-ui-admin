import { Profile } from "./../shared/models/models";
export interface AuthStateModel {
  profile?: Profile;
}

export const initialState: AuthStateModel = {};
