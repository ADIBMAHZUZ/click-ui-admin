import { Subscription } from "rxjs";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { PublisherService } from "src/app/services/publisher.service";
import { ModalController } from "@ionic/angular";
import { Component, Input } from "@angular/core";
import { Publisher } from "../../model/model";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-choose-publisher",
  templateUrl: "./choose-publisher.component.html",
  styleUrls: ["./choose-publisher.component.scss"],
})
export class ChoosePublisherComponent {
  @Input() data: any;
  dataPublisher: Publisher[];
  form: FormGroup;

  private subscription = new Subscription();
  constructor(
    private modalController: ModalController,
    private publisherService: PublisherService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      search: [""],
      publisher: [this.data],
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
    this.publisherService
      .search({ name: this.search.value })
      .subscribe((data) => {
        this.dataPublisher = data;
      });
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
    return this.form.get("search") as FormControl;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
