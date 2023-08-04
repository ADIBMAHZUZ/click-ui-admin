import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LibraryUpdatePage } from './library-update.page';

describe('LibraryUpdatePage', () => {
  let component: LibraryUpdatePage;
  let fixture: ComponentFixture<LibraryUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryUpdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LibraryUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
