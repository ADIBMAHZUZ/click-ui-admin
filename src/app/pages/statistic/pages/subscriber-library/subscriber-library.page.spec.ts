import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubscriberLibraryPage } from './subscriber-library.page';

describe('SubscriberLibraryPage', () => {
  let component: SubscriberLibraryPage;
  let fixture: ComponentFixture<SubscriberLibraryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriberLibraryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriberLibraryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
