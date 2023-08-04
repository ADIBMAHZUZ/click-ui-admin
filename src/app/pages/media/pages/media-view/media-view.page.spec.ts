import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MediaViewPage } from './media-view.page';

describe('MediaViewPage', () => {
  let component: MediaViewPage;
  let fixture: ComponentFixture<MediaViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MediaViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
