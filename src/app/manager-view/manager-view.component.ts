import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { UIRouter } from '@uirouter/core';
import { BehaviorSubject } from 'rxjs';
import { PACRequest } from '../models/PACRequest';
import { ManagerViewService } from './manager-view.service';
import { LoaderService } from '../shared/components/loader/loader.service';
/**
 * Component that represent the manager view of the requests made to him waiting for a response
 * The request will be shown in a list.
 */
@Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html',
  styleUrls: ['./manager-view.component.css']
})
export class ManagerViewComponent implements OnInit {

  // Array used to select which columns will be shown in the material list
  public displayedColumns: string[] = ['Id', 'PACRequestType', 'PACDateFrom', 'PACHourFrom', 'PACDateTo', 'PACHourTo'];

  // Data source of the material list
  public dataSource: MatTableDataSource<PACRequest>;

  // requests made to the manager
  public requests: PACRequest[];


  // Sorter of the material list
  @ViewChild(MatSort) sort: MatSort;

  /**
   * @param uiRouter router used to move between screens
   * @param managerViewService service used to comunicate between screens of the manager view and to retrieve data from the backend
   */
  constructor(private uiRouter: UIRouter, private managerViewService: ManagerViewService, private loaderService: LoaderService) {
    // Initialize the datasource with an empty array
    this.dataSource =  new MatTableDataSource(this.requests);
  }

  ngOnInit() {
    this.loaderService.show();
    this.dataSource.sort = this.sort;
    // Get the request made to the manager and after they are received update the list
    this.managerViewService.getRequestsMadeToUser().then((requests) => {
      this.requests = requests;
      this.dataSource.data = this.requests;
      this.loaderService.hide();
    });
  }

  /**
   * Method called when a row representing a request is clicked, it sets the internal state of the service
   * With the selected request and the navigates to the response view.
   * @param request selected request to respond
   */
  public goToRequestResponse(request: PACRequest) {
    this.managerViewService.SelectedRequest = request;
    this.uiRouter.stateService.go('request-response');
  }

}
