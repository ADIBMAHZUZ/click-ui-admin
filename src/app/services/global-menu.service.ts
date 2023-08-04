import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GlobalMenuService {
  private fooSubject = new Subject<any>();

  publishSomeData(data: any) {
    this.fooSubject.next(data);
  }

  getObservable(): Subject<any> {
    return this.fooSubject;
  }

  getSearchBook(): Subject<any> {
    return this.fooSubject;
  }
  getSearchAudio(): Subject<any> {
    return this.fooSubject;
  }
  getSearchVideo(): Subject<any> {
    return this.fooSubject;
  }

  private fooSubjectBook = new Subject<any>();
  publishSomeDataBook(data: any) {
    this.fooSubjectBook.next(data);
  }
  getObservableBook(): Subject<any> {
    return this.fooSubjectBook;
  }

  private fooSubjectAudio = new Subject<any>();
  publishSomeDataAudio(data: any) {
    this.fooSubjectAudio.next(data);
  }
  getObservableAudio(): Subject<any> {
    return this.fooSubjectAudio;
  }

  private fooSubjectVideo = new Subject<any>();
  publishSomeDataVideo(data: any) {
    this.fooSubjectVideo.next(data);
  }
  getObservableVideo(): Subject<any> {
    return this.fooSubjectVideo;
  }

  private teacherNoteSubject = new Subject<any>();

  publishDataTeacherNote(data: any) {
    this.teacherNoteSubject.next(data);
  }

  getObservableTeacherNote(): Subject<any> {
    return this.teacherNoteSubject;
  }

  private teacherNoteDelete = new Subject<any>();

  publishDataTeacherNoteDelete(data: any) {
    this.teacherNoteDelete.next(data);
  }

  getObservableTeacherNoteDelete(): Subject<any> {
    return this.teacherNoteDelete;
  }

  private teacherNoteBack = new Subject<any>();

  publishDataTeacherNoteBackPage(data: any) {
    this.teacherNoteBack.next(data);
  }

  getObservableTeacherNoteBackPage(): Subject<any> {
    return this.teacherNoteBack;
  }

  private teacherNoteChangePage = new Subject<any>();
  publishDataTeacherNoteChangePage(data: any) {
    this.teacherNoteChangePage.next(data);
  }
  getObservableTeacherNoteChangePage(): Subject<any> {
    return this.teacherNoteChangePage;
  }

  private teacherNoteChangePageNew = new Subject<any>();
  publishDataChangePageNew(data: any) {
    this.teacherNoteChangePageNew.next(data);
  }
  getObservableChangePageNew(): Subject<any> {
    return this.teacherNoteChangePageNew;
  }

  private teacherNoteChangePageNewAudio = new Subject<any>();
  publishDataChangePageNewAudio(data: any) {
    this.teacherNoteChangePageNewAudio.next(data);
  }
  getObservableChangePageNewAudio(): Subject<any> {
    return this.teacherNoteChangePageNewAudio;
  }

  private teacherNoteChangePageNewVideo = new Subject<any>();
  publishDataChangePageNewVideo(data: any) {
    this.teacherNoteChangePageNewVideo.next(data);
  }
  getObservableChangePageNewVideo(): Subject<any> {
    return this.teacherNoteChangePageNewVideo;
  }

  private teacherNoteChangeFolder = new Subject<any>();
  publishDataTeacherNoteChangeFolder(data: any) {
    this.teacherNoteChangeFolder.next(data);
  }
  getObservableTeacherNoteChangeFolder(): Subject<any> {
    return this.teacherNoteChangeFolder;
  }

  private filterSubject = new Subject<any>();

  publishDataFilter(data: any) {
    this.filterSubject.next(data);
  }

  getObservableFilter(): Subject<any> {
    return this.filterSubject;
  }

  private filterSubjectLog = new Subject<any>();
  publishDataFilterLog(data: any) {
    this.filterSubjectLog.next(data);
  }

  getObservableFilterLog(): Subject<any> {
    return this.filterSubjectLog;
  }

  private subjectUploadMedia = new Subject<any>();
  publishDataUploadMedia(data: any) {
    this.subjectUploadMedia.next(data);
  }

  getObservableUploadMedia(): Subject<any> {
    return this.subjectUploadMedia;
  }

  //back get new book
  private subjectBackGetNew = new Subject<any>();
  publishBackGetNew(data: any) {
    this.subjectBackGetNew.next(data);
  }
  getObservableBackGetNew(): Subject<any> {
    return this.subjectBackGetNew;
  }

  //Back get new audio
  private subjectBackGetNewAudio = new Subject<any>();
  publishBackGetNewAudio(data: any) {
    this.subjectBackGetNewAudio.next(data);
  }
  getObservableBackGetNewAudio(): Subject<any> {
    return this.subjectBackGetNewAudio;
  }

  //Back get new video
  private subjectBackGetNewVideo = new Subject<any>();
  publishBackGetNewVideo(data: any) {
    this.subjectBackGetNewVideo.next(data);
  }
  getObservableBackGetNewVideo(): Subject<any> {
    return this.subjectBackGetNewVideo;
  }

  //  Reset search & filter for library
  private subjectResetSearchFilter = new Subject<any>();
  publishResetSearchFilter(data: any) {
    this.subjectResetSearchFilter.next(data);
  }
  getObservableResetSearchFilter(): Subject<any> {
    return this.subjectResetSearchFilter;
  }

  // Reset search & filter of get new media
  private subjectResetSearchFilterGetNew = new Subject<any>();
  publishResetSearchFilterGetNew(data: any) {
    this.subjectResetSearchFilterGetNew.next(data);
  }
  getObservableResetSearchFilterGetNew(): Subject<any> {
    return this.subjectResetSearchFilterGetNew;
  }
}
