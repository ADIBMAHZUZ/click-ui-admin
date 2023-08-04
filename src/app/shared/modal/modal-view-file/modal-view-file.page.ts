import {
  Component,
  OnInit,
  Input,
  Pipe,
  PipeTransform,
  ViewChild,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { MediaService } from "src/app/services/media.service";

@Component({
  selector: "app-modal-view-file",
  templateUrl: "./modal-view-file.page.html",
  styleUrls: ["./modal-view-file.page.scss"],
})
export class ModalViewFilePage implements OnInit {
  // Data passed in by componentProps
  @Input() url: string;
  // @Input() mp3: string;
  @Input() type: string;
  // @Input() pdf: string;
  public filePdf = "";
  public check_type = 0;
  public check_pdf = false;
  public test = "/assets/video/1.mp4";
  public fileContent = "";
  public docType = ["ppt", "pptx", "doc", "docx", "xls", "xlsx"];
  public imageType = ["png", "jpeg", "jpg"];

  imgCollection: Array<object> = [
    {
      image: "https://loremflickr.com/g/600/400/paris",
      alt: "Image 1",
      title: "Image 1",
    },
  ];
  constructor(
    private sanitizer: DomSanitizer,
    private mediaService: MediaService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    // console.log(this.pdf)
    // this.filePdf = this.pdf
    if (this.type == "mp4") {
      this.check_type = 1;
    } else if (this.type == "mp3") {
      this.check_type = 2;
    } else if (this.type == "pdf") {
      this.check_type = 3;
    } else if (this.docType.some((type) => this.type == type)) {
      this.check_type = 4;
    } else if (this.imageType.some((type) => this.type == type)) {
      this.check_type = 5;
    } else if (this.type == "txt") {
      this.check_type = 6;
      this.mediaService.getText(this.url).subscribe((data) => {
        this.fileContent = data;
      });
    }
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  photoURL() {
    return this.sanitizer.bypassSecurityTrustUrl(this.url);
  }
}
