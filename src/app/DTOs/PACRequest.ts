import { User } from './User';

export class PACRequest {

  ID: number;
  Title: string;
  PACRequestTo: User;
  PACDateFrom: Date;
  PACDateTo: Date;
  PACIsPeriod: boolean;
  PACRequestStatus: string;
  PACReason: any = '';
  PACRequestType: string;
  ContentType: any;
  Attachments: any;
  Order: number;
  Name: Blob;
  PropertyBag: any;

  constructor() { }

  PrepareDTO(jsonObj: any): void {
    if (jsonObj == null) { return; }
    if (jsonObj['ID'] != null) { this.ID = jsonObj['ID']; }
    if (jsonObj['Title'] != null) { this.Title = jsonObj['Title']; }
    if (jsonObj['PACRequestTo'] != null) { this.PACRequestTo = jsonObj['PACRequestTo']; }
    if (jsonObj['PACDateFrom'] != null) { this.PACDateFrom = jsonObj['PACDateFrom']; }
    if (jsonObj['PACDateTo'] != null) { this.PACDateTo = jsonObj['PACDateTo']; }
    if (jsonObj['PACIsPeriod'] != null) { this.PACIsPeriod = jsonObj['PACIsPeriod']; }
    if (jsonObj['PACRequestStatus'] != null) { this.PACRequestStatus = jsonObj['PACRequestStatus']; }
    if (jsonObj['PACReason'] != null) { this.PACReason = jsonObj['PACReason']; }
    if (jsonObj['PACRequestType'] != null) { this.PACRequestType = jsonObj['PACRequestType']; }
    if (jsonObj['ContentType'] != null) { this.ContentType = jsonObj['ContentType']; }
    if (jsonObj['Attachments'] != null) { this.Attachments = jsonObj['Attachments']; }
    if (jsonObj['Order'] != null) { this.Order = jsonObj['Order']; }
    if (jsonObj['Name'] != null) { this.Name = jsonObj['Name']; }
    if (jsonObj['PropertyBag'] != null) { this.PropertyBag = jsonObj['PropertyBag']; }
  }

  public isNewEntity(): boolean {
    return this.ID === 0;
  }

}
