import { Injectable } from '@angular/core';
import { PACRequest } from '../models/PACRequest';
import { PACResponse } from '../models/PACResponse';
import { PacRequestListService } from '../shared/sp-services/pac-request-list.service';
import { PacResponseListService } from '../shared/sp-services/pac-response-list.service';

/**
 * Service used in the manager view to comunicate within screens and with the backend.
 */
@Injectable({
  providedIn: 'root'
})
export class ManagerViewService {

  // request that was selected in the manager view
  private selectedRequest: PACRequest;

  // request responded that shouldnt show in the array until the workflow changes its state
  private requestAlreadyResponded: PACRequest;

  /**
   * @param pacRequestListService used to retrieve the requests made to the manager from the sharepoint list
   * @param pacResponseListService used to save the responses to the request in the sharepoint list
   */
  constructor(
    private pacRequestListService: PacRequestListService,
    private pacResponseListService: PacResponseListService
  ) {

  }

  /**
   * Method that returns a promise of the requests that were made to that user
   */
  public async getRequestsMadeToUser(): Promise<PACRequest[]> {
    const requests: PACRequest[] = await this.pacRequestListService.getRequestsMadeToUser();
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

  /**
   * Getter of the selected request
   * When it returns the selected request it cleans its internal state
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

  /**
   * Sends the response to the request to save in the sharepoint list
   * @param response response to a request to save
   */
  public async sendResponseToRequest(response: PACResponse) {
    this.requestAlreadyResponded = response.PACRequest;
    await this.pacResponseListService.addResponse(response);
  }
}
