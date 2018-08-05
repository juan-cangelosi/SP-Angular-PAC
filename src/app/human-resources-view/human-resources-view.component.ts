import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PACRequestFinal } from '../models/PACRequestFinal';
import { MatSort } from '@angular/material';
import { UIRouter } from '@uirouter/core';
import { HumanResourcesViewService } from './human-resources-view.service';
import { LoaderService } from '../shared/components/loader/loader.service';

@Component({
  selector: 'app-human-resources-view',
  templateUrl: './human-resources-view.component.html',
  styleUrls: ['./human-resources-view.component.css']
})
export class HumanResourcesViewComponent implements OnInit {

  public displayedColumns: string[] = ['id', /* 'fechaCreacion',*/ 'type', 'fechaInicio', 'horaInicio', 'fechaFin', 'horaFin'];
  public dataSource: BehaviorSubject<PACRequestFinal[]>;

  public requests: PACRequestFinal[];

  public resultsLength;

  @ViewChild(MatSort) sort: MatSort;

  constructor(public humanResourcesService: HumanResourcesViewService, public uiRouter: UIRouter, private loaderService: LoaderService) {
    this.dataSource =  new BehaviorSubject(this.requests);
  }

  ngOnInit() {
    this.loaderService.show();
    this.humanResourcesService.getFinalRequests().then((requests) => {
      this.requests = requests;
      this.dataSource.next(this.requests);
      this.resultsLength = this.requests.length;
      this.loaderService.hide();
    });
  }

  public viewFinalRequest(request) {
    this.humanResourcesService.SelectedRequest = request;
    this.uiRouter.stateService.go('final-request-view');
  }

}
