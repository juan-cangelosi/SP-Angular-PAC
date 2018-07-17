export class PACResponse {

  ID: number;
  Title: string;
  PACRequest: any;
  ContentType: any;
  Attachments: any;
  Order;
  Name: Blob;
  PropertyBag: any;

  constructor() { }

  PrepareDTO(jsonObj: any): void {
    if (jsonObj == null) { return; }
    if (jsonObj['ID'] != null) { this.ID = jsonObj['ID']; }
    if (jsonObj['Title'] != null) { this.Title = jsonObj['Title']; }
    if (jsonObj['PACRequest'] != null) { this.PACRequest = jsonObj['PACRequest']; }
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
