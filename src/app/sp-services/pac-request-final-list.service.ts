import { Injectable } from '@angular/core';
import { sp } from '@pnp/sp';
import { PACRequest } from '../models/PACRequest';
import { UserListService } from './user-list.service';
import { Attachment } from '../models/Attachment';
import { PACRequestFinal } from '../models/PACRequestFinal';

@Injectable({
  providedIn: 'root'
})
export class PacRequestFinalListService {

  constructor(public userListService: UserListService) { }

  public async getFinalPACRequests(): Promise<PACRequestFinal[]> {
    const user = await this.userListService.getCurrentUser();
    const items = await sp.web.lists.getByTitle('PACRequestFinal').items.filter(`PACRequestStatus eq 'Approved by Manager'`).get();
    const parsedItems: PACRequestFinal[] = new Array<PACRequestFinal>();
    console.log(items);
    for (const item of items) {
      const parsedItem = new PACRequestFinal();
      parsedItem.PrepareDTO(item);
      const attachments = await sp.web.lists.getByTitle('PACRequestFinal').items.getById(item.Id).attachmentFiles.get();
      for (const attachmentItem of attachments) {
        console.log(attachmentItem);
        const attachment = new Attachment();
        attachment.fileName = attachmentItem.FileName;
        attachment.fileOpenUrl = attachmentItem.ServerRelativeUrl;
        parsedItem.Attachments.push(attachment);
      }
      parsedItems.push(parsedItem);
    }
    return parsedItems;
  }

  public async getAttachment(itemId: number, fileName: string) {
    const user = await this.userListService.getCurrentUser();
    const blobFile = await sp.web.lists.getByTitle('PACRequestFinal').items.getById(itemId).attachmentFiles.getByName(fileName).get();
    const attachment: Attachment = new Attachment();
    attachment.fileName = fileName;
    attachment.file = blobFile;
    return attachment;
  }

  private getSharepointDate(date: Date, time: string) {
    const splitTime = time.split(':');
    date.setHours(+splitTime[0], +splitTime[1]);
    return date.toISOString();
  }
}
