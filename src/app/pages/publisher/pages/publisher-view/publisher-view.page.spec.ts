import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PublisherViewPage } from './publisher-view.page';

describe('PublisherViewPage', () => {
  let component: PublisherViewPage;
  let fixture: ComponentFixture<PublisherViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublisherViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PublisherViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
