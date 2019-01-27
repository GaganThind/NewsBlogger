import { TestBed } from '@angular/core/testing';

import { FetchPostsService } from './fetch-posts.service';

describe('FetchPostsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchPostsService = TestBed.get(FetchPostsService);
    expect(service).toBeTruthy();
  });
});
