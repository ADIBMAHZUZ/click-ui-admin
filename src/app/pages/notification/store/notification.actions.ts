const enum Actions {
  LOAD_COUNT_NOTIFICATION = "[Notification] Load count notification",
  LOAD_COUNT_MEDIA_EXPIRED = "[Notification] Load count media expired",
}

export class LoadCountNotification {
  static readonly type = Actions.LOAD_COUNT_NOTIFICATION;
  constructor(private payload?: any) {}
}

export class LoadCountMediaExpired {
  static readonly type = Actions.LOAD_COUNT_MEDIA_EXPIRED;
  constructor(private payload?: any) {}
}
