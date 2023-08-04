import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastController, ModalController } from '@ionic/angular';
import { catchError } from 'rxjs/operators';
import { TeacherNoteService } from 'src/app/services/teacher-note.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-rename-note',
  templateUrl: './rename-note.page.html',
  styleUrls: ['./rename-note.page.scss'],
})
export class RenameNotePage implements OnInit {
  @Input() nameNote: string;
  @Input() idNote: number
  public checkError = false
  public checkEmptyName = false
  renameForm: FormGroup = this.formBuilder.group({
    nameNote: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9:.,=+_ -]*$')]],
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

  renameNote(){
    if(this.renameForm.valid){
      let params = {
        name: this.renameForm.controls.nameNote.value
      }
      this.teacherNoteService.renameNotes(this.idNote, params)
      .pipe(
        catchError(data => {
          if(data.error){
            this.closeModal(data)
          }
          return of()
        })
      )
      .subscribe(data => {
        this.closeModal(data)
      })
    }else{
      this.checkError = true;
    }
  }

  closeModal(data) {
    this.modalCtrl.dismiss(data);
  }

  checkName(){
    let temp_name = this.renameForm.controls.nameNote.value.trim()
    if(temp_name != ""){
      this.checkEmptyName = false
    }else{
      this.checkEmptyName = true
    }

    if(this.renameForm.invalid){
      this.checkEmptyName = true
    }else if(this.renameForm.valid && temp_name != ""){
      this.checkEmptyName = false
    }
  }

}
