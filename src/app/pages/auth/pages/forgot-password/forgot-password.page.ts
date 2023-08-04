import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import {
  FormBuilder,
  FormGroup,
  Validators,
  Form,
  FormControl,
} from "@angular/forms";

import { AuthService } from "../../auth.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.page.html",
  styleUrls: ["./forgot-password.page.scss"],
})
export class ForgotPasswordPage {
  form: FormGroup = this.formBuilder.group({
    username: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
  });

  get username() {
    return this.form.controls.username;
  }

  get email() {
    return this.form.controls.email;
  }

  isFormSubmitted = false;
  error: String = "";
  success: String = "";

  constructor(
    private menuController: MenuController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private translate: TranslateService
  ) {
    this.translate.use(localStorage.getItem("language"));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
    this.menuController.enable(false);
  }

  ionViewWillLeave() {
    this.menuController.enable(true);
  }

  onSubmit() {

    this.isFormSubmitted = true;
    this.error = "";
    this.success = "";

    if (this.form.valid) {
      this.authService.forgotPassword(this.form.value).subscribe((res) => {
        if (res.success) {
          if (localStorage.getItem("language") == "en") {
            this.success = "Please check your email to create new password";
          } else {
            this.success =
              "Sila periksa e-mel anda untuk membuat kata laluan baru";
          }
        }

        if (!res.success) {
          this.error = res.error;
        }
      });
    }
  }
}
