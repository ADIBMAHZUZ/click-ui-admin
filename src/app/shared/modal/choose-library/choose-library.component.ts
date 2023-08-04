import { LibraryService } from "./../../../services/library.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { PublisherService } from "src/app/services/publisher.service";
import { ModalController } from "@ionic/angular";
import { Component, Input } from "@angular/core";
import { Library } from "../../model/model";
import { Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-choose-library",
  templateUrl: "./choose-library.component.html",
  styleUrls: ["./choose-library.component.scss"],
})
export class ChooseLibraryComponent {
  @Input() data: any;
  dataLibrary: Library[];
  form: FormGroup;

  private subscription = new Subscription();
  constructor(
    private modalController: ModalController,
    private libraryService: LibraryService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      search: [""],
      library: [this.data],
    });
  }

  ngOnInit(): void {
    this.initData();
    this.subscriptions();
  }

  subscriptions() {
    this.subscription.add(
      this.form
        .get("search")
        .valueChanges.pipe(debounceTime(300))
        .subscribe((data) => {
          if (data.length > 2 || data == "") {
            this.initData();
          }
        })
    );
  }

  initData() {
    this.subscription.add(
      this.libraryService
        .search({ name: this.search.value })
        .subscribe((data) => {
          this.dataLibrary = data?.results;
        })
    );
  }

  reset() {
    this.search.setValue("");
    this.initData();
  }

  public objectComparisonFunction = function (option, value): boolean {
    return option.id === value?.id;
  };

  onChange({ value }) {
    this.modalController.dismiss(value, "submit");
  }

  get search() {
    return this.form.get("search");
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
