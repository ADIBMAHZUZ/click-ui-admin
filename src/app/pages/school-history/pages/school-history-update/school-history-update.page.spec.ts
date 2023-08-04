import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SchoolHistoryUpdatePage } from './school-history-update.page';

describe('SchoolHistoryUpdatePage', () => {
  let component: SchoolHistoryUpdatePage;
  let fixture: ComponentFixture<SchoolHistoryUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolHistoryUpdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolHistoryUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
