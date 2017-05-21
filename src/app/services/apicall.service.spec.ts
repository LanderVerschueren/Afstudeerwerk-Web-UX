import { TestBed, inject } from '@angular/core/testing';

import { ApicallService } from './apicall.service';

describe('ApicallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApicallService]
    });
  });

  it('should ...', inject([ApicallService], (service: ApicallService) => {
    expect(service).toBeTruthy();
  }));
});
