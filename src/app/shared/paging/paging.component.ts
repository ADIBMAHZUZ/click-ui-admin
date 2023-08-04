import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { GlobalMenuService } from 'src/app/services/global-menu.service';

// import paginate = require('jw-paginate');
// import * as ns from "jw-paginate"

// import paginate from 'jw-paginate';
// declare var require: any
const paginate = require("jw-paginate");
// import paginate from 'jw-paginate' // or
// import paginate = require('jw-paginate')

@Component({
  moduleId: module.id,
  selector: 'jw-pagination',
  template: `<ul *ngIf="pager.pages && pager.pages.length" class="pagination">
  <li [ngClass]="{disabled:pager.currentPage === 1}" class="page-item first-item">
      <a (click)="setPage(1, true)" class="page-link">First</a>
  </li>
  <li [ngClass]="{disabled:pager.currentPage === 1}" class="page-item previous-item">
      <a (click)="setPage(pager.currentPage - 1, true)" class="page-link">Previous</a>
  </li>
  <li *ngFor="let page of pager.pages" [ngClass]="{active:pager.currentPage === page}" class="page-item number-item">
      <a (click)="setPage(page, true)" class="page-link">{{page}}</a>
  </li>
  <li [ngClass]="{disabled:pager.currentPage === pager.totalPages}" class="page-item next-item">
      <a (click)="setPage(pager.currentPage + 1, true)" class="page-link">Next</a>
  </li>
  <li [ngClass]="{disabled:pager.currentPage === pager.totalPages}" class="page-item last-item">
      <a (click)="setPage(pager.totalPages, true)" class="page-link">Last</a>
  </li>
</ul>`
})

export class JwPaginationComponent implements OnInit, OnChanges {
  @Input() items: number;
  @Output() changePage = new EventEmitter<any>(true);
  @Input() initialPage = 1;
  @Input() pageSize = 10;
  @Input() maxPages = 10;

  public getNewBook
  public getNewAudio
  public getNewVideo

  pager: any = {};
  constructor(
    private globalFooService: GlobalMenuService,
    private cdr: ChangeDetectorRef
  ) { 
  }
  ngOnInit() {
    // set page if items array isn't empty
    if (this.items && this.items) {
      this.setPage(this.initialPage, true);
    }
    // this.setPage(this.initialPage)
    this.globalFooService.getObservableTeacherNoteChangePage().subscribe(data => {
      if(data.item != undefined){
        this.items = data.item
      }
      this.setPage(this.initialPage, true);
    })

    //get new for book
    this.getNewBook = this.globalFooService.getObservableChangePageNew().subscribe(data => {
      if(data.item != undefined){
        this.items = data.item
      }
      if(data.page != undefined){
        this.setPage(data.page, data.check);
      }else{
        this.setPage(this.initialPage, data.check);
      }
    })

    //get new for audio
    this.getNewAudio = this.globalFooService.getObservableChangePageNewAudio().subscribe(data => {
      if(data.item != undefined){
        this.items = data.item
      }
      if(data.page != undefined){
        this.setPage(data.page, data.check);
      }else{
        this.setPage(this.initialPage, data.check);
      }
    })

    //get new for video
    this.getNewVideo = this.globalFooService.getObservableChangePageNewVideo().subscribe(data => {
      if(data.item != undefined){
        this.items = data.item
      }
      if(data.page != undefined){
        this.setPage(data.page, data.check);
      }else{
        this.setPage(this.initialPage, data.check);
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    this.globalFooService.getObservableTeacherNoteChangeFolder().subscribe(data => {
      if(data.item != undefined){
        this.items = data.item
      }
      if(data.page != undefined){
        this.setPage(data.page, true);
      }else{
        this.setPage(this.initialPage, true);
      }
    })

    //get new for book
    this.getNewBook = this.globalFooService.getObservableChangePageNew().subscribe(data => {
      if(data.item != undefined){
        this.items = data.item
      }
      if(data.page != undefined){
        this.setPage(data.page, data.check);
      }else{
        this.setPage(this.initialPage, data.check);
      }
    })

    //get new for audio
    this.getNewAudio = this.globalFooService.getObservableChangePageNewAudio().subscribe(data => {
      if(data.item != undefined){
        this.items = data.item
      }
      if(data.page != undefined){
        this.setPage(data.page, data.check);
      }else{
        this.setPage(this.initialPage, data.check);
      }
    })

    //get new for video
    this.getNewVideo = this.globalFooService.getObservableChangePageNewVideo().subscribe(data => {
      if(data.item != undefined){
        this.items = data.item
      }
      if(data.page != undefined){
        this.setPage(data.page, data.check);
      }else{
        this.setPage(this.initialPage, data.check);
      }
    })

    this.globalFooService.getObservableTeacherNoteBackPage().subscribe(data => {
      if(data.item != undefined){
        this.items = data.item
      }

      if(data.page != undefined){
        this.setPage(data.page, true);
      }else{
        this.setPage(this.initialPage, true);
      }
    })
    this.globalFooService.getObservableTeacherNote().subscribe(data => {
      this.setPage(data.page, true);
    })
    this.globalFooService.getObservableTeacherNoteDelete().subscribe(data => {
      this.setPage(data.page, true);
    })
    this.globalFooService.getObservableTeacherNoteBackPage().subscribe(data => {
      this.setPage(data.page, true);
    })
    this.globalFooService.getObservableFilter().subscribe(data => {
      this.setPage(data.page, true);
    })
    this.globalFooService.getObservableFilterLog().subscribe(data => {
      this.setPage(data.page, true);
    })
  }

  public setPage(page: number, check: boolean) {
    // get new pager object for specified page
    this.pager = paginate(this.items, page, this.pageSize, this.maxPages);
    this.cdr.detectChanges()
    // get new page of items from items array
    // var pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
    var pageOfItems = this.pager.startIndex / this.pageSize + 1
    var temp = false
  
    // call change page function in parent component
    if(check){
      this.changePage.emit(pageOfItems);
    }
  }

  ngOnDestroy() {
    if(this.getNewVideo != undefined){
      this.getNewVideo.unsubscribe()
    }
    if(this.getNewBook != undefined){
      this.getNewBook.unsubscribe()
    }
    if(this.getNewAudio != undefined){
      this.getNewAudio.unsubscribe()
    }
  }
}