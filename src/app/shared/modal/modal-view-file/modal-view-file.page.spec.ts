import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalViewFilePage } from './modal-view-file.page';

describe('ModalViewFilePage', () => {
  let component: ModalViewFilePage;
  let fixture: ComponentFixture<ModalViewFilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalViewFilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalViewFilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
