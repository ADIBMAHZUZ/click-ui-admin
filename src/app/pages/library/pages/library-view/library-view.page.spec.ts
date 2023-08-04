import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LibraryViewPage } from './library-view.page';

describe('LibraryViewPage', () => {
  let component: LibraryViewPage;
  let fixture: ComponentFixture<LibraryViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LibraryViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
