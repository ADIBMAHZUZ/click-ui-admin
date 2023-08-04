import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListBookPage } from './list-book.page';

describe('ListBookPage', () => {
  let component: ListBookPage;
  let fixture: ComponentFixture<ListBookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBookPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
