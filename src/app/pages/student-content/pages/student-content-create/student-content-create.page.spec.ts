import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentContentCreatePage } from './student-content-create.page';

describe('StudentContentCreatePage', () => {
  let component: StudentContentCreatePage;
  let fixture: ComponentFixture<StudentContentCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentContentCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentContentCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
