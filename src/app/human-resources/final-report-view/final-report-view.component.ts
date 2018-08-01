import { Component, OnInit } from '@angular/core';
import { PACRequestFinal } from '../../models/PACRequestFinal';
import { HumanResourcesService } from '../human-resources.service';
import { User } from 'src/app/models/User';
import { UIRouter } from '@uirouter/core';

@Component({
  selector: 'app-final-report-view',
  templateUrl: './final-report-view.component.html',
  styleUrls: ['./final-report-view.component.css']
})
export class FinalReportViewComponent implements OnInit {

  public request: PACRequestFinal;

  public author: User;

  constructor(public humanResourcesService: HumanResourcesService, public uiRouter: UIRouter) {
    this.author = new User();
    this.request = this.humanResourcesService.SelectedRequest;
  }

  ngOnInit() {
    this.humanResourcesService.getUser(this.request.AuthorId).then((user) => {
      this.author = user;
    });
    console.log(this.request);
  }

  public approve() {
    this.request.PACRequestStatus = 'Approved by Human Resources';
    this.humanResourcesService.updateRequest(this.request);
    this.uiRouter.stateService.go('human-resources');
  }

  public deny() {
    this.request.PACRequestStatus = 'Denied';
    this.humanResourcesService.updateRequest(this.request);
    this.uiRouter.stateService.go('human-resources');
  }

}
