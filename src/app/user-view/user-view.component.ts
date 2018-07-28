import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { UIRouter } from '@uirouter/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { UserViewService } from './user-view.service';
import { PACRequest } from '../models/PACRequest';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class UserViewComponent implements OnInit {

  public displayedColumns: string[] = ['id', /* 'fechaCreacion',*/ 'fechaInicio', 'horaInicio', 'fechaFin', 'horaFin', 'estado'];
  public dataSource: BehaviorSubject<PACRequest[]>;

  public expandedElement;

  public requests: PACRequest[];

  @ViewChild(MatSort) sort: MatSort;

  constructor(public uiRouter: UIRouter, public userViewService: UserViewService) {
    this.requests = new Array<PACRequest>();
    this.dataSource =  new BehaviorSubject(this.requests);
  }

  ngOnInit() {
    this.userViewService.getRequests().then((requests) => {
      this.requests = requests;
      console.log(this.requests);
      this.dataSource.next(this.requests);
    });
  }

  public goToNewRequest() {
    this.uiRouter.stateService.go('new-request');
  }

  public clickedRow(element: PACRequest) {
    this.expandedElement !== element ? this.expandedElement = element : this.expandedElement = null;
    if (element.PACRequestStatus === 'Needs Corrections') {
      this.userViewService.SelectedRequest = element;
      this.uiRouter.stateService.go('new-request');
    }
  }

}
