import { Component, OnInit } from '@angular/core';
import { PACRequest } from '../../models/PACRequest';
import { AdminViewService } from '../admin-view.service';
import { PACResponse } from '../../models/PACResponse';
import { UIRouter } from '@uirouter/core';

@Component({
  selector: 'app-request-response',
  templateUrl: './request-response.component.html',
  styleUrls: ['./request-response.component.css']
})
export class RequestResponseComponent implements OnInit {

  public requestToRespond: PACRequest;
  public response: PACResponse;

  constructor(public uiRouter: UIRouter, public adminViewService: AdminViewService) {
    this.requestToRespond = this.adminViewService.SelectedRequest;
    this.response = new PACResponse();
    this.response.PACRequest = this.requestToRespond;
  }

  ngOnInit() {
  }

  public approve() {
    this.response.PACResponse = 'Approved';
    this.sendRequest();
  }

  public deny() {
    this.response.PACResponse = 'Denied';
    this.sendRequest();
  }

  private sendRequest() {
    this.adminViewService.sendResponseToRequest(this.response);
    this.uiRouter.stateService.go('admin-view');
  }
}
