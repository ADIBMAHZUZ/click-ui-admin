import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubscriberUpdatePage } from './subscriber-update.page';

describe('SubscriberUpdatePage', () => {
  let component: SubscriberUpdatePage;
  let fixture: ComponentFixture<SubscriberUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriberUpdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriberUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
