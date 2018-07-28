import { Injectable } from '@angular/core';
import { PACRequest } from '../models/PACRequest';
import { PacRequestListService } from '../sp-services/pac-request-list.service';
import { PacResponseListService } from '../sp-services/pac-response-list.service';
import { UserListService } from '../sp-services/user-list.service';
import { PACResponse } from '../models/PACResponse';

@Injectable({
  providedIn: 'root'
})
export class AdminViewService {

  private selectedRequest: PACRequest;

  constructor(
    private pacRequestListService: PacRequestListService,
    private pacResponseListService: PacResponseListService,
    private userListService: UserListService
  ) {

  }

  public async getRequestsMadeToUser(): Promise<PACRequest[]> {
    const requests: PACRequest[] = await this.pacRequestListService.getRequestsMadeToUser();
    return requests;
  }

  public get SelectedRequest(): PACRequest {
    const request = this.selectedRequest;
    this.selectedRequest = null;
    return request;
  }

  public set SelectedRequest(request: PACRequest) {
    this.selectedRequest = request;
  }

  public async sendResponseToRequest(response: PACResponse) {
    await this.pacResponseListService.addResponse(response);
  }
}
