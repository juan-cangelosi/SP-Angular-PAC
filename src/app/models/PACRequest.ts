import { User } from './User';
import { Attachment } from './Attachment';

export class PACRequest {

  Id: number;
  Title: string;
  PACRequestTo: User;
  PACRequestToId: number;
  PACNotify: any = '';
  PACDateFrom: Date;
  PACHourFrom: string;
  PACDateTo: Date;
  PACHourTo: string;
  PACRequestStatus: string;
  PACResponse: string;
  PACReason: any;
  PACRequestType = '';
  ContentType: any = '';
  Attachments: Attachment[];
  AuthorId: number;
  Order: number;
  Name: Blob;
  PropertyBag: any = '';

  constructor() {
    this.Attachments = new Array<Attachment>();
    this.PACDateFrom = new Date();
    this.PACDateTo = new Date();
    this.PACHourFrom = '8:00';
    this.PACHourTo = '18:00';
  }

  PrepareDTO(jsonObj: any): void {
    if (jsonObj == null) { return; }
    if (jsonObj['Id'] != null) { this.Id = jsonObj['Id']; }
    if (jsonObj['Title'] != null) { this.Title = jsonObj['Title']; }
    if (jsonObj['PACRequestToId'] != null) { this.PACRequestToId = jsonObj['PACRequestToId']; }
    if (jsonObj['PACNotify'] != null) { this.PACNotify = jsonObj['PACNotify']; }
    if (jsonObj['PACDateFrom'] != null) {
      this.PACDateFrom = new Date(jsonObj['PACDateFrom']);
      this.PACHourFrom = this.addZero(this.PACDateFrom.getHours()) + ':' + this.addZero(this.PACDateFrom.getMinutes());
    }
    if (jsonObj['PACDateTo'] != null) {
      this.PACDateTo = new Date(jsonObj['PACDateTo']);
      this.PACHourTo = this.addZero(this.PACDateTo.getHours()) + ':' + this.addZero(this.PACDateTo.getMinutes());
    }
    if (jsonObj['PACRequestStatus'] != null) { this.PACRequestStatus = jsonObj['PACRequestStatus']; }
    if (jsonObj['PACReason'] != null) { this.PACReason = jsonObj['PACReason']; }
    if (jsonObj['PACResponse'] != null) { this.PACResponse = jsonObj['PACResponse']; }
    if (jsonObj['AuthorId'] != null) { this.AuthorId = jsonObj['AuthorId']; }
    if (jsonObj['PACRequestType'] != null) { this.PACRequestType = jsonObj['PACRequestType']; }
    if (jsonObj['ContentType'] != null) { this.ContentType = jsonObj['ContentType']; }
  }

  public isNewEntity(): boolean {
    return this.Id === 0;
  }

  private getSharepointDate(date: Date) {
    let spDate: string;
    const month: number = date.getMonth() + 1;
    spDate = date.getFullYear() + '-' + month + '-' + date.getDate() + 'T'
      + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    return spDate;
  }

  private addZero(i: number): string {
    if (i < 10) {
      return '0' + i;
    }
    return `${i}`;
  }

}
