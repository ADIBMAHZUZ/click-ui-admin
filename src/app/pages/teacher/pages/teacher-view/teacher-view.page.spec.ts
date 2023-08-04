import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeacherViewPage } from './teacher-view.page';

describe('TeacherViewPage', () => {
  let component: TeacherViewPage;
  let fixture: ComponentFixture<TeacherViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
