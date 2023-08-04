import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MediaCartPage } from './media-cart.page';

describe('MediaCartPage', () => {
  let component: MediaCartPage;
  let fixture: ComponentFixture<MediaCartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaCartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MediaCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
