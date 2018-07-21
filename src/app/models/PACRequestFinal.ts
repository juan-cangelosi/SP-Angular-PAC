import { User } from './User';

export class PACRequestFinal {

  ID: number;
  Title: string;
  RequestTo: User;
  PACDateFrom: Date;
  PACDateTo: Date;
  PACIsPeriod: boolean;
  PacReason: any = '';
  PACRequestStatus: string;
  PACRequestType;
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
    if (jsonObj['RequestTo'] != null) { this.RequestTo = jsonObj['RequestTo']; }
    if (jsonObj['PACDateFrom'] != null) { this.PACDateFrom = jsonObj['PACDateFrom']; }
    if (jsonObj['PACDateTo'] != null) { this.PACDateTo = jsonObj['PACDateTo']; }
    if (jsonObj['PACIsPeriod'] != null) { this.PACIsPeriod = jsonObj['PACIsPeriod']; }
    if (jsonObj['PacReason'] != null) { this.PacReason = jsonObj['PacReason']; }
    if (jsonObj['PACRequestStatus'] != null) { this.PACRequestStatus = jsonObj['PACRequestStatus']; }
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
