import { TestBed, inject } from '@angular/core/testing';

import { AdminViewService } from './admin-view.service';

describe('AdminViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminViewService]
    });
  });

  it('should be created', inject([AdminViewService], (service: AdminViewService) => {
    expect(service).toBeTruthy();
  }));
});
