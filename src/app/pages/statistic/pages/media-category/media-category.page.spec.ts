import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MediaCategoryPage } from './media-category.page';

describe('MediaCategoryPage', () => {
  let component: MediaCategoryPage;
  let fixture: ComponentFixture<MediaCategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaCategoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MediaCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
