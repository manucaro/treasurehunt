import { TestBed } from '@angular/core/testing';

import { CalculateScoreService } from './calculate-score.service';

describe('CalculateScoreService', () => {
  let service: CalculateScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
