import { Component, OnInit } from '@angular/core';
import { UIRouter } from '@uirouter/core';
import { UserListService } from '../sp-services/user-list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public currentSite = 'Home';

  public isManager: boolean;
  public isRRHH: boolean;

  constructor(public router: UIRouter, public userListService: UserListService) {
    this.isManager = false;
    this.isRRHH = false;
  }

  ngOnInit() {
    this.isManager = true;
    this.userListService.getCurrentUser().then((user) => {
      this.userListService.isUserManager((manager) => {
        this.isManager = manager;
      });
      this.userListService.isUserHR((hr) => {
        this.isRRHH = hr;
      });
    });
  }

  public viewUserRequests() {
    this.router.stateService.go('user-view');
  }

  public viewAdminRequests() {
    this.router.stateService.go('admin-view');
  }

  // public viewCalendar() {
  //  this.router.stateService.go('calendar');
  // }

}
