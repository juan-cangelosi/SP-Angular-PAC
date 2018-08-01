import { Injectable } from '@angular/core';
import { UserListService } from '../sp-services/user-list.service';
import { User } from '../models/User';
import { PACRequestFinal } from '../models/PACRequestFinal';
import { PacRequestFinalListService } from '../sp-services/pac-request-final-list.service';

@Injectable({
  providedIn: 'root'
})
export class HumanResourcesService {

  private selectedRequest: PACRequestFinal;


  constructor(private userListService: UserListService, private pacRequestFinalListService: PacRequestFinalListService) {

  }

  public async getUser(id: number): Promise<User> {
    const user = await this.userListService.getUser(id);
    return user;
  }

  public async getFinalRequests(): Promise<PACRequestFinal[]> {
    const request = await this.pacRequestFinalListService.getFinalPACRequests();
    return request;
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
    await this.pacRequestFinalListService.updateFinalPACRequest(request);
  }
}
