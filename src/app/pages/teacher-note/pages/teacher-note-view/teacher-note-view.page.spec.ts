import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeacherNoteViewPage } from './teacher-note-view.page';

describe('TeacherNoteViewPage', () => {
  let component: TeacherNoteViewPage;
  let fixture: ComponentFixture<TeacherNoteViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherNoteViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherNoteViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
