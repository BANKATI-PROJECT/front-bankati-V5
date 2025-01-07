import { TestBed } from '@angular/core/testing';

import { RechargeServiceService } from './recharge-service.service';

describe('RechargeServiceService', () => {
  let service: RechargeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RechargeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
