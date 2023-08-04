import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeacherNoteCreatePage } from './teacher-note-create.page';

describe('TeacherNoteCreatePage', () => {
  let component: TeacherNoteCreatePage;
  let fixture: ComponentFixture<TeacherNoteCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherNoteCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherNoteCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
