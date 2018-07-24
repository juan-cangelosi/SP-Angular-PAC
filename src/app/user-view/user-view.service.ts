import { Injectable } from '@angular/core';
import { PacRequestListService } from '../sp-services/pac-request-list.service';
import { PacResponseListService } from '../sp-services/pac-response-list.service';
import { PACRequest } from '../models/PACRequest';

@Injectable({
  providedIn: 'root'
})
export class UserViewService {

  constructor(public pacRequestList: PacRequestListService, public pacResponseService: PacResponseListService) { }

  public async test() {
    const requests = await this.pacRequestList.getMyPACRequests();
    const responses = await this.pacResponseService.getPACResponses();
    console.log(requests);
    console.log(responses);

    const testRequest = new PACRequest();
    testRequest.PACDateFrom = new Date();
    testRequest.PACDateTo = new Date();
    testRequest.PACReason = 'Testeando insert';
    testRequest.PACRequestType = 'Vacation';
    testRequest.PACRequestTo.Id = 3;
    await this.pacRequestList.addRequest(testRequest);
  }
}
