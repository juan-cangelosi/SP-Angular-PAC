import { Component, OnInit } from '@angular/core';
import { PACRequest } from '../../models/PACRequest';
import { PACResponse } from '../../models/PACResponse';
import { UIRouter } from '@uirouter/core';
import { ManagerViewService } from '../manager-view.service';
import { LoaderService } from '../../shared/components/loader/loader.service';
/**
 * Component that represent the manager response to request view.
 * This component will show the request and will have a reponse field and buttons of the decition to make.
 */
@Component({
  selector: 'app-request-response',
  templateUrl: './request-response.component.html',
  styleUrls: ['./request-response.component.css']
})
export class RequestResponseComponent implements OnInit {

  public requestToRespond: PACRequest;
  // Response of the request
  public response: PACResponse;

  /**
   * @param uiRouter router to move between the components
   * @param managerViewService service that comunicates the manager view with the backend and other views
   */
  constructor(private uiRouter: UIRouter, private managerViewService: ManagerViewService, private loaderService: LoaderService) {
    // We assign the selected request to the model and create a new response model
    this.requestToRespond = this.managerViewService.SelectedRequest;
    this.response = new PACResponse();
    this.response.PACRequest = this.requestToRespond;
  }

  ngOnInit() {
  }

  public async approve() {
    this.response.PACResponse = 'Approved';
    await this.sendRequest();
  }

  public async deny() {
    this.response.PACResponse = 'Denied';
    await this.sendRequest();
  }

  public async sendBack() {
    this.response.PACResponse = 'Send Back';
    await this.sendRequest();
  }

  /**
   * Sends the request to the backend and if successful, it changes the state to admin view.
   */
  private async sendRequest() {
    this.loaderService.show();
    await this.managerViewService.sendResponseToRequest(this.response);
    this.loaderService.hide();
    this.uiRouter.stateService.go('manager-view');
  }
}
