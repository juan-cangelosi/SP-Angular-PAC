import { Injectable } from '@angular/core';
import { PACRequest } from '../models/PACRequest';
import { PacRequestListService } from '../sp-services/pac-request-list.service';
import { PacResponseListService } from '../sp-services/pac-response-list.service';
import { PACResponse } from '../models/PACResponse';

/**
 * Service used in the manager view to comunicate within screens and with the backend.
 */
@Injectable({
  providedIn: 'root'
})
export class AdminViewService {

  // request that was selected in the manager view
  private selectedRequest: PACRequest;

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
    await this.pacResponseListService.addResponse(response);
  }
}
