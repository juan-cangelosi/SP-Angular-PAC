import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from '../../models/User';
import { UserViewService } from '../user-view.service';
import { PACRequest } from '../../models/PACRequest';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Attachment } from '../../models/Attachment';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { UIRouter } from '../../../../node_modules/@uirouter/core';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css']
})
export class NewRequestComponent implements OnInit {

  public managers: User[];
  public requestTypes: string[];

  public request: PACRequest;

  requestToCtrl = new FormControl();
  filteredRequests: Observable<any[]>;

  @ViewChild('imgFileInput') imgFileInput;


  constructor(private userViewService: UserViewService, private _sanitizer: DomSanitizer, public uiRouter: UIRouter) {
    this.filteredRequests = this.requestToCtrl.valueChanges
      .pipe(
        startWith(''),
        map(manager => manager ? this._filterManagers(manager) : this.managers.slice())
      );
    const selectedRequest = this.userViewService.SelectedRequest;

    if (selectedRequest) {
      this.request = selectedRequest;
    } else {
      this.request = new PACRequest();
    }
  }

  ngOnInit() {
    this.userViewService.getTypeOfRequests().then((requestsType) => {
      this.requestTypes = requestsType;
    });
    this.userViewService.getManagers().then((managers) => {
      this.managers = managers;
    });
  }


  private _filterManagers(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.managers.filter(manager => manager.LoginName.toLowerCase().indexOf(filterValue) === 0);
  }

  public sendRequest() {
    if (this.request.Id) {

    } else {
      this.userViewService.addRequest(this.request);
      this.uiRouter.stateService.go('user-view');
    }
  }

  displayFn(user?: User): string | undefined {
    return user ? user.Name : undefined;
  }

  public uploadFile() {
    const files = this.imgFileInput.nativeElement.files;
    for (const file of files) {
      const attachment: Attachment = new Attachment();
      attachment.fileName = file.name;
      attachment.file = file;
      this.request.Attachments.push(attachment);
    }
  }

  public async removeAttachment(index: number) {
    if (this.request.Attachments[index].savedOnSharepoint) {
      this.userViewService.removeAttachment(this.request.Id, this.request.Attachments[index]);
    }
    this.request.Attachments.splice(index, 1);
  }

  public selected(manager: User) {
    console.log(manager);
    this.request.PACRequestTo = manager;
  }

  public optionSelected(event: MatAutocompleteSelectedEvent) {
    this.request.PACRequestTo = event.option.value;
  }

}
