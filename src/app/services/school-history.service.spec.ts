import { TestBed } from '@angular/core/testing';

import { SchoolHistoryService } from './school-history.service';

describe('SchoolHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchoolHistoryService = TestBed.get(SchoolHistoryService);
    expect(service).toBeTruthy();
  });
});
