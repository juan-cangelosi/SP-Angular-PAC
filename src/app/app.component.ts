import { Component, OnInit, Input } from '@angular/core';
import { UIRouter } from '@uirouter/core';
import { SpService } from './shared/sp-services/sp-service.service';
import { IConfiguration } from './models/IConfiguration';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public esAdmin: boolean;

  constructor(public uiRouter: UIRouter, public spService: SpService) {
  }

  ngOnInit() {
    this.esAdmin = false;
    this.spService.configurations = this.configurations;
    if (this.esAdmin) {
      this.uiRouter.stateService.go('manager-view');
    } else {
      this.uiRouter.stateService.go('user-view');
    }
  }

  @Input()
  set configurations(configurations: IConfiguration) {
    this.spService.configurations = configurations;
  }

  get configurations(): IConfiguration { return this.spService.configurations; }
}
