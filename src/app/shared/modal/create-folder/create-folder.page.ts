import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastController, ModalController } from '@ionic/angular';
import { TeacherNoteService } from 'src/app/services/teacher-note.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.page.html',
  styleUrls: ['./create-folder.page.scss'],
})
export class CreateFolderPage implements OnInit {
  @Input() folder: string;
  public checkError = false
  public checkEmptyName = true
  public name = ''
  createForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9:.,=+_ -]*$')]],
  });
  constructor(
    private translate: TranslateService,
    private toastController: ToastController, 
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private teacherNoteService: TeacherNoteService
  ) {
    this.translate.use(localStorage.getItem('language'))
   }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.translate.use(localStorage.getItem('language'))
  }

  createFolder(){
    if(this.createForm.valid){
      let formData = new FormData()
      formData.append("name", this.createForm.controls.name.value)
      formData.append("folder", this.folder)
      formData.append("type", "folder")
      this.teacherNoteService.createTeacherNotes(formData)
            .pipe(
              catchError((data) => {
                if(data.error){
                  this.closeModal(data, this.createForm.controls.name.value)
                }
                return of()
              })
            )
            .subscribe(data => {
              this.closeModal(data, this.createForm.controls.name.value)
            })
    }else{
      this.checkError = true;
    }
  }

  closeModal(data, name) {
    this.modalCtrl.dismiss(data, name);
  }

  checkName(){
    let temp_name = this.createForm.controls.name.value.trim()
    if(temp_name != ""){
      this.checkEmptyName = false
    }else{
      this.checkEmptyName = true
    }

    if(this.createForm.invalid){
      this.checkEmptyName = true
    }else if(this.createForm.valid && temp_name != ""){
      this.checkEmptyName = false
    }
  }

}
