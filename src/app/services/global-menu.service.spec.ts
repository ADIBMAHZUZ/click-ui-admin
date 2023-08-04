import { TestBed } from '@angular/core/testing';

import { GlobalMenuService } from './global-menu.service';

describe('GlobalMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalMenuService = TestBed.get(GlobalMenuService);
    expect(service).toBeTruthy();
  });
});
