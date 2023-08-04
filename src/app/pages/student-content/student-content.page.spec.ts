import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentContentPage } from './student-content.page';

describe('StudentContentPage', () => {
  let component: StudentContentPage;
  let fixture: ComponentFixture<StudentContentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentContentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentContentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
