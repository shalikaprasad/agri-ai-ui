import { TestBed } from '@angular/core/testing';

import { FileService } from 'projects/tools/src/lib/file.service';

describe('PathService', () => {
  let service: FileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
