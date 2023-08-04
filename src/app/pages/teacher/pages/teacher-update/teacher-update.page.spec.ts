import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeacherUpdatePage } from './teacher-update.page';

describe('TeacherUpdatePage', () => {
  let component: TeacherUpdatePage;
  let fixture: ComponentFixture<TeacherUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherUpdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
