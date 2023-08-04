import { Component, OnInit } from '@angular/core';
import { MediaService } from 'src/app/services/media.service';
import { GlobalMenuService } from 'src/app/services/global-menu.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LibraryService } from 'src/app/services/library.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LogService } from 'src/app/services/log.service';
import { PublisherService } from 'src/app/services/publisher.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.page.html',
  styleUrls: ['./log.page.scss'],
})
export class LogPage implements OnInit {
  public rowCountPage;
  public currentPageLimit: number = 10;
  public currentVisible: number = 3;
  public columns: any
  public data: any
  public datalibrary = []
  public temp = []
  public temp_data = []
  public checkUserTypeAdmin = false
  public checkUserTypePub = false
  public checkUserTypeLib = false
  public page_index = 0
  public items = 0
  public page_temp = 1
  

  public data_tracking = []
  public data_log = []
  public dataLibrary = []
  public library = 'all'
  public library_all = 'all'

  public publisher = 'all'
  public publisher_all = 'all'
  public checkFilter = false
  public dataPublisher = []

  constructor(
    private mediaService: MediaService,
    public alertController: AlertController,
    private router: Router,
    private translate: TranslateService,
    private globalFooService: GlobalMenuService,
    private libraryService: LibraryService,
    private logService: LogService,
    private publisherService: PublisherService,
  ) {
    this.columns = [
      {prop: 'id', name: 'ID'},
      {prop: 'media_id', name: 'Media'},
      {prop: 'library', name: 'Library'},
      {prop: 'quantity', name: 'Quantity'},
      {prop: 'status', name: 'Status'},
      {prop: 'name', name: 'Media name'},
    ];
    this.translate.use(localStorage.getItem('language'))
   }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.translate.use(localStorage.getItem('language'))
    this.loadLibrary()
    this.loadPublisher()

    let params = {
      page: 1
    }
    let temp = localStorage.getItem("user_type")
    if(temp == "admin"){
      this.checkUserTypeAdmin = true
      this.checkUserTypePub = false
    } 

    if(temp == "publisher"){
      this.checkUserTypePub = true
      this.checkUserTypeAdmin = false
    }

    if(temp != "librarian"){
      this.checkUserTypeLib = false
      this.loadDataLog(params)
    }

    if(temp == "librarian"){
      this.checkUserTypeLib = true
      this.libraryService.getTrackingSubscriber(params).subscribe(data => {
        this.items = data.count
        this.data_tracking = data.results
      })
    }
  }

  loadLibrary(){
    //get data library
    this.libraryService.listLibraries().subscribe(data => {
      this.dataLibrary = data.results
    })
  }

  loadPublisher(){
    //get data publisher
    this.publisherService.listAllPublisher().subscribe(data => {
      this.dataPublisher = data
    })
  }


  onChangePage(item){
    let params
    if(item == 0){
      this.page_temp = 1
      params = {
        page: 1
      }
    }
    if(item > 0){
      this.page_temp = item
      params = {
        page: item,
      }
    }
    
    let temp_user = localStorage.getItem("user_type")
    if(temp_user == "librarian"){
      // this.checkUserType = false
      this.checkUserTypeLib = true
      this.libraryService.getTrackingSubscriber(params).subscribe(data => {
        this.items = data.count
        this.data_tracking = data.results
      })
    }
    // if(temp_user == "publisher" || temp_user == "admin"){
    //   this.checkUserType = true
    //   this.checkUserTypeLib = false
    //   this.loadDataLog(params)
    // }
    if(this.page_index != this.page_temp){
      if(temp_user == "admin"){
        this.checkUserTypeAdmin = true
        this.checkUserTypePub = false
        let parasmAdmin = this.getParamsFilterAdmin(this.page_temp)
        this.loadDataLog(parasmAdmin)
      } 
  
      if(temp_user == "publisher"){
        this.checkUserTypePub = true
        this.checkUserTypeAdmin = false
        let paramsPub = this.getParamsFilterPublisher(this.page_temp)
        this.loadDataLog(paramsPub)
      }

      this.page_index = this.page_temp
    }
    
    // if(temp_user != "librarian"){
    //   this.checkUserTypeLib = false
    //   this.loadDataLog(params)
    // }
  }

   
  //get data log of publisher
  loadDataLog(params){
    this.logService.listLog(params).subscribe(data => {
      this.items = data.count
      this.data_log = data.results
      if(this.checkFilter){
        // this.cdr.detectChanges()
        this.globalFooService.publishDataFilterLog({"page": 1})
        this.checkFilter = false
      }
    })
  }

  loadData(){
    this.mediaService.getMediaPublisher().subscribe(data => {
      this.data = data.results
      let temp = data.results
      this.rowCountPage = data.count
      this.datalibrary = []
      temp.forEach(item => {
        this.getNameLibrary(item.library)
      })
    })
  }

  getNameLibrary(id){
    this.libraryService.listLibraries().subscribe(data => {
      let dataTemp = data.results
      dataTemp.forEach(element => {
        if(element.id == id){
          this.datalibrary.push(element.name)
        }
      });
    })
  }

  changeLibrary(id){
    //change library
    let role = localStorage.getItem("user_type")
    this.checkFilter = true
    if(role == "admin"){
      let params = this.getParamsFilterAdmin(1)
      this.loadDataLog(params)
    }

    if(role == "publisher"){
      let params = this.getParamsFilterPublisher(1)
      this.loadDataLog(params)
    }
  }
  
  changePublisher(id){
    //change publisher
    let role = localStorage.getItem("user_type")
    this.checkFilter = true
    if(role == "admin"){
      let params = this.getParamsFilterAdmin(1)
      // this.cdr.detectChanges()
      // this.globalService.publishDataTeacherNote({"page": this.page_temp})
      this.loadDataLog(params)
    }
  }

  // Get params filter for admin
  getParamsFilterAdmin(page){
    let params;
    if(this.library != "all" && this.publisher != "all"){
      params = {
        page: page,
        lan: localStorage.getItem("language"),
        library: this.library,
        publisher: this.publisher
      }
    }
    if(this.library == "all" && this.publisher != "all"){
      params = {
        page: page,
        lan: localStorage.getItem("language"),
        publisher: this.publisher
      }
    }
    if(this.library != "all" && this.publisher == "all"){
      params = {
        page: page,
        lan: localStorage.getItem("language"),
        library: this.library,
      }
    }
    if(this.library == "all" && this.publisher == "all"){
      params = {
        page: page,
        lan: localStorage.getItem("language"),
      }
    }
    return params;
  }

  //Get params filter for publisher
  getParamsFilterPublisher(page){
    let params;
    if(this.library != "all"){
      params = {
        page: page,
        lan: localStorage.getItem("language"),
        library: this.library,
      }
    }
    if(this.library == "all"){
      params = {
        page: page,
        lan: localStorage.getItem("language"),
      }
    }
    return params;
  }

}
