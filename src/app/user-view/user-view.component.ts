import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { UIRouter } from '@uirouter/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { UserViewService } from './user-view.service';
import { PACRequest } from '../models/PACRequest';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from '../shared/components/loader/loader.service';


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

  // Columns to display in the angular material table
  public displayedColumns: string[] = ['id', /* 'fechaCreacion',*/ 'fechaInicio', 'horaInicio', 'fechaFin', 'horaFin', 'estado'];
  // Datasourcec of the angular material table
  public dataSource: BehaviorSubject<PACRequest[]>;

  // variable used to know which row was clicked to show with more detail that element
  public expandedElement: PACRequest;

  // variable of the requests retrieved by the service
  public requests: PACRequest[];

  // Angular material table sorter
  @ViewChild(MatSort) sort: MatSort;

  /**
   *
   * @param uiRouter used to navigate between views
   * @param userViewService used to retrieve the requests and to set the selected request to modify in its internal state
   * @param loaderService service to show the loader when we load all the requests
   */
  constructor(private uiRouter: UIRouter, private userViewService: UserViewService, private loaderService: LoaderService) {
    this.requests = new Array<PACRequest>();
    this.dataSource =  new BehaviorSubject(this.requests);
  }

  ngOnInit() {
    this.loaderService.show();
    // Retrieve the userviewService requests and assign them to the variables
    this.userViewService.getRequests().then((requests) => {
      this.requests = requests;
      this.dataSource.next(this.requests);
      // this.loaderService.hide();
    });
  }

  /**
   * Called when the add button is clicked, navigate to the request creation screen.
   */
  public goToNewRequest() {
    this.uiRouter.stateService.go('new-request');
  }

  /**
   * Method called when a row is clicked
   * When a row is clicked and the expanded element is different than the row then it sets the expanded element variable with the element
   * When a row is clicked and the expanded element is the same than the row then it sets the expanded element to null
   * When a row has the Request Status Needs Corrections it redirects the user to the correction screen, setting the selected
   * element in the internal state-
   * @param element request of the row clicked.
   */
  public clickedRow(element: PACRequest) {
    this.expandedElement !== element ? this.expandedElement = element : this.expandedElement = null;
    if (element.PACRequestStatus === 'Needs Corrections') {
      this.userViewService.SelectedRequest = element;
      this.uiRouter.stateService.go('new-request');
    }
  }

}
