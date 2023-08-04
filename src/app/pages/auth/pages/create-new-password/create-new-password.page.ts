import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, MenuController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, Form, FormControl } from '@angular/forms';

import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-create-new-password',
  templateUrl: './create-new-password.page.html',
  styleUrls: ['./create-new-password.page.scss'],
})
export class CreateNewPasswordPage implements OnInit {

  token: String = '';

  form: FormGroup = this.formBuilder.group({
    new_password: ['', [Validators.required]],
    confirm_password: ['', [Validators.required]]
  });

  get new_password() {
    return this.form.controls.new_password;
  }

  get confirm_password() {
    return this.form.controls.confirm_password;
  }

  isFormSubmitted = false;
  error: String = '';
  success = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navController: NavController,
    private menuController: MenuController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuController.enable(false);

    this.token = this.route.snapshot.paramMap.get('token');

  }

  ionViewWillLeave() {
    this.menuController.enable(true);
  }

  onSubmit() {
    this.isFormSubmitted = true;
    this.error = '';
    this.success = false;

    if (this.form.valid) {
      this.authService.createNewPassword({token: this.token, ...this.form.value})
        .subscribe(res => {
          if (res.success) {
            this.form.reset();
            this.form.markAsPristine();
            this.form.markAsUntouched();
            this.form.updateValueAndValidity();
            this.isFormSubmitted = false;
            this.success = true;

            this.navController.navigateRoot(['/auth/login'])
          }

          if (!res.success) {
            this.error = res.error;
          }

        })
    }
  }

}
