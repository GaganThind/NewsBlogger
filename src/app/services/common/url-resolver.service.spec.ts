import { TestBed } from '@angular/core/testing';

import { UrlResolverService } from './url-resolver.service';

describe('UrlResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UrlResolverService = TestBed.get(UrlResolverService);
    expect(service).toBeTruthy();
  });
});
