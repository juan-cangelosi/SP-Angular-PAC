import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PACRequestFinal } from '../models/PACRequestFinal';
import { MatSort, MatTableDataSource } from '@angular/material';
import { UIRouter } from '@uirouter/core';
import { HumanResourcesViewService } from './human-resources-view.service';
import { LoaderService } from '../shared/components/loader/loader.service';

@Component({
  selector: 'app-human-resources-view',
  templateUrl: './human-resources-view.component.html',
  styleUrls: ['./human-resources-view.component.css']
})
export class HumanResourcesViewComponent implements OnInit {

  // Array used to select which columns will be shown in the material list
  public displayedColumns: string[] = ['Id', 'PACRequestType', 'PACDateFrom', 'PACHourFrom', 'PACDateTo', 'PACHourTo'];

  // Data source of the material list
  public dataSource: MatTableDataSource<PACRequestFinal>;

  public requests: PACRequestFinal[];

  @ViewChild(MatSort) sort: MatSort;

  constructor(public humanResourcesService: HumanResourcesViewService, public uiRouter: UIRouter, private loaderService: LoaderService) {
    this.dataSource =  new MatTableDataSource(this.requests);
  }

  ngOnInit() {
    this.loaderService.show();
    this.dataSource.sort = this.sort;
    this.humanResourcesService.getFinalRequests().then((requests) => {
      this.requests = requests;
      this.dataSource.data = this.requests;
      this.loaderService.hide();
    });
  }

  public viewFinalRequest(request) {
    this.humanResourcesService.SelectedRequest = request;
    this.uiRouter.stateService.go('final-request-view');
  }

}
