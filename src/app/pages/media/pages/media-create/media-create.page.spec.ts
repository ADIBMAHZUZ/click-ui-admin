import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MediaCreatePage } from './media-create.page';

describe('MediaCreatePage', () => {
  let component: MediaCreatePage;
  let fixture: ComponentFixture<MediaCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MediaCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
