import { TestBed } from '@angular/core/testing';

import { ProdctslogicService } from './prodctslogic.service';

describe('ProdctslogicService', () => {
  let service: ProdctslogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdctslogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
