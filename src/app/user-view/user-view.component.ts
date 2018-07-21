import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { UIRouter } from '@uirouter/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { UserViewService } from './user-view.service';

export interface PACRequest {
  id: string;
  fechaCreacion: Date;
  fechaInicio: Date;
  horaInicio: string;
  fechaFin: Date;
  horaFin: string;
  estado: string;
}

const ELEMENT_DATA: PACRequest[] = [
  {
    id: '1', fechaCreacion: new Date(1995, 5, 5), fechaInicio: new Date(),
    horaInicio: '13:34', fechaFin: new Date(), horaFin: '17:34', estado: 'Pending'
  },
  {
    id: '2', fechaCreacion: new Date(2015, 3, 3), fechaInicio: new Date(),
    horaInicio: '15:34', fechaFin: new Date(), horaFin: '18:34', estado: 'Approved'
  },
  {
    id: '3', fechaCreacion: new Date(2000, 1, 1), fechaInicio: new Date(),
    horaInicio: '15:34', fechaFin: new Date(), horaFin: '18:34', estado: 'Denied'
  }
];

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

  displayedColumns: string[] = ['id', 'fechaCreacion', 'fechaInicio', 'horaInicio', 'fechaFin', 'horaFin', 'estado'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  public resultsLength = ELEMENT_DATA.length;

  @ViewChild(MatSort) sort: MatSort;

  constructor(public uiRouter: UIRouter, public userViewService: UserViewService) {

  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.userViewService.test();
  }

  public goToNewRequest() {
    this.uiRouter.stateService.go('new-request');
  }

}
