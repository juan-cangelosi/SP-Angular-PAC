import { TestBed, inject } from '@angular/core/testing';

import { RequestViewService } from './request-view.service';

describe('RequestViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestViewService]
    });
  });

  it('should be created', inject([RequestViewService], (service: RequestViewService) => {
    expect(service).toBeTruthy();
  }));
});
