import { Injectable } from '@angular/core';
import { PACRequest } from '../models/PACRequest';
import { User } from '../models/User';
import { Attachment } from '../models/Attachment';
import { UserListService } from '../shared/sp-services/user-list.service';
import { PacRequestListService } from '../shared/sp-services/pac-request-list.service';
import { query } from '../../../node_modules/@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class UserViewService {

  // Request selected by the user, variable used when a user selects a report to correct
  private selectedRequest: PACRequest;

  /**
   * @param pacRequestList service that connects with the request lists to save items there and retrieve them
   * @param userListService service used to retrieve users.
   */
  constructor(private pacRequestList: PacRequestListService, private userListService: UserListService) { }

  /**
   * Returns the Requests made by the current user
   */
  public async getRequests(): Promise<PACRequest[]> {
    // TODO ORDER BY DATE (NEW TO OLD)
    const requests = await this.pacRequestList.getMyPACRequests();
    // I want the array in reverse order so I see the last inserted first
    const requestsOrdered = requests.reverse();
    return requestsOrdered;
  }

  /**
   * Returns an array with the types of requests that a user can make
   */
  public async getTypeOfRequests(): Promise<string[]> {
    const typeOfRequests = await this.pacRequestList.getTypeOfRequests();
    return typeOfRequests;
  }

  /**
   * Returns a list of the managers.
   */
  public async getManagers(): Promise<User[]> {
    const users: User[] = await this.userListService.getManagers();
    return users;
  }

  /**
   * Adds a request to the list
   * @param request request to add
   */
  public async addRequest(request: PACRequest) {
    await this.pacRequestList.addRequest(request);
  }

  /**
   * Updates the request in the list
   * @param request request to update
   */
  public async updateRequest(request: PACRequest) {
    await this.pacRequestList.editRequest(request);
  }

  /**
   * Removes an attachment from a request
   * @param requestId request that has the attachment to remove
   * @param attachment attachment to remove
   */
  public async removeAttachment(requestId: number, attachment: Attachment) {
    await this.pacRequestList.removeAttachment(requestId, attachment);
  }

  /**
   * Getter of the selected request to modify
   * Once the selected request is retrieved, it is erased from the internal state.
   */
  public get SelectedRequest(): PACRequest {
    const request = this.selectedRequest;
    this.selectedRequest = null;
    return request;
  }

  /**
   * Setter of the selected request
   */
  public set SelectedRequest(request: PACRequest) {
    this.selectedRequest = request;
  }
}
