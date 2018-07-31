import { Component, OnInit } from '@angular/core';
import { PACRequestFinal } from '../../models/PACRequestFinal';
import { HumanResourcesService } from '../human-resources.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-final-report-view',
  templateUrl: './final-report-view.component.html',
  styleUrls: ['./final-report-view.component.css']
})
export class FinalReportViewComponent implements OnInit {

  public request: PACRequestFinal;

  public author: User;

  constructor(public humanResourcesService: HumanResourcesService) {
    this.author = new User();
  }

  ngOnInit() {
    this.humanResourcesService.getUser(this.request.AuthorId).then((user) => {
      this.author = user;
    });
    console.log(this.request);
  }

  public approve() {

  }

  public deny() {

  }

}
