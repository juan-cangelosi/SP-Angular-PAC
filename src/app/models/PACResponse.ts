export class PACResponse {

  Id: number;
  Title: string;
  PACRequest: any = '';
  PACResponse: string;
  PACResponseReason: any = '';
  ContentType: any = '';
  Attachments: any = '';
  Order: number;
  Name: Blob;
  PropertyBag: any = '';

  constructor() { }

  PrepareDTO(jsonObj: any): void {
    if (jsonObj == null) { return; }
    if (jsonObj['Id'] != null) { this.Id = jsonObj['Id']; }
    if (jsonObj['Title'] != null) { this.Title = jsonObj['Title']; }
    if (jsonObj['PACRequest'] != null) { this.PACRequest = jsonObj['PACRequest']; }
    if (jsonObj['PACResponse'] != null) { this.PACResponse = jsonObj['PACResponse']; }
    if (jsonObj['PACResponseReason'] != null) { this.PACResponseReason = jsonObj['PACResponseReason']; }
    if (jsonObj['ContentType'] != null) { this.ContentType = jsonObj['ContentType']; }
  }

  public isNewEntity(): boolean {
    return this.Id === 0;
  }

}
