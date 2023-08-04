import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeacherNotePage } from './teacher-note.page';

describe('TeacherNotePage', () => {
  let component: TeacherNotePage;
  let fixture: ComponentFixture<TeacherNotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherNotePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherNotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
