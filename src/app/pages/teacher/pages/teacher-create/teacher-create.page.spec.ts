import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeacherCreatePage } from './teacher-create.page';

describe('TeacherCreatePage', () => {
  let component: TeacherCreatePage;
  let fixture: ComponentFixture<TeacherCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
