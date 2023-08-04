import { ModalController } from "@ionic/angular";
import { MediaService } from "./../../../services/media.service";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
} from "@angular/forms";
import { MatInput } from "@angular/material/input";

@Component({
  selector: "app-choose-category",
  templateUrl: "./choose-category.component.html",
  styleUrls: ["./choose-category.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseCategoryComponent implements OnInit {
  @Output() emitService = new EventEmitter();
  @Input() specific: string;
  @Input() main: string;
  @Input() multiple: boolean = false;
  listSpecificCategory: any;
  list: any;
  categoryForm: FormGroup;
  mainCategory = [
    {
      id: 1,
      name: "Primary School",
    },
    {
      id: 2,
      name: "Public",
    },
    {
      id: 3,
      name: "University/College",
    },
    {
      id: 4,
      name: "Secondary School",
    },
    {
      id: 5,
      name: "Kindergarten",
    },
  ];
  constructor(
    // private rootFormGroup: FormGroupDirective,
    private mediaService: MediaService,
    private fb: FormBuilder,
    private modalController: ModalController,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.mediaService.listCategories().subscribe((data) => {
      this.list = data;
      this.listSpecificCategory = data;
    });
    this.categoryForm = this.fb.group({
      mainCategory: [this.main],
      specificCategory: [this.specific],
    });
    this._cdr.detectChanges();
  }

  submit() {
    this.modalController.dismiss(
      {
        mainCategory: this.categoryForm.controls["mainCategory"].value,
        specificCategory: this.categoryForm.controls["specificCategory"].value,
      },
      "submit"
    );
  }

  cancel() {
    this.modalController.dismiss({}, "cancel");
  }

  public objectComparisonFunction = function (option, value): boolean {
    return option.id === value?.id;
  };

  search(event) {
    this.listSpecificCategory = this.list.filter((item) =>
      item.name.toLowerCase().includes(event.target.value)
    );
    this._cdr.detectChanges();
  }
}
