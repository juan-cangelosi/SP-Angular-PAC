import { TestBed, inject } from '@angular/core/testing';

import { HumanResourcesService } from './human-resources.service';

describe('HumanResourcesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HumanResourcesService]
    });
  });

  it('should be created', inject([HumanResourcesService], (service: HumanResourcesService) => {
    expect(service).toBeTruthy();
  }));
});
