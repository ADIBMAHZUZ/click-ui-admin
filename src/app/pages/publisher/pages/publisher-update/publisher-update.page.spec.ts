import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PublisherUpdatePage } from './publisher-update.page';

describe('PublisherUpdatePage', () => {
  let component: PublisherUpdatePage;
  let fixture: ComponentFixture<PublisherUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublisherUpdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PublisherUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
