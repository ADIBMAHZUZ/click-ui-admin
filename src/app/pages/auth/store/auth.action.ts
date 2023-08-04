const enum Actions {
  LOAD_PROFILE = "[Auth] Load profile",
}

export class GetProfile {
  static readonly type = Actions.LOAD_PROFILE;
  constructor(public payload?: any) {}
}
