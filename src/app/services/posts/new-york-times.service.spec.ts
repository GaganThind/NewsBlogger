import { TestBed } from '@angular/core/testing';

import { NewYorkTimesService } from './new-york-times.service';

describe('NewYorkTimesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewYorkTimesService = TestBed.get(NewYorkTimesService);
    expect(service).toBeTruthy();
  });
});
