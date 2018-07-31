import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PACRequestFinal } from '../models/PACRequestFinal';
import { MatSort } from '@angular/material';
import { HumanResourcesService } from './human-resources.service';
import { UIRouter } from '../../../node_modules/@uirouter/core';

@Component({
  selector: 'app-human-resources',
  templateUrl: './human-resources.component.html',
  styleUrls: ['./human-resources.component.css']
})
export class HumanResourcesComponent implements OnInit {

  public displayedColumns: string[] = ['id', /* 'fechaCreacion',*/ 'fechaInicio', 'horaInicio', 'fechaFin', 'horaFin', /* 'estado' */];
  public dataSource: BehaviorSubject<PACRequestFinal[]>;

  public requests: PACRequestFinal[];

  public resultsLength;

  @ViewChild(MatSort) sort: MatSort;

  constructor(public humanResourcesService: HumanResourcesService, public uiRouter: UIRouter) {
    this.dataSource =  new BehaviorSubject(this.requests);
  }

  ngOnInit() {
    this.humanResourcesService.getFinalRequests().then((requests) => {
      this.requests = requests;
      this.dataSource.next(this.requests);
      this.resultsLength = this.requests.length;
    });
  }

  public viewFinalRequest(request) {
    this.humanResourcesService.SelectedRequest = request;
    this.uiRouter.stateService.go('final-request-view');
  }

}
