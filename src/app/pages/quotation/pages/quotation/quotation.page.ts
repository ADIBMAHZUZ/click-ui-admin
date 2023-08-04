import {
  LoadCountMediaExpired,
  LoadCountNotification,
} from "./../../../notification/store/notification.actions";
import { ToastController } from "@ionic/angular";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { parseI18nMeta } from "@angular/compiler/src/render3/view/i18n/meta";
import { QuotationService } from "src/app/services/quotation.service";
import { Quotation } from "../../shared/model/model";
import { QuotationType, UserType } from "src/app/shared/model/model";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Store } from "@ngxs/store";

@Component({
  selector: "app-quotation",
  templateUrl: "./quotation.page.html",
  styleUrls: ["./quotation.page.scss"],
})
export class QuotationPage implements OnInit {
  quotation: Quotation;
  displayColumns = [
    "no",
    "title",
    "material",
    "price",
    "quantity",
    "period",
    "total",
  ];
  currentDate = moment().format("DD-MM-yyyy");
  quotationForm: FormGroup;
  userType = localStorage.getItem("user_type");
  quotationId: any;
  checkSubmit: boolean = false;
  inputRefNo: boolean = true;
  disableSend: boolean = false;
  disableCommission: boolean = false;
  total: number = 0;
  commission: number = 0;
  termRole: string;

  constructor(
    private quotationService: QuotationService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController,
    private store: Store
  ) {
    this.declareForm();
  }

  declareForm() {
    this.quotationForm = this.fb.group({
      refNo: ["", Validators.required],
      percent: [
        "10",
        [Validators.required, Validators.max(100), Validators.min(0)],
      ],
      // quotationDate: [],
    });
  }

  ngOnInit(): void {
    this.quotationId = this.route.snapshot.paramMap.get("id");
  }

  ionViewWillEnter(): void {
    this.loadQuotation(this.quotationId);
  }

  loadQuotation(id: any) {
    this.quotationService.viewQuotation(id).subscribe((data) => {
      this.quotation = data?.results;
      this.quotationForm.patchValue({
        refNo: data?.results?.ref_no,
        percent: data?.results?.commission || 10,
      });
      this.calculateTotal();
      this.checkDisableSend();
      if (this.quotation.quotation_type == "commission") {
        this.calculateCommission();
      }
    });
  }

  onSubmit() {
    this.checkSubmit = true;

    const { refNo: refNo, percent } = this.quotationForm.value;
    let param;

    if (
      (this.userType == "librarian" &&
        this.quotation.quotation_type == "quotation") ||
      (this.userType == "publisher" &&
        this.quotation.quotation_type == "commission")
    ) {
      param = {
        ref_no: refNo,
      };
      if (this.refNo.invalid) return;
    }

    if (this.userType == "admin") {
      param = {
        commission: percent,
      };
      if (this.percent.invalid) return;
    }

    this.quotationService
      .sendQuotation(this.quotationId, param)
      .subscribe((data) => {
        if (data?.success) {
          this.router.navigate(["/notification"]);
          this.store.dispatch(new LoadCountNotification());
          this.store.dispatch(new LoadCountMediaExpired());
        } else {
          this.submitFalse(data?.message);
        }
      });
  }

  async submitSuccessful() {
    let title = "Transaction successfully";
    if (this.userType == "publisher") {
      title = "Quotation has send";
    }
    const toast = await this.toastController.create({
      message: "",
      duration: 2000,
      position: "bottom",
      color: "primary",
      cssClass: "custom-toast",
    });
    toast.present();
  }

  async submitFalse(error) {
    const toast = await this.toastController.create({
      message: error,
      duration: 2000,
      position: "bottom",
      color: "danger",
      cssClass: "custom-toast",
    });
    toast.present();
  }

  calculateTotal() {
    this.total = 0;
    for (const product of this.quotation?.products) {
      this.total =
        this.total + product?.price * product?.period * product?.quantity;
    }
  }

  calculateCommission() {
    this.commission = 0;
    if (this.percent.valid) {
      this.commission = this.total * (this.percent.value / 100);
    }
  }

  handleChange(event) {
    if (event.target.value > 100) {
      this.percent.setValue(100);
    }
    if (event.target.value < 0) {
      this.percent.setValue(0);
    }
    this.calculateCommission();
  }

  checkDisableSend() {
    if (!this.quotation.is_send) {
      this.disableSend = true;
    }

    if (this.quotation.quotation_type == QuotationType.QUOTATION) {
      this.termRole = "publisher";
      if (
        this.userType == UserType.PUBLISHER ||
        (this.userType == UserType.LIBRARIAN && this.quotation.ref_no)
      ) {
        this.inputRefNo = false;
      }
      if (
        this.quotation.is_send == true &&
        this.userType == UserType.LIBRARIAN
      ) {
        this.disableSend = true;
      }
    }

    if (this.quotation.quotation_type == QuotationType.COMMISSION) {
      this.termRole = "admin";
      if (
        this.userType == UserType.ADMIN ||
        (this.userType == UserType.PUBLISHER && this.quotation.ref_no)
      ) {
        this.inputRefNo = false;
      }
      if (
        (this.userType == UserType.ADMIN && this.quotation.is_send) ||
        this.userType == UserType.PUBLISHER
      ) {
        this.disableCommission = true;
      }
      if (
        this.quotation.is_send == true &&
        this.userType == UserType.PUBLISHER
      ) {
        this.disableSend = true;
      }
    }

    if (this.quotation.ref_no) {
      this.disableSend = false;
    }
  }

  htmltoPDF() {
    // parentdiv is the html element which has to be converted to PDF
    html2canvas(document.querySelector("#print-section")).then((canvas) => {
      var pdf = new jsPDF("landscape", "pt", [canvas.width, canvas.height]);

      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData, 0, 0, canvas.width, canvas.height);
      pdf.save("quotation_" + moment().format("MM/dd/yyyy") + ".pdf");
    });
  }

  get percent() {
    return this.quotationForm.get("percent") as FormControl;
  }

  get refNo() {
    return this.quotationForm.get("refNo") as FormControl;
  }
}
