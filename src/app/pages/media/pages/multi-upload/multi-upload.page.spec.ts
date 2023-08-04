import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MultiUploadPage } from './multi-upload.page';

describe('MultiUploadPage', () => {
  let component: MultiUploadPage;
  let fixture: ComponentFixture<MultiUploadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiUploadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MultiUploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
