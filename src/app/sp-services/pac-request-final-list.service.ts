import { Injectable } from '@angular/core';
import { sp } from '@pnp/sp';
import { PACRequest } from '../models/PACRequest';
import { UserListService } from './user-list.service';
import { Attachment } from '../models/Attachment';

@Injectable({
  providedIn: 'root'
})
export class PacRequestListService {

  constructor(public userListService: UserListService) { }

  public async getMyPACRequests(): Promise<PACRequest[]> {
    const user = await this.userListService.getCurrentUser();
    const items = await sp.web.lists.getByTitle('PACRequest').items.filter(`AuthorId eq '${user.Id}' and Title eq null`).get();
    const parsedItems: PACRequest[] = new Array<PACRequest>();
    console.log(items);
    for (const item of items) {
      const parsedItem = new PACRequest();
      parsedItem.PrepareDTO(item);
      const attachments = await sp.web.lists.getByTitle('PACRequest').items.getById(item.Id).attachmentFiles.get();
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
    const blobFile = await sp.web.lists.getByTitle('PACRequest').items.getById(itemId).attachmentFiles.getByName(fileName).get();
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
