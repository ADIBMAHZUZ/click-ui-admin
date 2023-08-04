import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListAudioPage } from './list-audio.page';

describe('ListAudioPage', () => {
  let component: ListAudioPage;
  let fixture: ComponentFixture<ListAudioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAudioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListAudioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
