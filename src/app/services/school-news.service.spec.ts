import { TestBed } from '@angular/core/testing';

import { SchoolNewsService } from './school-news.service';

describe('SchoolNewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchoolNewsService = TestBed.get(SchoolNewsService);
    expect(service).toBeTruthy();
  });
});
