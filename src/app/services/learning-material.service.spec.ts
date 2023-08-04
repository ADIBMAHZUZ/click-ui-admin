import { TestBed } from '@angular/core/testing';

import { LearningMaterialService } from './learning-material.service';

describe('LearningMaterialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LearningMaterialService = TestBed.get(LearningMaterialService);
    expect(service).toBeTruthy();
  });
});
