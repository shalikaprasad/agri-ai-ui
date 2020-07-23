import { TestBed } from '@angular/core/testing';

import { CropPredictionService } from './crop-prediction.service';

describe('CropPredictionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CropPredictionService = TestBed.get(CropPredictionService);
    expect(service).toBeTruthy();
  });
});
