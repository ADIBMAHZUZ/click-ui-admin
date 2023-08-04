import { Component, OnInit, Input } from '@angular/core';
import { style } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';

const defaultStyles = {
  entireBackgroundType: 'image',
  entireBackgroundImage: '/assets/images/home/home-library.jpg',
  entireBackgroundColor: '#00ff00',
  mediaTitleColor: '#ffffff',
  mediaBorderColor: '#ffffff50',
  mediaBadgeColor: '#00a2d2',
  mediaIconColor: '#ffffff',
  mediaBackgroundTransparent: null,
  mediaBackgroundType: 'color',
  mediaBackgroundColor: '#00000070',
  mediaBackgroundImage: '/assets/images/home/home-library.jpg',
  schoolNewsBoardTitleColor: '#ffffff',
  schoolNewsBoardBorderColor: '#ffffff50',
  schoolNewsBoardBadgeColor: '#09d172',
  schoolNewsBoardIconColor: '#ffffff',
  schoolNewsBoardBackgroundTransparent: null,
  schoolNewsBoardBackgroundType: 'color',
  schoolNewsBoardBackgroundColor: '#00000070',
  schoolNewsBoardBackgroundImage: '/assets/images/home/home-school-news.jpg',
  teacherNotesTitleColor: '#ffffff',
  teacherNotesBorderColor: '#ffffff50',
  teacherNotesBadgeColor: '#a30303',
  teacherNotesIconColor: '#ffffff',
  teacherNotesBackgroundTransparent: null,
  teacherNotesBackgroundType: 'color',
  teacherNotesBackgroundColor: '#00000070',
  teacherNotesBackgroundImage: '/assets/images/home/home-teacher-notes.jpg',
  learningMaterialTitleColor: '#ffffff',
  learningMaterialBorderColor: '#ffffff50',
  learningMaterialBadgeColor: '#ff4417',
  learningMaterialIconColor: '#ffffff',
  learningMaterialBackgroundTransparent: null,
  learningMaterialBackgroundColor: '#00000070',
  learningMaterialBackgroundImage: '/assets/images/home/home-material.jpg',
  learningMaterialBackgroundType: 'color',
  theSchoolHistoryTitleColor: '#ffffff',
  theSchoolHistoryBorderColor: '#ffffff50',
  theSchoolHistoryBadgeColor: '#ffc100',
  theSchoolHistoryIconColor: '#ffffff',
  theSchoolHistoryBackgroundTransparent: null,
  theSchoolHistoryBackgroundType: 'color',
  theSchoolHistoryBackgroundColor: '#00000070',
  theSchoolHistoryBackgroundImage: '/assets/images/home/home-material.jpg',
  studentContentTitleColor: '#ffffff',
  studentContentBorderColor: '#ffffff50',
  studentContentIconColor: '#ffffff',
  studentContentBadgeColor: '#ffea00',
  studentContentBackgroundTransparent: null,
  studentContentBackgroundType: 'color',
  studentContentBackgroundColor: '#00000070',
  studentContentBackgroundImage: '/assets/images/home/home-student-content.jpg',
};
@Component({
  selector: 'app-preview-library-home',
  templateUrl: './preview-library-home.page.html',
  styleUrls: ['./preview-library-home.page.scss'],
})
export class PreviewLibraryHomePage implements OnInit {
  titles: any[];
  homeBackground: any;
  public styles: object
  @Input() dataLibrary: object;
  constructor(
    private translate: TranslateService
  ) {
    this.translate.use(localStorage.getItem('language'))
   }

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'))
    let styles = this.dataLibrary
    
    switch (styles['entire_background_type']) {
      case 'image':
        // this.homeBackground = `--background: url(${styles['entire_background_image']}) no-repeat center center / cover;`;
        this.homeBackground = `--background: url(${styles['entire_background_image']}) no-repeat 0 0;`;
        break;
      case 'color':
        this.homeBackground = `--background: ${styles['entire_background_color']}; `;
        break;
      default:
        this.homeBackground = `--background: url(/assets/img/school-history.jpg) no-repeat center center / cover;`;
        break;
    }

