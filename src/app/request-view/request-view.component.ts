import { Component, OnInit, Input } from '@angular/core';
import { PACRequest } from '../models/PACRequest';
import { RequestViewService } from './request-view.service';
import { User } from '../models/User';
import { Attachment } from '../models/Attachment';

@Component({
  selector: 'app-request-view',
  templateUrl: './request-view.component.html',
  styleUrls: ['./request-view.component.css']
})
export class RequestViewComponent implements OnInit {

  @Input('request') public request: PACRequest;

  public author: User;

  constructor(public requestViewService: RequestViewService) {
    this.author = new User();
  }

  ngOnInit() {
    this.requestViewService.getUser(this.request.AuthorId).then((user) => {
      this.author = user;
    });
    console.log(this.request);
  }

  public openAttachment(attachment: Attachment) {
    window.open(attachment.fileOpenUrl);
  }

}
