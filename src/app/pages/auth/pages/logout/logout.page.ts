import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage {

  constructor(private navController: NavController, private router: Router, private authService: AuthService) { }

  ionViewWillEnter() {
    this.authService.logout().subscribe(res => { 
      localStorage.removeItem('add_to_cart')
      localStorage.removeItem('data_id')
      localStorage.removeItem('data')
    });
    this.navController.navigateRoot(['/auth/login']);
  }
}
