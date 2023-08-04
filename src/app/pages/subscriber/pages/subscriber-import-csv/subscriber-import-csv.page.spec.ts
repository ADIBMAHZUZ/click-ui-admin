import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubscriberImportCsvPage } from './subscriber-import-csv.page';

describe('SubscriberImportCsvPage', () => {
  let component: SubscriberImportCsvPage;
  let fixture: ComponentFixture<SubscriberImportCsvPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriberImportCsvPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriberImportCsvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
