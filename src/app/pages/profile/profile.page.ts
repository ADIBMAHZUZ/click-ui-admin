import { Store } from "@ngxs/store";
import { GetProfile } from "./../auth/store/auth.action";
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import {
  NavController,
  MenuController,
  ToastController,
  ModalController,
  AlertController,
} from "@ionic/angular";
import {
  FormBuilder,
  FormGroup,
  Validators,
  Form,
  FormControl,
} from "@angular/forms";

import { ProfileService } from "./profile.service";
import { TranslateService } from "@ngx-translate/core";
import { isNumber } from "util";
import { PreviewLibraryHomePage } from "src/app/shared/modal/preview-library-home/preview-library-home.page";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  public checkUserType = false;
  public count_checked = 0;
  public count_checked2 = 0;
  public check_change = false;
  public theme_default = [];
  public checkUserTypeLibrary = false;
  public value_default = "op4";
  public check_change_option = false;
  public dataProfile = {
    username: "",
    email: "",
    phone: "",
    address: "",
    name: "",
    short_name: "",
    id: 3,
    created: "",
    modified: "",
    library_id: 0,
    is_active: true,
    number_of_subscribers: 0,
    //  Format as hex
    entire_background_type: "", // select-options [image, color]
    entire_background_image: "null", // [when entire_background_type-image-option]
    entire_background_color: "", // [when entire_background_type-color-option, color can has opacity.]

    media_title_color: "", // [color of title]
    media_border_color: "", // [when entire_background_type-image-option, border color can be transparent]
    media_badge_color: "", // [badge color]
    media_icon_color: "", // [color of icon inside badge]
    media_background_transparent: null,
    media_background_type: "", // select-options [image, color, transparent]
    media_background_color: "", // [when media_background_type-color-option, color of icon inside badge]
    media_background_image: "", // [when media_background_type-image-option]
    school_news_board_title_color: "#",
    school_news_board_border_color: "",
    school_news_board_badge_color: "",
    school_news_board_icon_color: "",
    school_news_board_background_transparent: null,
    school_news_board_background_type: "",
    school_news_board_background_color: "",
    school_news_board_background_image: "",
    teacher_notes_title_color: "",
    teacher_notes_border_color: "",
    teacher_notes_badge_color: "",
    teacher_notes_icon_color: "",
    teacher_notes_background_transparent: null,
    teacher_notes_background_type: "",
    teacher_notes_background_color: "",
    teacher_notes_background_image: "",
    learning_material_title_color: "",
    learning_material_border_color: "",
    learning_material_badge_color: "",
    learning_material_icon_color: "",
    learning_material_background_transparent: null,
    learning_material_background_type: "",
    learning_material_background_color: "",
    learning_material_background_image: "",
    the_school_history_title_color: "",
    the_school_history_border_color: "",
    the_school_history_icon_color: "",
    the_school_history_badge_color: "",
    the_school_history_background_transparent: null,
    the_school_history_background_type: "",
    the_school_history_background_color: "",
    the_school_history_background_image: "",
    student_content_title_color: "",
    student_content_border_color: "",
    student_content_icon_color: "",
    student_content_badge_color: "",
    student_content_background_transparent: null,
    student_content_background_type: "",
    student_content_background_color: "",
    student_content_background_image: "",
    learning_material_title_en: "",
    learning_material_title_ms: "",
    media_title_en: "",
    media_title_ms: "",
    school_news_board_title_en: "",
    school_news_board_title_ms: "",
    student_content_title_en: "",
    student_content_title_ms: "",
    teacher_notes_title_en: "",
    teacher_notes_title_ms: "",
    the_school_history_title_en: "",
    the_school_history_title_ms: "",
  };
  public name = "";
  public short_name = "";
  public address = "";
  public phone = "";
  public username = "";
  public email = "";
  public learning_material_title_en = "";
  public learning_material_title_ms = "";
  public media_title_en = "";
  public media_title_ms = "";
  public school_news_board_title_en = "";
  public school_news_board_title_ms = "";
  public student_content_title_en = "";
  public student_content_title_ms = "";
  public teacher_notes_title_en = "";
  public teacher_notes_title_ms = "";
  public the_school_history_title_en = "";
  public the_school_history_title_ms = "";

  image: any;

  public backgroundOptions = [
    { name: "Image", name_ms: "Imej", value: "image" },
    { name: "Color", name_ms: "Warna", value: "color" },
    { name: "Transparent", name_ms: "Telus", value: "transparent" },
  ];
  public check_file_type = false;
  form: FormGroup = this.formBuilder.group({
    name: [
      "",
      [
        Validators.required,
        Validators.pattern(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{0,}$"
        ),
      ],
    ],
    short_name: ["", [Validators.required]],
    address: ["", []],
    phone: ["", []],
    email: ["", [Validators.email]],

    snew: ["", [Validators.required]],
    student: ["", [Validators.required]],
    history: ["", [Validators.required]],
    note: ["", [Validators.required]],
    media: ["", [Validators.required]],
    material: ["", [Validators.required]],
    snew_ms: ["", [Validators.required]],
    student_ms: ["", [Validators.required]],
    history_ms: ["", [Validators.required]],
    note_ms: ["", [Validators.required]],
    media_ms: ["", [Validators.required]],
    material_ms: ["", [Validators.required]],
    // logo: ['', [Validators.required]],
    background: ["", []],
    backgroundColor: ["", []],
    backgroundImage: ["", []],
    colorTitleMedia: ["", []],
    mediaBackgroundType: ["", []],
    backgroundMediaColor: ["", []],
    backgroundMediaImage: ["", []],
    mediaIcon: ["", []],
    mediaBadge: ["", []],
    mediaTransparent: ["", []],
    mediaBorder: ["", []],
    newsBackgroundType: ["", []],
    noteBackgroundType: ["", []],
    materialBackgroundType: ["", []],
    schoolBackgroundType: ["", []],
    studentBackgroundType: ["", []],
  });

  isFormSubmitted = false;
  error: String = "";
  public checkEntriesBackground = false;
  public checkMediaBackground = false;
  public checkNewsBackground = false;
  public checkNoteBackground = false;
  public checkMaterialBackground = false;
  public checkSchoolBackground = false;
  public checkStudentBackground = false;
  public checkOption = "";
  public checkMediaBgType = "";
  public checkNewsBgType = "";
  public checkNoteBgType = "";
  public checkMaterialBgType = "";
  public checkSchoolBgType = "";
  public checkStudentBgType = "";
  public temp_photo;
  public temp_logo;
  public temp_photo_media;
  public temp_photo_news;
  public temp_photo_note;
  public temp_photo_material;
  public temp_photo_school;
  public temp_photo_student;
  public title = "";
  public title_logo = "";
  public title_media = "";
  public title_news = "";
  public title_note = "";
  public title_material = "";
  public title_school = "";
  public title_student = "";

  public option = [
    {
      id: 1,
      val: "Option 1",
      val_ms: "Pilihan 1",
      isChecked: true,
      value: "op1",
    },
    {
      id: 2,
      val: "Option 2",
      val_ms: "Pilihan 1",
      isChecked: false,
      value: "op2",
    },
    {
      id: 3,
      val: "Option 3",
      val_ms: "Pilihan 1",
      isChecked: false,
      value: "op3",
    },
    {
      id: 4,
      val: "Option custom",
      val_ms: "Pilihan adat",
      isChecked: false,
      value: "op4",
    },
  ];

  public fileTypes = ["image/jpeg", "image/png"];
  public checkSubmit = false;
  public check_file_type_logo = false;
  public check_file_type_media = false;
  public check_file_type_news = false;
  public check_file_type_note = false;
  public check_file_type_material = false;
  public check_file_type_school = false;
  public check_file_type_student = false;
  public checkImageMedia = false;
  public img_media = new Image();
  public checkImage = false;
  public img = new Image();
  public checkImageNews = false;
  public img_logo = new Image();
  public checkImageLogo = false;
  public img_news = new Image();
  public checkImageNote = false;
  public img_note = new Image();
  public checkImageMaterial = false;
  public img_material = new Image();
  public checkImageSchool = false;
  public img_school = new Image();
  public checkImageStudent = false;
  public img_student = new Image();

  public checkLanguage = false;

  public checkPhoneNumber = true;
  constructor(
    private router: Router,
    private navController: NavController,
    private menuController: MenuController,
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    public toastController: ToastController,
    private cdRef: ChangeDetectorRef,
    private modalController: ModalController,
    private alertController: AlertController,
    private store: Store,
    private sanitizer: DomSanitizer
  ) {
    this.translate.use(localStorage.getItem("language"));
    let userType = localStorage.getItem("user_type");
    if (userType == "librarian") {
      this.checkUserTypeLibrary = true;
    } else {
      this.checkUserTypeLibrary = false;
    }

    if (localStorage.getItem("language") == "en") {
      this.checkLanguage = false;
    } else {
      this.checkLanguage = true;
    }
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
    let userType = localStorage.getItem("user_type");
    if (localStorage.getItem("language") == "en") {
      this.checkLanguage = false;
    } else {
      this.checkLanguage = true;
    }

    if (localStorage.getItem("user_type") == "subscriber") {
      this.checkUserType = true;
    } else {
      this.checkUserType = false;
    }

    this.profileService.getThemeDefault().subscribe((data) => {
      this.theme_default = data;
    });

    this.getProfile();

    if (userType == "librarian") {
      this.checkUserTypeLibrary = true;
    } else {
      this.checkUserTypeLibrary = false;
    }

    this.checkOption = this.form.controls.background.value;
    if (this.checkOption == "color") {
      this.checkEntriesBackground = true;
    } else {
      this.checkEntriesBackground = false;
    }

    this.checkMediaBgType = this.form.controls.mediaBackgroundType.value;
    if (this.checkMediaBgType == "color") {
      this.checkMediaBackground = true;
    } else {
      this.checkMediaBackground = false;
    }

    this.checkNewsBgType = this.form.controls.newsBackgroundType.value;
    if (this.checkNewsBgType == "color") {
      this.checkNewsBackground = true;
    } else {
      this.checkNewsBackground = false;
    }

    this.checkNoteBgType = this.form.controls.noteBackgroundType.value;
    if (this.checkNoteBgType == "color") {
      this.checkNoteBackground = true;
    } else {
      this.checkNoteBackground = false;
    }

    this.checkMaterialBgType = this.form.controls.materialBackgroundType.value;
    if (this.checkMaterialBgType == "color") {
      this.checkMaterialBackground = true;
    } else {
      this.checkMaterialBackground = false;
    }

    this.checkSchoolBgType = this.form.controls.schoolBackgroundType.value;
    if (this.checkSchoolBgType == "color") {
      this.checkSchoolBackground = true;
    } else {
      this.checkSchoolBackground = false;
    }

    this.checkStudentBgType = this.form.controls.schoolBackgroundType.value;
    if (this.checkStudentBgType == "color") {
      this.checkStudentBackground = true;
    } else {
      this.checkStudentBackground = false;
    }
  }

  onSubmit() {
    this.checkSubmit = true;
    if (this.checkUserTypeLibrary) {
      if (this.checkEntriesBackground) {
        this.checkImage = true;
        this.check_file_type = false;
      }
      if (
        this.checkMediaBackground ||
        this.dataProfile.media_background_type == "transparent"
      ) {
        this.checkImageMedia = true;
        this.check_file_type_media = false;
      }
      if (
        this.checkNewsBackground ||
        this.dataProfile.school_news_board_background_type == "transparent"
      ) {
        this.checkImageNews = true;
        this.check_file_type_news;
      }
      if (
        this.checkMaterialBackground ||
        this.dataProfile.learning_material_background_type == "transparent"
      ) {
        this.checkImageMaterial = true;
        this.check_file_type_material;
      }
      if (
        this.checkSchoolBackground ||
        this.dataProfile.school_news_board_background_type == "transparent"
      ) {
        this.checkImageSchool = true;
        this.check_file_type_school = false;
      }
      if (
        this.checkStudentBackground ||
        this.dataProfile.student_content_background_type == "transparent"
      ) {
        this.checkImageStudent = true;
        this.check_file_type_student;
      }
      if (
        this.checkNoteBackground ||
        this.dataProfile.teacher_notes_background_type == "transparent"
      ) {
        this.checkImageNote = true;
        this.check_file_type_note;
      }

      if (
        !this.checkImage ||
        !this.checkImageNews ||
        !this.checkImageNote ||
        !this.checkImageMaterial ||
        !this.checkImageMedia ||
        !this.checkImageSchool ||
        !this.checkImageStudent ||
        !this.checkPhoneNumber ||
        this.check_file_type ||
        this.check_file_type_material ||
        this.check_file_type_media ||
        this.check_file_type_news ||
        this.check_file_type_note ||
        this.check_file_type_school ||
        this.check_file_type_student ||
        this.check_file_type_logo
      ) {
      } else {
        let formData = new FormData();

        if (this.temp_logo != undefined) {
          formData.append("logo", this.temp_logo, this.temp_logo.name);
        }

        formData.append("name", this.form.controls.name.value);
        formData.append("short_name", this.form.controls.short_name.value);
        formData.append("phone", this.form.controls.phone.value);
        formData.append("address", this.form.controls.address.value);
        formData.append("email", this.form.controls.email.value);

        let temp_lan = localStorage.getItem("language");
        if (this.checkUserTypeLibrary) {
          formData.append("media_title_en", this.form.controls.media.value);
          formData.append(
            "learning_material_title_en",
            this.form.controls.material.value
          );
          formData.append(
            "student_content_title_en",
            this.form.controls.student.value
          );
          formData.append(
            "the_school_history_title_en",
            this.form.controls.history.value
          );
          formData.append(
            "school_news_board_title_en",
            this.form.controls.snew.value
          );
          formData.append(
            "teacher_notes_title_en",
            this.form.controls.note.value
          );
          formData.append("media_title_ms", this.form.controls.media_ms.value);
          formData.append(
            "learning_material_title_ms",
            this.form.controls.material_ms.value
          );
          formData.append(
            "student_content_title_ms",
            this.form.controls.student_ms.value
          );
          formData.append(
            "the_school_history_title_ms",
            this.form.controls.history_ms.value
          );
          formData.append(
            "school_news_board_title_ms",
            this.form.controls.snew_ms.value
          );
          formData.append(
            "teacher_notes_title_ms",
            this.form.controls.note_ms.value
          );
        }

        formData.append(
          "entire_background_type",
          this.dataProfile.entire_background_type
        );
        if (this.checkEntriesBackground) {
          formData.append(
            "entire_background_color",
            this.dataProfile.entire_background_color
          );
        } else {
          if (this.temp_photo != undefined) {
            formData.append(
              "entire_background_image",
              this.temp_photo,
              this.temp_photo.name
            );
          }
          formData.append(
            "media_border_color",
            this.dataProfile.media_border_color
          );
          formData.append(
            "school_news_board_border_color",
            this.dataProfile.school_news_board_border_color
          );
          formData.append(
            "teacher_notes_border_color",
            this.dataProfile.teacher_notes_border_color
          );
          formData.append(
            "learning_material_border_color",
            this.dataProfile.the_school_history_border_color
          );
          formData.append(
            "the_school_history_border_color",
            this.dataProfile.the_school_history_border_color
          );
          formData.append(
            "student_content_border_color",
            this.dataProfile.student_content_border_color
          );
        }

        // update theme for media
        if (this.checkMediaBackground) {
          formData.append(
            "media_background_color",
            this.dataProfile.media_background_color
          );
        } else {
          if (this.temp_photo_media != undefined) {
            formData.append(
              "media_background_image",
              this.temp_photo_media,
              this.temp_photo_media.name
            );
          }
        }

        formData.append(
          "media_title_color",
          this.dataProfile.media_title_color
        );
        formData.append(
          "media_badge_color",
          this.dataProfile.media_badge_color
        );
        // formData.append("media_background_transparent", this.transparent)
        formData.append("media_icon_color", this.dataProfile.media_icon_color);
        formData.append(
          "media_background_type",
          this.dataProfile.media_background_type
        );

        // update theme for shool news board
        if (this.checkNewsBackground) {
          formData.append(
            "school_news_board_background_color",
            this.dataProfile.school_news_board_background_color
          );
        } else {
          if (this.temp_photo_news != undefined) {
            formData.append(
              "school_news_board_background_image",
              this.temp_photo_news,
              this.temp_photo_news.name
            );
          }
        }

        formData.append(
          "school_news_board_title_color",
          this.dataProfile.school_news_board_title_color
        );
        formData.append(
          "school_news_board_badge_color",
          this.dataProfile.school_news_board_badge_color
        );
        // formData.append("school_news_board_background_transparent", this.school_news_data.transparent_news)
        formData.append(
          "school_news_board_icon_color",
          this.dataProfile.school_news_board_icon_color
        );
        formData.append(
          "school_news_board_background_type",
          this.dataProfile.school_news_board_background_type
        );

        // update theme for teacher note
        if (this.checkNoteBackground) {
          formData.append(
            "teacher_notes_background_color",
            this.dataProfile.teacher_notes_background_color
          );
        } else {
          if (this.temp_photo_note != undefined) {
            formData.append(
              "teacher_notes_background_image",
              this.temp_photo_note,
              this.temp_photo_note.name
            );
          }
        }

        formData.append(
          "teacher_notes_title_color",
          this.dataProfile.teacher_notes_title_color
        );
        formData.append(
          "teacher_notes_badge_color",
          this.dataProfile.teacher_notes_badge_color
        );
        // formData.append("teacher_notes_background_transparent", this.teacher_note_data.transparent_note)
        formData.append(
          "teacher_notes_icon_color",
          this.dataProfile.teacher_notes_icon_color
        );
        formData.append(
          "teacher_notes_background_type",
          this.dataProfile.teacher_notes_background_type
        );

        // update theme for learning material
        if (this.checkMaterialBackground) {
          formData.append(
            "learning_material_background_color",
            this.dataProfile.learning_material_background_color
          );
        } else {
          if (this.temp_photo_material != undefined) {
            formData.append(
              "learning_material_background_image",
              this.temp_photo_material,
              this.temp_photo_material.name
            );
          }
        }

        formData.append(
          "learning_material_title_color",
          this.dataProfile.learning_material_title_color
        );
        formData.append(
          "learning_material_badge_color",
          this.dataProfile.learning_material_badge_color
        );
        // formData.append("learning_material_background_transparent", this.material_data.transparent)
        formData.append(
          "learning_material_icon_color",
          this.dataProfile.learning_material_icon_color
        );
        formData.append(
          "learning_material_background_type",
          this.dataProfile.learning_material_background_type
        );

        // update theme for shool history
        if (this.checkMaterialBackground) {
          formData.append(
            "the_school_history_background_color",
            this.dataProfile.the_school_history_background_color
          );
        } else {
          if (this.temp_photo_school != undefined) {
            formData.append(
              "the_school_history_background_image",
              this.temp_photo_school,
              this.temp_photo_school.name
            );
          }
        }

        formData.append(
          "the_school_history_title_color",
          this.dataProfile.the_school_history_title_color
        );
        formData.append(
          "the_school_history_badge_color",
          this.dataProfile.the_school_history_badge_color
        );
        // formData.append("the_school_history_background_transparent", this.school_data.transparent)
        formData.append(
          "the_school_history_icon_color",
          this.dataProfile.the_school_history_icon_color
        );
        formData.append(
          "the_school_history_background_type",
          this.dataProfile.the_school_history_background_type
        );

        // update theme for student content
        if (this.checkStudentBackground) {
          formData.append(
            "student_content_background_color",
            this.dataProfile.student_content_background_color
          );
        } else {
          if (this.temp_photo_student != undefined) {
            formData.append(
              "student_content_background_image",
              this.temp_photo_student,
              this.temp_photo_student.name
            );
          }
        }

        formData.append(
          "student_content_title_color",
          this.dataProfile.student_content_title_color
        );
        formData.append(
          "student_content_badge_color",
          this.dataProfile.student_content_badge_color
        );
        // formData.append("student_content_background_transparent", this.student_data.transparent)
        formData.append(
          "student_content_icon_color",
          this.dataProfile.student_content_icon_color
        );
        formData.append(
          "student_content_background_type",
          this.dataProfile.student_content_background_type
        );

        this.profileService.updateProfile(formData).subscribe((data) => {
          this.checkImage = false;
          this.checkImageMedia = false;
          this.checkImageNews = false;
          this.checkImageMaterial = false;
          this.checkImageStudent = false;
          this.checkImageNote = false;
          this.checkImageSchool = false;
          if (data?.success) {
            this.updateProfileSuccess();
            this.store.dispatch(new GetProfile());
            this.getProfile();
          }
        });
      }
    } else {
      let formData = new FormData();

      if (this.temp_logo != undefined) {
        formData.append("logo", this.temp_logo, this.temp_logo.name);
      }
      formData.append("name", this.form.controls.name.value);
      formData.append("short_name", this.form.controls.short_name.value);
      formData.append("phone", this.form.controls.phone.value);
      formData.append("address", this.form.controls.address.value);
      formData.append("email", this.form.controls.email.value);
      this.profileService.updateProfile(formData).subscribe((data) => {
        this.checkImage = false;
        this.checkImageMedia = false;
        this.checkImageNews = false;
        this.checkImageMaterial = false;
        this.checkImageStudent = false;
        this.checkImageNote = false;
        this.checkImageSchool = false;
        if (data?.success) {
          this.updateProfileSuccess();
          this.store.dispatch(new GetProfile());
          this.getProfile();
        }
      });
    }
  }

  getProfile() {
    let temp_lan = localStorage.getItem("language");
    this.profileService.getProfile(temp_lan).subscribe((data) => {
      this.getColorProfile(data);
    });
  }

  getColorProfile(data) {
    this.dataProfile = data;
    this.name = data.name;
    this.short_name = data.short_name;
    this.email = data.email;
    this.phone = data.phone;
    this.username = data.username;
    this.img_logo.src = data.logo;
    this.address = data.address;
    this.learning_material_title_en = data.learning_material_title_en;
    this.learning_material_title_ms = data.learning_material_title_ms;
    this.media_title_en = data.media_title_en;
    this.media_title_ms = data.media_title_ms;
    this.school_news_board_title_en = data.school_news_board_title_en;
    this.school_news_board_title_ms = data.school_news_board_title_ms;
    this.student_content_title_en = data.student_content_title_en;
    this.student_content_title_ms = data.student_content_title_ms;
    this.teacher_notes_title_en = data.teacher_notes_title_en;
    this.teacher_notes_title_ms = data.teacher_notes_title_ms;
    this.the_school_history_title_en = data.the_school_history_title_en;
    this.the_school_history_title_ms = data.the_school_history_title_ms;

    this.value_default = "op4";
    if (this.dataProfile.entire_background_type == "image") {
      if (this.dataProfile.entire_background_image != null) {
        this.checkImage = true;
        this.checkEntriesBackground = false;
        this.check_file_type = false;
      } else {
        this.checkImage = false;
      }
    }
    if (this.dataProfile.media_background_type == "image") {
      if (this.dataProfile.media_background_image != null) {
        this.checkImageMedia = true;
        this.checkMediaBackground = false;
        this.check_file_type_media = false;
      } else {
        this.checkImageMedia = false;
      }
    }

    if (this.dataProfile.school_news_board_background_type == "image") {
      if (this.dataProfile.school_news_board_background_image != null) {
        this.checkImageNews = true;
        this.checkNewsBackground = false;
        this.check_file_type_news = false;
      } else {
        this.checkImageNews = false;
      }
    }

    if (this.dataProfile.the_school_history_background_type == "image") {
      if (this.dataProfile.the_school_history_background_image != null) {
        this.checkImageSchool = true;
        this.checkSchoolBackground = false;
        this.check_file_type_school = false;
      } else {
        this.checkImageSchool = false;
      }
    }

    if (this.dataProfile.learning_material_background_type == "image") {
      if (this.dataProfile.learning_material_background_image != null) {
        this.checkImageMaterial = true;
        this.checkMaterialBackground = false;
        this.check_file_type_material = false;
      } else {
        this.checkImageMaterial = false;
      }
    }

    if (this.dataProfile.teacher_notes_background_type == "image") {
      if (this.dataProfile.teacher_notes_background_image != null) {
        this.checkImageNote = true;
        this.checkNoteBackground = false;
        this.check_file_type_note = false;
      } else {
        this.checkImageNote = false;
      }
    }

    if (this.dataProfile.student_content_background_type == "image") {
      if (this.dataProfile.student_content_background_image != null) {
        this.checkImageStudent = true;
        this.checkStudentBackground = false;
        this.check_file_type_student = false;
      } else {
        this.checkImageStudent = false;
      }
    }
  }

  checkPhone() {
    let checkNull = this.form.controls.phone.value;
    let check = parseInt(this.form.controls.phone.value);
    if (check < 0) {
      this.checkPhoneNumber = false;
    } else if (
      (!isNumber(check) || isNaN(check) || check < 0 || !isNumber(checkNull)) &&
      checkNull != "" &&
      check != checkNull
    ) {
      this.checkPhoneNumber = false;
    } else {
      this.checkPhoneNumber = true;
    }
  }

  rgba2hex(orig) {
    var a,
      isPercent,
      rgb = orig
        .replace(/\s/g, "")
        .match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
      alpha = ((rgb && rgb[4]) || "").trim(),
      hex = rgb
        ? (rgb[1] | (1 << 8)).toString(16).slice(1) +
          (rgb[2] | (1 << 8)).toString(16).slice(1) +
          (rgb[3] | (1 << 8)).toString(16).slice(1)
        : orig;

    if (alpha !== "") {
      a = alpha;
    } else {
      a = 1;
    }
    // multiply before convert to HEX
    a = ((a * 255) | (1 << 8)).toString(16).slice(1);
    hex = hex + a;

    return "#" + hex;
  }

  changeName() {
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateFirestoreColor(ev) {
    this.dataProfile.entire_background_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateColorTitleMedia(ev) {
    this.dataProfile.media_title_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateMediaBadgeColor(ev) {
    this.dataProfile.media_badge_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateColorIconMedia(ev) {
    this.dataProfile.media_icon_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateMediaTransparent(ev) {
    this.dataProfile.media_background_transparent = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateMediaBorderColor(ev) {
    this.dataProfile.media_border_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateBackgroundMedia(ev) {
    this.dataProfile.media_background_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateColorTitleNews(ev) {
    this.dataProfile.school_news_board_title_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateNewsBadgeColor(ev) {
    this.dataProfile.school_news_board_badge_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateColorIconNews(ev) {
    this.dataProfile.school_news_board_icon_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateNewsTransparent(ev) {
    this.dataProfile.school_news_board_background_transparent =
      this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateNewsBorderColor(ev) {
    this.dataProfile.school_news_board_border_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateBackgroundNews(ev) {
    this.dataProfile.school_news_board_background_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateColorTitleNote(ev) {
    this.dataProfile.teacher_notes_title_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateNoteBadgeColor(ev) {
    this.dataProfile.teacher_notes_badge_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateColorIconNote(ev) {
    this.dataProfile.teacher_notes_icon_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateNoteTransparent(ev) {
    this.dataProfile.teacher_notes_background_transparent = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateNoteBorderColor(ev) {
    this.dataProfile.teacher_notes_border_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateBackgroundNote(ev) {
    this.dataProfile.teacher_notes_background_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateColorTitleMaterial(ev) {
    this.dataProfile.learning_material_title_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateMaterialBadgeColor(ev) {
    this.dataProfile.learning_material_badge_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateColorIconMaterial(ev) {
    this.dataProfile.learning_material_icon_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateMaterialTransparent(ev) {
    this.dataProfile.learning_material_background_transparent =
      this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateMaterialBorderColor(ev) {
    this.dataProfile.learning_material_border_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateBackgroundMaterial(ev) {
    this.dataProfile.learning_material_background_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateColorTitleSchool(ev) {
    this.dataProfile.the_school_history_title_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateSchoolBadgeColor(ev) {
    this.dataProfile.the_school_history_badge_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateColorIconSchool(ev) {
    this.dataProfile.the_school_history_icon_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateSchoolTransparent(ev) {
    this.dataProfile.the_school_history_background_transparent =
      this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateSchoolBorderColor(ev) {
    this.dataProfile.the_school_history_border_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateBackgroundSchool(ev) {
    this.dataProfile.the_school_history_background_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateColorTitleStudent(ev) {
    this.dataProfile.student_content_title_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateStudentBadgeColor(ev) {
    this.dataProfile.student_content_badge_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateColorIconStudent(ev) {
    this.dataProfile.student_content_icon_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateStudentTransparent(ev) {
    this.dataProfile.student_content_background_transparent = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateStudentBorderColor(ev) {
    this.dataProfile.student_content_border_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  updateBackgroundStudent(ev) {
    this.dataProfile.student_content_background_color = this.rgba2hex(ev);
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  changeOption() {
    this.checkOption = this.form.controls.background.value;
    if (this.checkOption == "color") {
      this.checkEntriesBackground = true;
    } else {
      this.checkEntriesBackground = false;
      if (this.dataProfile.entire_background_image != null) {
        this.checkImage = true;
        this.check_file_type = false;
      } else {
        this.checkImage = false;
      }
    }
    if (!this.check_change_option && this.count_checked > 1) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  changeMediaBackgroundType() {
    this.checkMediaBgType = this.form.controls.mediaBackgroundType.value;
    if (this.checkMediaBgType == "color") {
      this.checkMediaBackground = true;
    } else {
      this.checkMediaBackground = false;
      if (this.dataProfile.media_background_image != null) {
        this.checkImageMedia = true;
        this.check_file_type_media = false;
      } else {
        this.checkImageMedia = false;
      }
    }
    if (
      !this.check_change_option &&
      this.count_checked > 1 &&
      this.count_checked > 1
    ) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  changeNewsBackgroundType() {
    this.checkNewsBgType = this.form.controls.newsBackgroundType.value;
    if (this.checkNewsBgType == "color") {
      this.checkNewsBackground = true;
    } else {
      this.checkNewsBackground = false;
      if (this.dataProfile.school_news_board_background_image != null) {
        this.checkImageNews = true;
        this.check_file_type_news = false;
      } else {
        this.checkImageNews = false;
      }
    }
    if (
      !this.check_change_option &&
      this.count_checked > 1 &&
      this.count_checked > 1
    ) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  changeNoteBackgroundType() {
    this.checkNoteBgType = this.form.controls.noteBackgroundType.value;
    if (this.checkNoteBgType == "color") {
      this.checkNoteBackground = true;
    } else {
      this.checkNoteBackground = false;
      if (this.dataProfile.teacher_notes_background_image != null) {
        this.checkImageNote = true;
        this.check_file_type_note = false;
      } else {
        this.checkImageNote = false;
      }
    }
    if (
      !this.check_change_option &&
      this.count_checked > 1 &&
      this.count_checked > 1
    ) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  changeMaterialBackgroundType() {
    this.checkMaterialBgType = this.form.controls.materialBackgroundType.value;
    if (this.checkMaterialBgType == "color") {
      this.checkMaterialBackground = true;
    } else {
      this.checkMaterialBackground = false;
      if (this.dataProfile.learning_material_background_image != null) {
        this.checkImageMaterial = true;
        this.check_file_type_material = false;
      } else {
        this.checkImageMaterial = false;
      }
    }
    if (
      !this.check_change_option &&
      this.count_checked > 1 &&
      this.count_checked > 1
    ) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  changeSchoolBackgroundType() {
    this.checkSchoolBgType = this.form.controls.schoolBackgroundType.value;
    if (this.checkSchoolBgType == "color") {
      this.checkSchoolBackground = true;
    } else {
      this.checkSchoolBackground = false;
      if (this.dataProfile.the_school_history_background_image != null) {
        this.checkImageSchool = true;
        this.check_file_type_school = false;
      } else {
        this.checkImageSchool = false;
      }
    }
    if (
      !this.check_change_option &&
      this.count_checked > 1 &&
      this.count_checked > 1
    ) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  changeStudentBackgroundType() {
    this.checkStudentBgType = this.form.controls.studentBackgroundType.value;
    if (this.checkStudentBgType == "color") {
      this.checkStudentBackground = true;
    } else {
      this.checkStudentBackground = false;
      if (this.dataProfile.student_content_background_image != null) {
        this.checkImageStudent = true;
        this.check_file_type_student = false;
      } else {
        this.checkImageStudent = false;
      }
    }
    if (
      !this.check_change_option &&
      this.count_checked > 1 &&
      this.count_checked > 1
    ) {
      this.changeOptionRadio();
      this.check_change_option = true;
    }
  }

  onChange(element) {
    if (element[0] != undefined) {
      this.check_file_type = false;
      let file = element[0];
      this.temp_photo = element[0];
      let fileReader: FileReader = new FileReader();
      if (!this.validFileType(element[0].type)) {
        this.check_file_type = true;
      } else {
        this.temp_photo = element[0];
        this.dataProfile.entire_background_image = URL.createObjectURL(file);
      }
      // this.img.src = URL.createObjectURL(file);
      this.title = file.name;
      this.img.title = file.name;
      fileReader.readAsDataURL(file);
      this.checkImage = true;
      if (!this.check_change_option && this.count_checked > 1) {
        this.changeOptionRadio();
        this.check_change_option = true;
      }
    }
  }

  onChangeLogo(element) {
    if (element[0] != undefined) {
      this.check_file_type_logo = false;
      let file = element[0];
      this.temp_logo = element[0];
      let fileReader: FileReader = new FileReader();
      if (!this.validFileType(element[0].type)) {
        this.check_file_type_logo = true;
      } else {
        this.temp_logo = element[0];
        this.img_logo.src = URL.createObjectURL(file);
      }
      // this.img.src = URL.createObjectURL(file);
      this.title_logo = file.name;
      this.img_logo.title = file.name;
      fileReader.readAsDataURL(file);
      this.checkImageLogo = true;
      if (!this.check_change_option && this.count_checked > 1) {
        this.changeOptionRadio();
        this.check_change_option = true;
      }
    }
  }

  onChangeMedia(element) {
    if (element[0] != undefined) {
      this.check_file_type_media = false;
      let file = element[0];
      this.temp_photo_media = element[0];
      let fileReader: FileReader = new FileReader();
      if (!this.validFileType(element[0].type)) {
        this.check_file_type_media = true;
      } else {
        this.temp_photo_media = element[0];
        this.dataProfile.media_background_image = URL.createObjectURL(file);
      }
      // this.img.src = URL.createObjectURL(file);
      this.title_media = file.name;
      this.img_media.title = file.name;
      fileReader.readAsDataURL(file);
      this.checkImageMedia = true;
      if (!this.check_change_option && this.count_checked > 1) {
        this.changeOptionRadio();
        this.check_change_option = true;
      }
    }
  }

  onChangeNews(element) {
    if (element[0] != undefined) {
      this.check_file_type_news = false;
      let file = element[0];
      this.temp_photo_news = element[0];
      let fileReader: FileReader = new FileReader();
      if (!this.validFileType(element[0].type)) {
        this.check_file_type_news = true;
      } else {
        this.temp_photo_news = element[0];
        this.dataProfile.school_news_board_background_image =
          URL.createObjectURL(file);
      }
      // this.img.src = URL.createObjectURL(file);
      this.title_news = file.name;
      this.img_news.title = file.name;
      fileReader.readAsDataURL(file);
      this.checkImageNews = true;
      if (!this.check_change_option && this.count_checked > 1) {
        this.changeOptionRadio();
        this.check_change_option = true;
      }
    }
  }

  onChangeNote(element) {
    if (element[0] != undefined) {
      this.check_file_type_note = false;
      let file = element[0];
      this.temp_photo_note = element[0];
      let fileReader: FileReader = new FileReader();
      if (!this.validFileType(element[0].type)) {
        this.check_file_type_note = true;
      } else {
        this.temp_photo_note = element[0];
        this.dataProfile.teacher_notes_background_image =
          URL.createObjectURL(file);
      }
      // this.img.src = URL.createObjectURL(file);
      this.title_note = file.name;
      this.img_note.title = file.name;
      fileReader.readAsDataURL(file);
      this.checkImageNote = true;
      if (!this.check_change_option && this.count_checked > 1) {
        this.changeOptionRadio();
        this.check_change_option = true;
      }
    }
  }

  onChangeMaterial(element) {
    if (element[0] != undefined) {
      this.check_file_type_material = false;
      let file = element[0];
      this.temp_photo_material = element[0];
      let fileReader: FileReader = new FileReader();
      if (!this.validFileType(element[0].type)) {
        this.check_file_type_material = true;
      } else {
        this.temp_photo_material = element[0];
        this.dataProfile.learning_material_background_image =
          URL.createObjectURL(file);
      }
      // this.img.src = URL.createObjectURL(file);
      this.title_material = file.name;
      this.img_material.title = file.name;
      fileReader.readAsDataURL(file);
      this.checkImageMaterial = true;
      if (!this.check_change_option && this.count_checked > 1) {
        this.changeOptionRadio();
        this.check_change_option = true;
      }
    }
  }

  onChangeSchool(element) {
    if (element[0] != undefined) {
      this.check_file_type_school = false;
      let file = element[0];
      this.temp_photo_school = element[0];
      let fileReader: FileReader = new FileReader();
      if (!this.validFileType(element[0].type)) {
        this.check_file_type_school = true;
      } else {
        this.temp_photo_school = element[0];
        this.dataProfile.the_school_history_background_image =
          URL.createObjectURL(file);
      }
      // this.img.src = URL.createObjectURL(file);
      this.title_school = file.name;
      this.img_school.title = file.name;
      fileReader.readAsDataURL(file);
      this.checkImageSchool = true;
      if (!this.check_change_option && this.count_checked > 1) {
        this.changeOptionRadio();
        this.check_change_option = true;
      }
    }
  }

  onChangeStudent(element) {
    if (element[0] != undefined) {
      this.check_file_type_student = false;
      let file = element[0];
      this.temp_photo_student = element[0];
      let fileReader: FileReader = new FileReader();
      if (!this.validFileType(element[0].type)) {
        this.check_file_type_student = true;
      } else {
        this.temp_photo_student = element[0];
        this.dataProfile.student_content_background_image =
          URL.createObjectURL(file);
      }
      // this.img.src = URL.createObjectURL(file);
      this.title_student = file.name;
      this.img_student.title = file.name;
      fileReader.readAsDataURL(file);
      this.checkImageStudent = true;
      if (!this.check_change_option && this.count_checked > 1) {
        this.changeOptionRadio();
        this.check_change_option = true;
      }
    }
  }

  changeOptionTheme(id) {
    if (id == 1) {
      this.count_checked = 0;
      this.check_change_option = false;
      this.value_default = "op1";
      this.profileService.getThemeDefault().subscribe((data) => {
        this.dataProfile = data[0];
        this.getUrlFromDefautl(this.dataProfile);
      });
    } else if (id == 2) {
      this.count_checked = 0;
      this.check_change_option = false;
      this.value_default = "op2";
      this.profileService.getThemeDefault().subscribe((data) => {
        this.dataProfile = data[1];
        this.getUrlFromDefautl(this.dataProfile);
      });
    } else if (id == 3) {
      this.check_change_option = false;
      this.value_default = "op3";
      this.count_checked = 0;
      this.profileService.getThemeDefault().subscribe((data) => {
        this.dataProfile = data[2];
        this.getUrlFromDefautl(this.dataProfile);
      });
    } else if (id == 4) {
      this.check_change_option = true;
      this.value_default = "op4";
      this.getUrlFromDefautl(this.dataProfile);
    }
  }

  ngAfterViewChecked() {
    this.count_checked++;
    this.cdRef.detectChanges();
  }

  changeOptionRadio() {
    this.value_default = "op4";
  }

  validFileType(file) {
    return this.fileTypes.includes(file);
  }

  async updateProfileSuccess() {
    const toast = await this.toastController.create({
      message: "Your profile has been updated successfully.",
      duration: 2000,
      position: "bottom",
      color: "primary",
      cssClass: "custom-toast",
    });
    toast.present();
  }
  async updateProfileFalse(error) {
    const toast = await this.toastController.create({
      message: error,
      duration: 2000,
      position: "bottom",
      color: "primary",
      cssClass: "custom-toast",
    });
    toast.present();
  }

  getUrlFromDefautl(data) {
    if (data.entire_background_type == "image") {
      if (data.entire_background_image != null) {
        this.checkImage = true;
        this.checkEntriesBackground = false;
        this.check_file_type = false;
        this.profileService
          .getImageFromUrl(data.entire_background_image)
          .subscribe((data) => {
            var file = new File([data], "entrie_background.jpg");
            this.temp_photo = file;
          });
      } else {
        this.checkImage = false;
      }
    }
    if (
      data.media_background_type == "image" ||
      data.media_background_type == "transparent"
    ) {
      if (data.media_background_image != null) {
        this.checkImageMedia = true;
        this.checkMediaBackground = false;
        this.check_file_type_media = false;
        this.profileService
          .getImageFromUrl(data.media_background_image)
          .subscribe((data) => {
            var file = new File([data], "media.jpg");
            this.temp_photo_media = file;
          });
      } else {
        this.checkImageMedia = false;
      }
    }

    if (
      data.school_news_board_background_type == "image" ||
      data.school_news_board_background_type == "transparent"
    ) {
      if (data.school_news_board_background_image != null) {
        this.checkImageNews = true;
        this.checkNewsBackground = false;
        this.check_file_type_news = false;
        this.profileService
          .getImageFromUrl(data.school_news_board_background_image)
          .subscribe((data) => {
            var file = new File([data], "school_news_board.jpg");
            this.temp_photo_news = file;
          });
      } else {
        this.checkImageNews = false;
      }
    }

    if (
      data.the_school_history_background_type == "image" ||
      data.the_school_history_background_type == "transparent"
    ) {
      if (data.the_school_history_background_image != null) {
        this.checkImageSchool = true;
        this.checkSchoolBackground = false;
        this.check_file_type_school = false;
        this.profileService
          .getImageFromUrl(data.the_school_history_background_image)
          .subscribe((data) => {
            var file = new File([data], "school_history.jpg");
            this.temp_photo_school = file;
          });
      } else {
        this.checkImageSchool = false;
      }
    }

    if (
      data.learning_material_background_type == "image" ||
      data.learning_material_background_type == "transparent"
    ) {
      if (data.learning_material_background_image != null) {
        this.checkImageMaterial = true;
        this.checkMaterialBackground = false;
        this.check_file_type_material = false;
        this.profileService
          .getImageFromUrl(data.learning_material_background_image)
          .subscribe((data) => {
            var file = new File([data], "learning_material.jpg");
            this.temp_photo_material = file;
          });
      } else {
        this.checkImageMaterial = false;
      }
    }

    if (
      data.teacher_notes_background_type == "image" ||
      data.teacher_notes_background_type == "transparent"
    ) {
      if (data.teacher_notes_background_image != null) {
        this.checkImageNote = true;
        this.checkNoteBackground = false;
        this.check_file_type_note = false;

        this.profileService
          .getImageFromUrl(data.teacher_notes_background_image)
          .subscribe((data) => {
            var file = new File([data], "teacher_note.jpg");
            this.temp_photo_note = file;
          });
      } else {
        this.checkImageNote = false;
      }
    }

    if (
      data.student_content_background_type == "image" ||
      data.student_content_background_type == "transparent"
    ) {
      if (data.student_content_background_image != null) {
        this.checkImageStudent = true;
        this.checkStudentBackground = false;
        this.check_file_type_student = false;
        this.profileService
          .getImageFromUrl(data.student_content_background_image)
          .subscribe((data) => {
            var file = new File([data], "student_content.jpg");
            this.temp_photo_student = file;
          });
      } else {
        this.checkImageStudent = false;
      }
    }
  }

  changeUrlToFile(url) {
    this.profileService.getImageFromUrl(url).subscribe((data) => {
      var file = new File([data], "sample.jpg");
      return file;
    });
  }

  async previewHomePage() {
    this.dataProfile.name = this.name;
    this.dataProfile.short_name = this.short_name;
    this.dataProfile.email = this.email;
    this.dataProfile.phone = this.phone;
    this.dataProfile.username = this.username;
    this.dataProfile.address = this.address;
    this.dataProfile.learning_material_title_en =
      this.learning_material_title_en;
    this.dataProfile.learning_material_title_ms =
      this.learning_material_title_ms;
    this.dataProfile.media_title_en = this.media_title_en;
    this.dataProfile.media_title_ms = this.media_title_ms;
    this.dataProfile.school_news_board_title_en =
      this.school_news_board_title_en;
    this.dataProfile.school_news_board_title_ms =
      this.school_news_board_title_ms;
    this.dataProfile.student_content_title_en = this.student_content_title_en;
    this.dataProfile.student_content_title_ms = this.student_content_title_ms;
    this.dataProfile.teacher_notes_title_en = this.teacher_notes_title_en;
    this.dataProfile.teacher_notes_title_ms = this.teacher_notes_title_ms;
    this.dataProfile.the_school_history_title_en =
      this.the_school_history_title_en;
    this.dataProfile.the_school_history_title_ms =
      this.the_school_history_title_ms;

    const modal = await this.modalController.create({
      component: PreviewLibraryHomePage,
      showBackdrop: false,
      cssClass: "myModalClass",
      componentProps: {
        dataLibrary: this.dataProfile,
      },
    });
    return await modal.present();
  }

  async deleteAccount() {
    const alert = await this.alertController.create({
      header: "",
      cssClass: "my-custom-alert",
      message: this.translate.instant("Profile.delete_request"),
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
        },
        {
          text: "Ok",
          handler: () => {
            this.profileService
              .requestDelete(this.dataProfile?.library_id)
              .subscribe((data) => {
                if (data?.success) {
                  this.DeleteSuccess();
                }
              });
          },
        },
      ],
    });
    await alert.present();
  }

  async DeleteSuccess() {
    const toast = await this.toastController.create({
      message: "send_success",
      duration: 2000,
      position: "bottom",
      color: "primary",
      cssClass: "custom-toast",
    });
    toast.present();
  }

  zoomPicture(imgUrl) {
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(imgUrl);
  }

  closeZoom() {
    this.image = "";
  }
}
