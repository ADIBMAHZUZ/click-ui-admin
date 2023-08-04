import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage implements OnInit {

  constructor(
    private menuController: MenuController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuController.enable(false);
  }

  ionViewWillLeave() {
    this.menuController.enable(true);
  }


}
