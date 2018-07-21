import { Injectable } from '@angular/core';
import { PacRequestListService } from '../sp-services/pac-request-list.service';
import { PacResponseListService } from '../sp-services/pac-response-list.service';

@Injectable({
  providedIn: 'root'
})
export class UserViewService {

  constructor(public pacRequestList: PacRequestListService, public pacResponseService: PacResponseListService) { }

  public async test() {
    const requests = await this.pacRequestList.getPACRequests();
    const responses = await this.pacResponseService.getPACResponses();
    console.log(requests);
    console.log(responses);
  }
}
