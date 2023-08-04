import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TopDownloadPage } from './top-download.page';

describe('TopDownloadPage', () => {
  let component: TopDownloadPage;
  let fixture: ComponentFixture<TopDownloadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopDownloadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TopDownloadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
