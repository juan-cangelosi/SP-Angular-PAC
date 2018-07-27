import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from '../../models/User';
import { UserViewService } from '../user-view.service';
import { PACRequest } from 'src/app/models/PACRequest';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Attachment } from '../../models/Attachment';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

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


  constructor(private userViewService: UserViewService, private _sanitizer: DomSanitizer) {
    this.filteredRequests = this.requestToCtrl.valueChanges
      .pipe(
        startWith(''),
        map(manager => manager ? this._filterManagers(manager) : this.managers.slice())
      );
    this.request = new PACRequest();
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
    this.userViewService.addRequest(this.request);
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

  public removeAttachment(index: number) {
    console.log(index);
    console.log(this.request.Attachments);
    this.request.Attachments.splice(index, 1);
    console.log(this.request.Attachments);
  }

  public selected(manager: User) {
    console.log(manager);
    this.request.PACRequestTo = manager;
  }

  public optionSelected(event: MatAutocompleteSelectedEvent) {
    this.request.PACRequestTo = event.option.value;
  }

}
