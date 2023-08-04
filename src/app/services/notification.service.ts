import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ConfigService } from "./config.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  notificationUrl = this.config.getConfig().notifications;

  constructor(
    private http: HttpClient,
    private router: Router,
    private config: ConfigService
  ) {}

  listNotificationAdmin(params): Observable<any> {
    return this.http.get<any>(this.notificationUrl.list_admin, {
      params,
    });
  }

  listNotificationPublisher(params): Observable<any> {
    return this.http.get<any>(this.notificationUrl.list_publisher, {
      params,
    });
  }

  listNotificationLibrarian(params): Observable<any> {
    return this.http.get<any>(this.notificationUrl.list_librarian, {
      params,
    });
  }

  acceptRejectAdmin(id, params): Observable<any> {
    return this.http.patch(
      this.notificationUrl.accept_reject_admin.replace(":id", id),
      params
    );
  }

  acceptRejectPublisher(id, params): Observable<any> {
    return this.http.patch(
      this.notificationUrl.accept_reject_publisher.replace(":id", id),
      params
    );
  }
  acceptRejectLibrary(id, params): Observable<any> {
    return this.http.patch(
      this.notificationUrl.accept_reject_library.replace(":id", id),
      params
    );
  }

  requestDeleteTeacher(id): Observable<any> {
    return this.http.post(
      this.notificationUrl.request_delete_teacher.replace(":id", id),
      id
    );
  }

  requestDeleteSubscriber(id): Observable<any> {
    return this.http.post(
      this.notificationUrl.request_delete_subscriber.replace(":id", id),
      id
    );
  }

  countNotification(): Observable<any> {
    return this.http.get(this.notificationUrl.count_notification);
  }
}
