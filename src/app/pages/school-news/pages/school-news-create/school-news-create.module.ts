import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchoolNewsCreatePageRoutingModule } from './school-news-create-routing.module';

import { SchoolNewsCreatePage } from './school-news-create.page';
import { QuillModule } from 'ngx-quill'
import { BrowserModule } from '@angular/platform-browser';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchoolNewsCreatePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    // BrowserModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],
      
          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction
      
          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }],
          [{ 'align': [] }],
      
          ['clean'],                                         // remove formatting button
      
          ['link', 'image', 'video']                         // link and image, video
        ]
      }
    })
  ],
  declarations: [SchoolNewsCreatePage]
})
export class SchoolNewsCreatePageModule {}
