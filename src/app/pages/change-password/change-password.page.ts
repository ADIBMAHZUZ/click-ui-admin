import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, MenuController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, Form, FormControl, NgForm } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  form: FormGroup = this.formBuilder.group({
    password: ['', [Validators.required]],
    new_password: ['', [Validators.required, Validators.minLength(6)]],
    confirm_password: ['', [Validators.required, Validators.minLength(6)]],
  });

  state = {
    isFormSubmitted: false,
    success: false,
    error: ''
  };

  constructor(
    private router: Router,
    private navController: NavController,
    private menuController: MenuController,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
  ) { 
    this.translate.use(localStorage.getItem('language'))
  }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.translate.use(localStorage.getItem('language'))
  }

  get password() {
    return this.form.controls.password;
  }

  get newPassword() {
    return this.form.controls.new_password;
  }

  get confirmPassword() {
    return this.form.controls.confirm_password;
  }

  onSubmit() {
    this.state.isFormSubmitted = true;
    this.state.error = '';
    this.state.success = false;

    if (this.form.valid) {
      this.userService.changePassword(this.form.value)
        .subscribe((res: any) => {
          if (res.success) {
            this.form.reset();
            this.form.markAsPristine();
            this.form.markAsUntouched();
            this.form.updateValueAndValidity();
            this.state.isFormSubmitted = false;
            this.state.success = true;
          }

          if (!res.success) {
            this.state.error = res.error;
          }

        })
    }
  }

}
