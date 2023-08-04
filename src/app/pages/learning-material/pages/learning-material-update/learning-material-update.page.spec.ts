import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LearningMaterialUpdatePage } from './learning-material-update.page';

describe('LearningMaterialUpdatePage', () => {
  let component: LearningMaterialUpdatePage;
  let fixture: ComponentFixture<LearningMaterialUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningMaterialUpdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LearningMaterialUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
