import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LearningMaterialViewPage } from './learning-material-view.page';

describe('LearningMaterialViewPage', () => {
  let component: LearningMaterialViewPage;
  let fixture: ComponentFixture<LearningMaterialViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningMaterialViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LearningMaterialViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
