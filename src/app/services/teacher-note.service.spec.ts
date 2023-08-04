import { TestBed } from '@angular/core/testing';

import { TeacherNoteService } from './teacher-note.service';

describe('TeacherNoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeacherNoteService = TestBed.get(TeacherNoteService);
    expect(service).toBeTruthy();
  });
});
