import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubscriberViewPage } from './subscriber-view.page';

describe('SubscriberViewPage', () => {
  let component: SubscriberViewPage;
  let fixture: ComponentFixture<SubscriberViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriberViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriberViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
