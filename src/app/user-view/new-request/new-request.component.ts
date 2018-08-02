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

  // Variable used to fill the managers selection autocomplete options, it contains the managers
  public managers: User[];
  // Variable used to fill the Type of request select options.
  public requestTypes: string[];

  // Model of the request to send.
  public request: PACRequest;

  // Form control of the manager autocomplete
  requestToCtrl = new FormControl();
  filteredRequests: Observable<any[]>;

  // Variable binded to the add attachment input to retrieve the uploaded files from it.
  @ViewChild('imgFileInput') imgFileInput;

  /**
  *
  * @param userViewService
  * @param _sanitizer
  * @param uiRouter
  */
  constructor(private userViewService: UserViewService, private _sanitizer: DomSanitizer, public uiRouter: UIRouter) {
    // when the user writes a name we filter the manager lists according to it.
    this.filteredRequests = this.requestToCtrl.valueChanges
      .pipe(
        startWith(''),
        map(manager => manager ? this._filterManagers(manager) : this.managers.slice())
      );
      // Retrieve the selected request from the service internal state
    const selectedRequest = this.userViewService.SelectedRequest;
     // if it isnt null or undefined then we use the selected request
    if (selectedRequest) {
      this.request = selectedRequest;
    } else { // else there wasnt a selected request and we make a new one.
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

  public async sendRequest() {
    if (this.request.Id) {
      await this.userViewService.updateRequest(this.request);
    } else {
      await this.userViewService.addRequest(this.request);
    }
    this.uiRouter.stateService.go('user-view');
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
