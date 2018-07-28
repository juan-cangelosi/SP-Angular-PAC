import { Injectable } from '@angular/core';
import { PacRequestListService } from '../sp-services/pac-request-list.service';
import { PACRequest } from '../models/PACRequest';
import { User } from '../models/User';
import { UserListService } from '../sp-services/user-list.service';
import { Attachment } from '../models/Attachment';

@Injectable({
  providedIn: 'root'
})
export class UserViewService {

  private selectedRequest: PACRequest;

  constructor(private pacRequestList: PacRequestListService, private userListService: UserListService) { }

  public async getRequests(): Promise<PACRequest[]> {
    const requests = await this.pacRequestList.getMyPACRequests();
    return requests;
  }

  public async getTypeOfRequests(): Promise<string[]> {
    const typeOfRequests = await this.pacRequestList.getTypeOfRequests();
    return typeOfRequests;
  }

  public async getManagers(): Promise<User[]> {
    const users: User[] = await this.userListService.getManagers();
    return users;
  }

  public async addRequest(request: PACRequest) {
    await this.pacRequestList.addRequest(request);
  }

  public async updateRequest(request: PACRequest) {
    await this.pacRequestList.editRequest(request);
  }

  public async removeAttachment(requestId: number, attachment: Attachment) {
    await this.pacRequestList.removeAttachment(requestId, attachment);
  }

  public get SelectedRequest(): PACRequest {
    const request = this.selectedRequest;
    this.selectedRequest = null;
    return request;
  }

  public set SelectedRequest(request: PACRequest) {
    this.selectedRequest = request;
  }
}
