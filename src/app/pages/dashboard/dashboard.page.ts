import { DashboardState } from "./stores/dashboard.state";
import { GetDashboard } from "./stores/dashboard.actions";
import { Store } from "@ngxs/store";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { url } from "inspector";
import { map } from "rxjs/operators";
import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { DashboardService } from "src/app/services/dashboard.service";
import { MatDatepicker } from "@angular/material/datepicker";
import * as moment from "moment";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"],
})
export class DashboardPage implements OnInit {
  @ViewChild(MatDatepicker) private rangePicker: MatDatepicker<Date>;
  public checkPublisher = false;
  form: FormGroup;
  year: number;
  public totalRegister = [
    { title: "publishers", quantity: 0, url: "/media/book" },
    { title: "libraries", quantity: 0, url: "/media/book" },
    { title: "teachers", quantity: 0 },
    { title: "subscribers", quantity: 0 },
  ];

  public totalUpload = [
    { title: "books", quantity: 0, url: "/media/book" },
    { title: "videos", quantity: 0, url: "/media/video" },
    { title: "audio", quantity: 0, url: "/media/audio" },
  ];

  constructor(
    private translate: TranslateService,
    private dashBoardService: DashboardService,
    private cdr: ChangeDetectorRef,
    private _store: Store,
    private _fb: FormBuilder
  ) {
    this.translate.use(localStorage.getItem("language"));
  }

  ngOnInit() {
    this.translate.use(localStorage.getItem("language"));
    let temp = localStorage.getItem("user_type");
    if (temp == "admin") {
      this.checkPublisher = false;
    } else {
      this.checkPublisher = true;
    }
    this._store.dispatch(new GetDashboard());
    this.subscription();
    this.year = moment().get("years");
  }

  subscription() {
    this._store.select(DashboardState.getDashboard).subscribe((result) => {
      if (!result) return;
      const data = result?.dashboard?.data;
      this.totalRegister = [
        {
          title: "publishers",
          quantity: Number(data?.number_of_publishers),
          url: "/publisher",
        },
        {
          title: "libraries",
          quantity: Number(data?.number_of_libraries),
          url: "/library",
        },
        {
          title: "teachers",
          quantity: Number(data?.number_of_teachers),
        },
        {
          title: "subscribers",
          quantity: Number(data?.number_of_subscribers),
        },
      ];

      this.totalUpload = [
        {
          title: "books",
          quantity: Number(data?.number_of_books),
          url: "/media/book",
        },
        {
          title: "videos",
          quantity: Number(data?.number_of_videos),
          url: "/media/video",
        },
        {
          title: "audio",
          quantity: Number(data?.number_of_audio),
          url: "/media/audio",
        },
      ];
    });
  }

  ionViewWillEnter() {
    // this.translate.use(localStorage.getItem("language"));
    // let temp = localStorage.getItem("user_type");
    // if (temp == "admin") {
    //   this.checkPublisher = false;
    // } else {
    //   this.checkPublisher = true;
    // }
    // this.dashBoardService.listDashboard().subscribe((data) => {
    //   this.dataDashboard = data;
    // });
    // this.totalUpload = [
    //   { title: "books", quantity: Number(this.dataDashboard.number_of_books) },
    //   {
    //     title: "videos",
    //     quantity: Number(this.dataDashboard.number_of_videos),
    //   },
    //   { title: "audio", quantity: Number(this.dataDashboard.number_of_audio) },
    // ];
  }
}
