import { TestBed, inject } from '@angular/core/testing';

import { InviteService } from './invite.service';

describe('InviteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InviteService]
    });
  });

  it('should ...', inject([InviteService], (service: InviteService) => {
    expect(service).toBeTruthy();
  }));
});
