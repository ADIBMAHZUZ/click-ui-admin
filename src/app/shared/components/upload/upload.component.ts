import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GlobalMenuService } from 'src/app/services/global-menu.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  public sum;
  public count;
  public check = false

  public checkDrop = false
  public percent = 0
  public percentComplete = 0
  constructor(
    private globalServie: GlobalMenuService,
    private cdr: ChangeDetectorRef
  ) { 
  }

  ngOnInit() {
    this.globalServie.getObservableTeacherNote().subscribe(data => {
      if(data.sum != undefined && data.count != undefined){
        this.check = true
        this.checkDrop = true
      }
      this.sum = data.sum
      this.count = data.count
      let temp = (this.count / this.sum).toFixed(3)
      this.percent = parseFloat(temp)
      
      let complete = (parseFloat(temp) * 100).toFixed(2)
      this.percentComplete =  parseFloat(complete)
      if(this.percentComplete > 100.0){
        this.percentComplete = 100.0
      }
      if(this.count == this.sum){}
      // console.log("data success: " + data.success)
      if(data.success != undefined && data.success){
        this.check = false
        this.checkDrop = false
      }
      this.cdr.detectChanges()
    })
  }

  cancelUploadFiles(){
    this.globalServie.publishSomeData({"cancel": true})
  }

}
