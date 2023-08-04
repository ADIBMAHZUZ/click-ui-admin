import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SchoolHistoryViewPage } from './school-history-view.page';

describe('SchoolHistoryViewPage', () => {
  let component: SchoolHistoryViewPage;
  let fixture: ComponentFixture<SchoolHistoryViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolHistoryViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolHistoryViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
