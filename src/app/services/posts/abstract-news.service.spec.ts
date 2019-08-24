import { TestBed } from '@angular/core/testing';

import AbstractNewsService from './abstract-news.service';

describe('AbstractNewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AbstractNewsService = TestBed.get(AbstractNewsService);
    expect(service).toBeTruthy();
  });
});
