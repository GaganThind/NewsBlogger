import { TestBed } from '@angular/core/testing';

import { NewsFactoryService } from './news-factory.service';

describe('NewsFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewsFactoryService = TestBed.get(NewsFactoryService);
    expect(service).toBeTruthy();
  });
});
