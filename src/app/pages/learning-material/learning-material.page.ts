import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';
import { LearningMaterialService } from 'src/app/services/learning-material.service';
import { GlobalMenuService } from 'src/app/services/global-menu.service';

@Component({
  selector: 'app-learning-material',
  templateUrl: './learning-material.page.html',
  styleUrls: ['./learning-material.page.scss'],
})
export class LearningMaterialPage implements OnInit {

  public notify_delete = ''
  public data = []
  public columns = []
  public searchLearningMaterial = ''

  constructor(
    private translate: TranslateService,
    public alertController: AlertController,
    private learningMaterialService: LearningMaterialService,
    private globalFooService: GlobalMenuService
  ) {
    this.translate.use(localStorage.getItem('language'))
    this.columns = [
      {prop: 'id', name: 'ID'},
      {prop: 'name', name: 'Name'},
      {prop: 'published_date', name: 'Publish date'},
      {prop: 'is_active', name: 'Active'},
      {prop: 'media_type', name: 'Media type'},
      // {prop: 'phone', name: 'Phone'},
    ];
    
  }

  ngOnInit() {
  }

  ionViewWillEnter(){ 
    this.translate.use(localStorage.getItem('language'))
    if(localStorage.getItem('language') == 'en'){
      this.notify_delete = 'Are you sure you want to delete?'
    }else{
      this.notify_delete = 'Adakah anda pasti ingin memadam?'
    }
    this.loadData()
  }

  loadData(){
    let params = {
      "media_type": "book"
    }
    this.learningMaterialService.listLearningMaterial(params).subscribe(data => {
      this.data = data.results
      this.globalFooService.publishSomeData({
        change: data
      });
    })
  }

  async deleteLearningMaterial(id) {
    const alert = await this.alertController.create({
      header: '',
      cssClass: 'my-custom-alert',
      message: this.notify_delete,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.loadData()
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.learningMaterialService.deleteLearningMaterial(id).subscribe(data => {
              this.loadData()
            })
          }
        }
      ]
    });
    await alert.present();
  }

  onSearchLearningMaterial(){
    if(this.searchLearningMaterial == ''){
      // this.loadData()
      this.globalFooService.publishSomeData({
        change: ""
      });
    }else{
      let params = {
        "name": this.searchLearningMaterial,
        "publisher": "",
        "category": "",
        "author": "",
        "media_type": "",
        "published_date": ""
      }
      this.globalFooService.publishSomeData({
        change: this.searchLearningMaterial
      });
      // this.learningMaterialService.searchLearningMaterial(params).subscribe(data => {
      //   this.data = data.results
      //   this.globalFooService.publishSomeData({
      //     change: data
      //   });
      // })
    }
  }

}
