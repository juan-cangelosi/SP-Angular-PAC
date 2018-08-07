import { Component, OnInit, Input } from '@angular/core';
import { PACRequest } from '../models/PACRequest';
import { RequestViewService } from './request-view.service';
import { User } from '../models/User';
import { Attachment } from '../models/Attachment';
import { LoaderService } from '../shared/components/loader/loader.service';

@Component({
  selector: 'app-request-view',
  templateUrl: './request-view.component.html',
  styleUrls: ['./request-view.component.css']
})
export class RequestViewComponent implements OnInit {

  @Input('request') public request: PACRequest;

  public author: User;

  constructor(public requestViewService: RequestViewService, private loaderService: LoaderService) {
    this.author = new User();
  }

  ngOnInit() {
    this.loaderService.show();
    const authorPromise = this.requestViewService.getUser(this.request.AuthorId).then((user) => {
      this.author = user;
    });
    const requestedToPromise = this.requestViewService.getUser(this.request.PACRequestToId).then((user) => {
      this.request.PACRequestTo = user;
    });
    Promise.all([authorPromise, requestedToPromise]).then(() => {
      this.loaderService.hide();
    });
  }

  public openAttachment(attachment: Attachment) {
    window.open(attachment.fileOpenUrl);
  }

}
