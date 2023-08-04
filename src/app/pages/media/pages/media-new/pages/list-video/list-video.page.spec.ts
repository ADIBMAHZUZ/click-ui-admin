import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListVideoPage } from './list-video.page';

describe('ListVideoPage', () => {
  let component: ListVideoPage;
  let fixture: ComponentFixture<ListVideoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVideoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListVideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
