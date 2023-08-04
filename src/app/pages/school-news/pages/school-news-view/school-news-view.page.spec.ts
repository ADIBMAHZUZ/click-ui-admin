import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SchoolNewsViewPage } from './school-news-view.page';

describe('SchoolNewsViewPage', () => {
  let component: SchoolNewsViewPage;
  let fixture: ComponentFixture<SchoolNewsViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolNewsViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolNewsViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
