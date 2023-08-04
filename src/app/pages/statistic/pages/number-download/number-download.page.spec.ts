import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NumberDownloadPage } from './number-download.page';

describe('NumberDownloadPage', () => {
  let component: NumberDownloadPage;
  let fixture: ComponentFixture<NumberDownloadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberDownloadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NumberDownloadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
