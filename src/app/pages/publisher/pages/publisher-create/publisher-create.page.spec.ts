import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PublisherCreatePage } from './publisher-create.page';

describe('PublisherCreatePage', () => {
  let component: PublisherCreatePage;
  let fixture: ComponentFixture<PublisherCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublisherCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PublisherCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
