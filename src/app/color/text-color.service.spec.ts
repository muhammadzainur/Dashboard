import { TestBed } from '@angular/core/testing';

import { TextColorService } from './text-color.service';

describe('TextColorService', () => {
  let service: TextColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
