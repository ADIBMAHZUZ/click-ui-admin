import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubscriberCreatePage } from './subscriber-create.page';

describe('SubscriberCreatePage', () => {
  let component: SubscriberCreatePage;
  let fixture: ComponentFixture<SubscriberCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriberCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriberCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
