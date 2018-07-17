import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css']
})
export class NewRequestComponent implements OnInit {

  public managers = [
    { LoginName: 'John Huschka' },
    { LoginName: 'Juan Cangelosi' },
    { LoginName: 'Juan Carlos' },
  ];

  requestToCtrl = new FormControl();
  filteredRequests: Observable<any[]>;

  constructor() {
    this.filteredRequests = this.requestToCtrl.valueChanges
      .pipe(
        startWith(''),
        map(manager => manager ? this._filterManagers(manager) : this.managers.slice())
      );
  }

  ngOnInit() {
  }


  private _filterManagers(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.managers.filter(manager => manager.LoginName.toLowerCase().indexOf(filterValue) === 0);
  }

  public sendRequest() {
    console.log('sending');
  }

  public uploadFile(event) {
    
  }

}
