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
import { UIRouter } from '@uirouter/core';
import { LoaderService } from '../../shared/components/loader/loader.service';

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
  * @param userViewService used to comunicate with other views and with the backend
  * @param _sanitizer used to sanitize links to show be able to open them outside angular
  * @param uiRouter used to transition to another views
  */
  constructor(private userViewService: UserViewService, private _sanitizer: DomSanitizer,
    public uiRouter: UIRouter, private loaderService: LoaderService) {
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
    // we get the type of requests from the backend
    this.loaderService.show();
    const typeOfRequestPromise = this.userViewService.getTypeOfRequests().then((requestsType) => {
      this.requestTypes = requestsType;
    });
    // and we get the managers
    const managersPromise = this.userViewService.getManagers().then((managers) => {
      this.managers = managers;
    });
    Promise.all([typeOfRequestPromise, managersPromise]).then(() => {
      this.loaderService.hide();
    });
  }


  /**
   * Function called by the autcomplete function to get the managers that contain the string written
   * @param value string used to filter the managers by that
   */
  private _filterManagers(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.managers.filter(manager => manager.LoginName.toLowerCase().indexOf(filterValue) === 0);
  }

  /**
   * Method that adds or updates the request deppending if its new or already has an id
   * After doing that successfully it navigates to the user view
   */
  public async sendRequest() {
    this.loaderService.show();
    if (this.request.Id) {
      await this.userViewService.updateRequest(this.request);
    } else {
      await this.userViewService.addRequest(this.request);
    }
    this.loaderService.hide();
    this.uiRouter.stateService.go('user-view');
  }

  /**
   * Function used to decide how we want to show the manager object in the autocomplete input
   * We will show the manager name or undefined if there is no manager, so the validator will notice it
   * @param user manager to show
   */
  displayFn(user?: User): string | undefined {
    return user ? user.Name : undefined;
  }

  /**
   * Function called when the user adds a file, it creates a new attachment to add to the request when its send.
   */
  public uploadFile() {
    const files = this.imgFileInput.nativeElement.files;
    for (const file of files) {
      const attachment: Attachment = new Attachment();
      attachment.fileName = file.name;
      attachment.file = file;
      this.request.Attachments.push(attachment);
    }
  }

  /**
   * Function called from the delete button of the attachment list
   * Removes the selected attachment from the model
   * @param index position in the array of the attachment we wish to delete.
   */
  public async removeAttachment(index: number) {
    if (this.request.Attachments[index].savedOnSharepoint) {
      this.userViewService.removeAttachment(this.request.Id, this.request.Attachments[index]);
    }
    this.request.Attachments.splice(index, 1);
  }

  /**
   * Function called when the user selects a manager from the list, it assigns the manager to the model
   * @param manager manager picked.
   */
  public selected(manager: User) {
    this.request.PACRequestTo = manager;
  }

  /**
   * Function called when the user selects a manager from the list, it assigns the manager to the model
   * @param manager manager picked.
   */
  public optionSelected(event: MatAutocompleteSelectedEvent) {
    this.request.PACRequestTo = event.option.value;
  }

  /**
   * Method called when the user clicks an attachment already saved on sharepoint, it will open it in a new tab
   * @param attachment
   */
  public openAttachment(attachment: Attachment) {
    window.open(attachment.fileOpenUrl);
  }

}
