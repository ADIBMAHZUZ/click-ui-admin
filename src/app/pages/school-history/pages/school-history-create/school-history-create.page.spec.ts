import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SchoolHistoryCreatePage } from './school-history-create.page';

describe('SchoolHistoryCreatePage', () => {
  let component: SchoolHistoryCreatePage;
  let fixture: ComponentFixture<SchoolHistoryCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolHistoryCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolHistoryCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
