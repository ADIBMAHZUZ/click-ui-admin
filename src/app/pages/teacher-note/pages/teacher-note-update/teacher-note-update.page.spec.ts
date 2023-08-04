import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeacherNoteUpdatePage } from './teacher-note-update.page';

describe('TeacherNoteUpdatePage', () => {
  let component: TeacherNoteUpdatePage;
  let fixture: ComponentFixture<TeacherNoteUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherNoteUpdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherNoteUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
