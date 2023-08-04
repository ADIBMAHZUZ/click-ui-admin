import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LibraryCreatePage } from './library-create.page';

describe('LibraryCreatePage', () => {
  let component: LibraryCreatePage;
  let fixture: ComponentFixture<LibraryCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LibraryCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
