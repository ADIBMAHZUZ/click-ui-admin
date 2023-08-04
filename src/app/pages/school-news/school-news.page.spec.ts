import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SchoolNewsPage } from './school-news.page';

describe('SchoolNewsPage', () => {
  let component: SchoolNewsPage;
  let fixture: ComponentFixture<SchoolNewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolNewsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolNewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
