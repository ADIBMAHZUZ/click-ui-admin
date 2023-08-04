import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LearningMaterialCreatePage } from './learning-material-create.page';

describe('LearningMaterialCreatePage', () => {
  let component: LearningMaterialCreatePage;
  let fixture: ComponentFixture<LearningMaterialCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningMaterialCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LearningMaterialCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
