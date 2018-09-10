import { Component, OnInit } from '@angular/core';
import { UIRouter } from '@uirouter/core';
import { UserListService } from '../../sp-services/user-list.service';
import { SpService } from '../../sp-services/sp-service.service';

/**
 * Component that represents the header of the app, it will contain the toolbar and the to navigate between the views.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public currentSite = 'PAC';

  // Boolean variables to decide to show or not the buttons of manager view and HR view.
  public isManager: boolean;
  public isRRHH: boolean;

  public selectedView: string;

  /**
   * @param router used to navigate between screens
   * @param userListService used to check if the current user has certain privileges
   */
  constructor(private router: UIRouter, private userListService: UserListService, private spService: SpService) {
    this.isManager = false;
    this.isRRHH = false;
    this.selectedView = 'user-view';
  }

  ngOnInit() {
    if (this.spService.configurations) {
      this.currentSite = this.spService.configurations.name;
    } else {
      this.currentSite = 'PAC';
    }

    // Consult the userlistService if the user is a manager
    this.userListService.getCurrentUser().then((user) => {
      this.userListService.isUserManager(user.Id).then((manager) => {
        this.isManager = manager;
      });
      // Consult the userlistService if the user is a HR
      this.userListService.isUserHR(user.Id).then((hr) => {
        this.isRRHH = hr;
      });
    });
  }

  /**
   * Method that navigate to the user view screen
   */
  public viewUserRequests() {
    this.selectedView = 'user-view';
    this.router.stateService.go('user-view');
  }

  /**
   * Method that navigate to the manager view screen
   */
  public viewAdminRequests() {
    this.selectedView = 'manager-view';
    this.router.stateService.go('manager-view');
  }

  /**
  * Method that navigate to the hr view screen
  */
  public viewHRRequests() {
    this.selectedView = 'human-resources';
    this.router.stateService.go('human-resources');
  }

  // public viewCalendar() {
  //  this.router.stateService.go('calendar');
  // }

}
