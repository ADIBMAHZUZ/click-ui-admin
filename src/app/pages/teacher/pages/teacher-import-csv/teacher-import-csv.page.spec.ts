import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeacherImportCsvPage } from './teacher-import-csv.page';

describe('TeacherImportCsvPage', () => {
  let component: TeacherImportCsvPage;
  let fixture: ComponentFixture<TeacherImportCsvPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherImportCsvPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherImportCsvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
