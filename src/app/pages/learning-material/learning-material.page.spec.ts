import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LearningMaterialPage } from './learning-material.page';

describe('LearningMaterialPage', () => {
  let component: LearningMaterialPage;
  let fixture: ComponentFixture<LearningMaterialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningMaterialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LearningMaterialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
