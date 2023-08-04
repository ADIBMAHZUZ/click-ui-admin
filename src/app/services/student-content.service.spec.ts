import { TestBed } from '@angular/core/testing';

import { StudentContentService } from './student-content.service';

describe('StudentContentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentContentService = TestBed.get(StudentContentService);
    expect(service).toBeTruthy();
  });
});
