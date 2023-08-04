import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MediaNewPage } from './media-new.page';

describe('MediaNewPage', () => {
  let component: MediaNewPage;
  let fixture: ComponentFixture<MediaNewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaNewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MediaNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