    let temp_title = {
      title_media: "",
      title_material: "",
      title_news: "",
      title_school: "",
      title_student: "",
      title_note: ""
    }

    if(localStorage.getItem("language") == "en"){
      temp_title = {
        title_media: styles['media_title_en'],
        title_material: styles['learning_material_title_en'],
        title_news: styles['school_news_board_title_en'],
        title_school: styles['the_school_history_title_en'],
        title_student: styles['student_content_title_en'],
        title_note: styles['teacher_notes_title_en']
      }
    }else{
      temp_title = {
        title_media: styles['media_title_ms'],
        title_material: styles['learning_material_title_ms'],
        title_news: styles['school_news_board_title_ms'],
        title_school: styles['the_school_history_title_ms'],
        title_student: styles['student_content_title_ms'],
        title_note: styles['teacher_notes_title_ms']
      }
    }

    this.titles = [
      {
        type: styles['media_background_type'],
        src: styles['media_background_image'],
        color: styles['media_title_color'],
        bgColor: styles['media_background_color'],
        borderColor: styles['media_border_color'],
        badgeColor: styles['media_badge_color'],
        iconColor: styles['media_icon_color'],
        title: temp_title.title_media
      },
      {
        type: styles['school_news_board_background_type'],
        src: styles['school_news_board_background_image'],
        color: styles['school_news_board_title_color'],
        bgColor: styles['school_news_board_background_color'],
        borderColor: styles['school_news_board_border_color'],
        badgeColor: styles['school_news_board_badge_color'],
        iconColor: styles['school_news_board_icon_color'],
        title: temp_title.title_news
      },
      {
        type: styles['teacher_notes_background_type'],
        src: styles['teacher_notes_background_image'],
        color: styles['teacher_notes_title_color'],
        bgColor: styles['teacher_notes_background_color'],
        borderColor: styles['teacher_notes_border_color'],
        badgeColor: styles['teacher_notes_badge_color'],
        iconColor: styles['teacher_notes_icon_color'],
        title: temp_title.title_note
      },
      {
        type: styles['learning_material_background_type'],
        src: styles['learning_material_background_image'],
        color: styles['learning_material_title_color'],
        bgColor: styles['learning_material_background_color'],
        borderColor: styles['learning_material_border_color'],
        badgeColor: styles['learning_material_badge_color'],
        iconColor: styles['learning_material_icon_color'],
        title: temp_title.title_material
      },
      {
        type: styles['the_school_history_background_type'],
        src: styles['the_school_history_background_image'],
        color: styles['the_school_history_title_color'],
        bgColor: styles['the_school_history_background_color'],
        borderColor: styles['the_school_history_border_color'],
        badgeColor: styles['the_school_history_badge_color'],
        iconColor: styles['the_school_history_icon_color'],
        title: temp_title.title_school
      },
      {
        type: styles['student_content_background_type'],
        src: styles['student_content_background_image'],
        color: styles['student_content_title_color'],
        bgColor: styles['student_content_background_color'],
        borderColor: styles['student_content_border_color'],
        badgeColor: styles['student_content_badge_color'],
        iconColor: styles['student_content_icon_color'],
        title: temp_title.title_student
      },
    ];

    console.log(this.dataLibrary)
  }

  getBackground(i): any {
    const title = this.titles[i];
    let resultStyle = '';

    switch (title.type) {
      case 'image':
        resultStyle += `
        --background-overlay-left: rgba(0, 0, 0, 0.5);
        --background-overlay-right: rgba(0, 0, 0, 0.8);
        --background-image: url(${title.src});

        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;`;
        break;
      case 'transparent':
        resultStyle += `background: transparent; 
        --background-image: url('');`;
        resultStyle += `border: .25px solid ${title.borderColor};`;
        break;
      case 'color':
        resultStyle += `background: ${title.bgColor}; 
          --background-image: url('');`;
        resultStyle += `border: .25px solid ${title.borderColor};`;
        break;
      default:
    }
    resultStyle += `color: ${title.color};`;
    resultStyle += `--badge-color: ${title.badgeColor};`;
    resultStyle += `--icon-color: ${title.iconColor};`;
    return resultStyle;
  }

  ionViewWillEnter(){
  }

}
