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
    if (jsonObj['Attachments'] != null) { this.Attachments = jsonObj['Attachments']; }
    if (jsonObj['Order'] != null) { this.Order = jsonObj['Order']; }
    if (jsonObj['Name'] != null) { this.Name = jsonObj['Name']; }
    if (jsonObj['PropertyBag'] != null) { this.PropertyBag = jsonObj['PropertyBag']; }
  }

  public isNewEntity(): boolean {
    return this.Id === 0;
  }

}
