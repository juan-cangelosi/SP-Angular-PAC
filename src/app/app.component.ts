import { Component, OnInit } from '@angular/core';
import { UIRouter } from '@uirouter/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public esAdmin: boolean;

  constructor(public uiRouter: UIRouter) {

  }

  ngOnInit() {
    this.esAdmin = false;
    if (this.esAdmin) {
      this.uiRouter.stateService.go('admin-view');
    } else {
      this.uiRouter.stateService.go('user-view');
    }

  }
}
