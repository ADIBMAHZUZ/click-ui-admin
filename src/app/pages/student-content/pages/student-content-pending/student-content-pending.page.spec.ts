import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentContentPendingPage } from './student-content-pending.page';

describe('StudentContentPendingPage', () => {
  let component: StudentContentPendingPage;
  let fixture: ComponentFixture<StudentContentPendingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentContentPendingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentContentPendingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
