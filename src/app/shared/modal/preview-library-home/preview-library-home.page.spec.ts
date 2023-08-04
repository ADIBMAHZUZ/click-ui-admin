import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreviewLibraryHomePage } from './preview-library-home.page';

describe('PreviewLibraryHomePage', () => {
  let component: PreviewLibraryHomePage;
  let fixture: ComponentFixture<PreviewLibraryHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewLibraryHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreviewLibraryHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
