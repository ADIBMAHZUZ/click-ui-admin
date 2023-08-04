import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuyStoragePage } from './buy-storage.page';

describe('BuyStoragePage', () => {
  let component: BuyStoragePage;
  let fixture: ComponentFixture<BuyStoragePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyStoragePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuyStoragePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
