import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NumberMediaPage } from './number-media.page';

describe('NumberMediaPage', () => {
  let component: NumberMediaPage;
  let fixture: ComponentFixture<NumberMediaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberMediaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NumberMediaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
