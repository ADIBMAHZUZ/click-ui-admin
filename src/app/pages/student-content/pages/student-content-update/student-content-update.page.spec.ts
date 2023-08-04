import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentContentUpdatePage } from './student-content-update.page';

describe('StudentContentUpdatePage', () => {
  let component: StudentContentUpdatePage;
  let fixture: ComponentFixture<StudentContentUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentContentUpdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentContentUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
