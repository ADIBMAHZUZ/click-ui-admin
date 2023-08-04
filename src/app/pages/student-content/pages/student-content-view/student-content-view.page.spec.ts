import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentContentViewPage } from './student-content-view.page';

describe('StudentContentViewPage', () => {
  let component: StudentContentViewPage;
  let fixture: ComponentFixture<StudentContentViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentContentViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentContentViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
