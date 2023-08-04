import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RenameNotePage } from './rename-note.page';

describe('RenameNotePage', () => {
  let component: RenameNotePage;
  let fixture: ComponentFixture<RenameNotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenameNotePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RenameNotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
