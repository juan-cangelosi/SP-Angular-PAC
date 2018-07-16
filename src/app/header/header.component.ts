import { Component, OnInit } from '@angular/core';
import { UIRouter } from '@uirouter/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public currentSite = 'Home';

  public isAdmin: boolean;

  constructor(public router: UIRouter) {
  }

  ngOnInit() {
    this.isAdmin = true;
  }

  public viewUserRequests() {
    this.router.stateService.go('user-view');
  }

  public viewAdminRequests() {
    this.router.stateService.go('admin-view');
  }

  public viewCalendar() {
    this.router.stateService.go('calendar');
  }

}
