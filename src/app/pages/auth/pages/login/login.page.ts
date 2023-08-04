import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavController, MenuController } from "@ionic/angular";
import {
  FormBuilder,
  FormGroup,
  Validators,
  Form,
  FormControl,
} from "@angular/forms";

import { AuthService } from "../../auth.service";
import { TranslateConfigService } from "src/app/services/translate-config.service";
import { TranslateService } from "@ngx-translate/core";
import { GlobalMenuService } from "src/app/services/global-menu.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage {
  loginForm: FormGroup = this.formBuilder.group({
    username: ["", [Validators.required]],
    password: ["", [Validators.required]],
  });

  isFormSubmitted = false;
  error: String = "";
  public language = "en";
  public check_user_type = true;
  public error_user_type = "";
  public checkError = false;
  hide = true;

  constructor(
    // public events: Events,
    private router: Router,
    private navController: NavController,
    private menuController: MenuController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private globalFooService: GlobalMenuService,
    private auth: AuthService
  ) {
    if (localStorage.getItem("language") && this.auth.isAuthenticated()) {
      this.translate.setDefaultLang(localStorage.getItem("language"));
      this.translate.use(localStorage.getItem("language"));
    } else {
      this.translate.setDefaultLang("en");
      this.translate.use("en");
    }
  }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(["/profile"]);
    }
  }

  ionViewWillEnter() {
    this.menuController.enable(true);
    if (localStorage.getItem("language") && this.auth.isAuthenticated()) {
      this.translate.setDefaultLang(localStorage.getItem("language"));
      this.translate.use(localStorage.getItem("language"));
    } else {
      this.translate.setDefaultLang("en");
      this.translate.use("en");
      localStorage.setItem("language", "en");
    }
  }

  ionViewWillLeave() {
    this.menuController.enable(true);
  }

  get username() {
    return this.loginForm.get("username") as FormControl;
  }

  get password() {
    return this.loginForm.get("password") as FormControl;
  }

  changeUsername() {
    this.isFormSubmitted = false;
  }
  changePassword() {
    this.isFormSubmitted = false;
  }

  segmentChanged(ev: any) {
    console.log("Segment changed", ev.detail.value);
    this.translate.use(ev.detail.value);
    // this.translate.use('ms')
    this.language = ev.detail.value;
    localStorage.removeItem("language");
    localStorage.setItem("language", ev.detail.value);
  }

  onLogin() {
    this.isFormSubmitted = true;
    this.error = "";
    let temp_lan = localStorage.getItem("language");
    if (this.loginForm.valid) {
      let params = {
        username: this.loginForm.controls.username.value,
        password: this.loginForm.controls.password.value,
        device: "web",
        language: temp_lan,
      };
      this.authService.login(params).subscribe((res) => {
        if (res.success) {
          if (localStorage.getItem("language") == undefined) {
            localStorage.setItem("language", this.language);
          }
          this.check_user_type = true;
          this.checkError = false;
          this.globalFooService.publishSomeData({
            change: "Change role - permission",
          });
          this.router.navigate(["/profile"]);
          this.loginForm.reset();

          this.loginForm.setErrors({});
        }

        if (!res.success) {
          this.check_user_type = true;
          this.error = res.error;
          this.loginForm.patchValue({
            username: "",
            password: "",
          });
        }
      });
    } else {
      this.checkError = true;
    }
  }
}
