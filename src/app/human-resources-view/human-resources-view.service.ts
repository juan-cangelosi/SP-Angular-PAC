import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { PACRequestFinal } from '../models/PACRequestFinal';
import { PacRequestFinalListService } from '../shared/sp-services/pac-request-final-list.service';
import { UserListService } from '../shared/sp-services/user-list.service';

@Injectable({
  providedIn: 'root'
})
export class HumanResourcesViewService {

  private selectedRequest: PACRequestFinal;

  // request responded that shouldnt show in the array until the workflow changes its state
  private requestAlreadyResponded: PACRequestFinal;

  constructor(private userListService: UserListService, private pacRequestFinalListService: PacRequestFinalListService) {

  }

  public async getUser(id: number): Promise<User> {
    const user = await this.userListService.getUser(id);
    return user;
  }

  public async getFinalRequests(): Promise<PACRequestFinal[]> {
    const requests = await this.pacRequestFinalListService.getFinalPACRequests();
    // If there is a request already responded then we have to search it and remove it from the array
    if (this.requestAlreadyResponded) {
      let i = 0;
      let encontre = false;
      while (i <  requests.length && !encontre) {
        if (requests[i].Id === this.requestAlreadyResponded.Id) {
          encontre = true;
        } else {
          i++;
        }
      }
      if (encontre) {
        this.requestAlreadyResponded = null;
        requests.splice(i, 1);
      }
    }

    return requests;
  }

  public get SelectedRequest(): PACRequestFinal {
    const request = this.selectedRequest;
    this.selectedRequest = null;
    return request;
  }

  public set SelectedRequest(request: PACRequestFinal) {
    this.selectedRequest = request;
  }

  public async updateRequest(request: PACRequestFinal) {
    this.requestAlreadyResponded = request;
    await this.pacRequestFinalListService.updateFinalPACRequest(request);
  }
}
