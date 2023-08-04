import { Injectable } from "@angular/core";
import { AuthService } from "../pages/auth/auth.service";
import {
  Router,
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
} from "@angular/router";
import { StudentContentService } from "../services/student-content.service";

@Injectable({
  providedIn: "root",
})
export class RoleGuardService implements CanActivate, CanActivateChild {
  constructor(
    public auth: AuthService,
    public router: Router,
    private studentContentService: StudentContentService
  ) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    let temp = route["_routerState"]["url"];
    let result = temp.substring(1, 23);
    if (result == "student-content/update") {
      let temp_id = route.params.id;
      this.studentContentService
        .getStudentContent(temp_id)
        .subscribe((data) => {
          if (
            data.status == "publish" &&
            localStorage.getItem("user_type") == "subscriber"
          ) {
            this.router.navigate(["/profile"]);
            return false;
          }
        });
    }

    if (result == "statistic") {
      if (localStorage.getItem("user_type") == "librarian") {
        this.router.navigate(["/statistic/number-of-register"]);
        return false;
      } else {
        this.router.navigate(["/statistic/number-media"]);
        return false;
      }
    }

    const expectedRole = route.data;

    var check_role = false;
    let roles = Object.entries(expectedRole);
    for (var i = 0; i < roles.length; i++) {
      if (localStorage.getItem("user_type") == roles[i][1]) {
        check_role = true;
      }
    }
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(["/auth/login"]);
      return false;
    }
    if (!check_role) {
      this.router.navigate(["/profile"]);
      return false;
    }
    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data;
    var check_role = false;
    let roles = Object.entries(expectedRole);
    for (var i = 0; i < roles.length; i++) {
      if (localStorage.getItem("user_type") == roles[i][1]) {
        check_role = true;
      }
    }

    if (!this.auth.isAuthenticated()) {
      this.router.navigate(["/auth/login"]);
      return false;
    }
    if (localStorage.getItem("user_type") != "admin") {
      this.router.navigate(["/profile"]);
      return false;
    }
    return true;
  }
}
