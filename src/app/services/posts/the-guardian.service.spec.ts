import { TestBed } from '@angular/core/testing';

import { TheGuardianService } from './the-guardian.service';

describe('TheGuardianService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TheGuardianService = TestBed.get(TheGuardianService);
    expect(service).toBeTruthy();
  });
});
