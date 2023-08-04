import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SchoolHistoryPage } from './school-history.page';

describe('SchoolHistoryPage', () => {
  let component: SchoolHistoryPage;
  let fixture: ComponentFixture<SchoolHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolHistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
