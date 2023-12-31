import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PublisherPage } from './publisher.page';

describe('PublisherPage', () => {
  let component: PublisherPage;
  let fixture: ComponentFixture<PublisherPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublisherPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PublisherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
