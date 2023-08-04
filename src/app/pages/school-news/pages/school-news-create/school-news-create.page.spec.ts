import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SchoolNewsCreatePage } from './school-news-create.page';

describe('SchoolNewsCreatePage', () => {
  let component: SchoolNewsCreatePage;
  let fixture: ComponentFixture<SchoolNewsCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolNewsCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolNewsCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
