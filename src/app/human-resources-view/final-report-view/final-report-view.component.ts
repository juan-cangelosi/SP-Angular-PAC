import { Component, OnInit } from '@angular/core';
import { PACRequestFinal } from '../../models/PACRequestFinal';
import { User } from '../../models/User';
import { UIRouter } from '@uirouter/core';
import { HumanResourcesViewService } from '../human-resources-view.service';
import { LoaderService } from '../../shared/components/loader/loader.service';

@Component({
  selector: 'app-final-report-view',
  templateUrl: './final-report-view.component.html',
  styleUrls: ['./final-report-view.component.css']
})
export class FinalReportViewComponent implements OnInit {

  public request: PACRequestFinal;

  public author: User;

  constructor(public humanResourcesService: HumanResourcesViewService, public uiRouter: UIRouter, private loaderService: LoaderService) {
    this.author = new User();
    this.request = this.humanResourcesService.SelectedRequest;
  }

  ngOnInit() {
    this.loaderService.show();
    this.humanResourcesService.getUser(this.request.AuthorId).then((user) => {
      this.author = user;
      this.loaderService.hide();
    });
  }

  public async approve() {
    this.loaderService.show();
    this.request.PACRequestStatus = 'Approved by Human Resources';
    await this.humanResourcesService.updateRequest(this.request);
    this.loaderService.hide();
    this.uiRouter.stateService.go('human-resources');
  }

  public async deny() {
    this.loaderService.show();
    this.request.PACRequestStatus = 'Denied';
    await this.humanResourcesService.updateRequest(this.request);
    this.loaderService.hide();
    this.uiRouter.stateService.go('human-resources');
  }

}
