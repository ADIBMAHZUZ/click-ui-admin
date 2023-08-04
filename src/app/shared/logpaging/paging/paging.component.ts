import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { GlobalMenuService } from "src/app/services/global-menu.service";

// import paginate = require('jw-paginate');
// import * as ns from "jw-paginate"

// import paginate from 'jw-paginate';
// declare var require: any
const paginate = require("jw-paginate");
// import paginate from 'jw-paginate' // or
// import paginate = require('jw-paginate')

@Component({
  moduleId: module.id,
  selector: "jw-pagination",
  template: `<ul *ngIf="pager.pages && pager.pages.length" class="pagination">
    <li
      [ngClass]="{ disabled: pager.currentPage === 1 }"
      class="page-item first-item"
    >
      <a (click)="setPage(1)" class="page-link">First</a>
    </li>
    <li
      [ngClass]="{ disabled: pager.currentPage === 1 }"
      class="page-item previous-item"
    >
      <a (click)="setPage(pager.currentPage - 1)" class="page-link">Previous</a>
    </li>
    <li
      *ngFor="let page of pager.pages"
      [ngClass]="{ active: pager.currentPage === page }"
      class="page-item number-item"
    >
      <a (click)="setPage(page)" class="page-link">{{ page }}</a>
    </li>
    <li
      [ngClass]="{ disabled: pager.currentPage === pager.totalPages }"
      class="page-item next-item"
    >
      <a (click)="setPage(pager.currentPage + 1)" class="page-link">Next</a>
    </li>
    <li
      [ngClass]="{ disabled: pager.currentPage === pager.totalPages }"
      class="page-item last-item"
    >
      <a (click)="setPage(pager.totalPages)" class="page-link">Last</a>
    </li>
  </ul>`,
})
export class JwPaginationComponent implements OnInit, OnChanges {
  @Input() items: number;
  @Output() changePage = new EventEmitter<any>(true);
  @Input() initialPage = 1;
  @Input() pageSize = 10;
  @Input() maxPages = 10;

  pager: any = {};
  constructor(private globalFooService: GlobalMenuService) {}
  ngOnInit() {
    // set page if items array isn't empty
    if (this.items && this.items) {
      this.setPage(this.initialPage);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // reset page if items array has changed
    if (changes.items?.currentValue !== changes.items?.previousValue) {
      this.setPage(this.initialPage);
    }
    this.globalFooService.getObservableFilter().subscribe((data) => {
      this.setPage(data.page);
    });
    this.globalFooService.getObservableFilterLog().subscribe((data) => {
      this.setPage(data.page);
    });
  }

  public setPage(page: number) {
    // get new pager object for specified page
    this.pager = paginate(this.items, page, this.pageSize, this.maxPages);

    // get new page of items from items array
    // var pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);

    var pageOfItems = this.pager.startIndex / this.pageSize + 1;
    var temp = false;
    // console.log(pageOfItems)
    // this.globalFooService.getObservable().subscribe(data => {
    //     this.changePage.emit(data.page);
    // })

    this.globalFooService.getObservableTeacherNote().subscribe((data) => {
      this.changePage.emit(data.page);
    });

    // call change page function in parent component
    this.changePage.emit(pageOfItems);
  }
}
