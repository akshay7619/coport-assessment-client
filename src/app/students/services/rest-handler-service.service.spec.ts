import { TestBed } from '@angular/core/testing';

import { RestHandlerServiceService } from './rest-handler-service.service';

describe('RestHandlerServiceService', () => {
  let service: RestHandlerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestHandlerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
