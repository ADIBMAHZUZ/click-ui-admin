import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MediaUpdatePage } from './media-update.page';

describe('MediaUpdatePage', () => {
  let component: MediaUpdatePage;
  let fixture: ComponentFixture<MediaUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaUpdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MediaUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
