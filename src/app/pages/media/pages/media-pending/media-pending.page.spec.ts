import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MediaPendingPage } from './media-pending.page';

describe('MediaPendingPage', () => {
  let component: MediaPendingPage;
  let fixture: ComponentFixture<MediaPendingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaPendingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MediaPendingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
