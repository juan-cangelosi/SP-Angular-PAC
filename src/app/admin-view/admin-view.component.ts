import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { UIRouter } from '@uirouter/core';
import { AdminViewService } from './admin-view.service';
import { BehaviorSubject } from 'rxjs';
import { PACRequest } from '../models/PACRequest';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  public displayedColumns: string[] = ['id', /* 'fechaCreacion',*/ 'fechaInicio', 'horaInicio', 'fechaFin', 'horaFin', /* 'estado' */];
  public dataSource: BehaviorSubject<PACRequest[]>;

  public expandedElement;

  public requests: PACRequest[];


  public resultsLength;

  @ViewChild(MatSort) sort: MatSort;

  constructor(public uiRouter: UIRouter, public adminViewService: AdminViewService) {
    this.dataSource =  new BehaviorSubject(this.requests);
  }

  ngOnInit() {
    this.adminViewService.getRequestsMadeToUser().then((requests) => {
      this.requests = requests;
      this.dataSource.next(this.requests);
      this.resultsLength = this.requests.length;
    });
  }

  public goToRequestResponse(request: PACRequest) {
    this.adminViewService.SelectedRequest = request;
    this.uiRouter.stateService.go('request-response');
  }

}
