import { Injectable } from '@angular/core';
import { sp, SharingRole, AttachmentFileInfo } from '@pnp/sp';
import { UserListService } from './user-list.service';
import { PacFolderCreationService } from './pac-folder-creation.service';
import { PACRequest } from '../../models/PACRequest';
import { Attachment } from '../../models/Attachment';

@Injectable({
  providedIn: 'root'
})
export class PacRequestListService {

  constructor(public userListService: UserListService, public pacFolderCreationService: PacFolderCreationService) { }

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
        attachment.savedOnSharepoint = true;
        parsedItem.Attachments.push(attachment);
      }
      parsedItems.push(parsedItem);
    }
    return parsedItems;
  }



  public async getRequestsMadeToUser(): Promise<PACRequest[]> {
    const user = await this.userListService.getCurrentUser();
    const items = await sp.web.lists.getByTitle('PACRequest').items
      .filter(`PACRequestToId eq '${user.Id}' and PACRequestStatus eq 'Pending'`).get();
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

  public async addRequest(request: PACRequest) {
    const insertObject = {
      PACRequestToId: request.PACRequestTo.Id,
      PACDateFrom: this.getSharepointDate(request.PACDateFrom, request.PACHourFrom),
      PACDateTo: this.getSharepointDate(request.PACDateTo, request.PACHourTo),
      PACRequestStatus: 'Pending',
      PACReason: request.PACReason,
      PACRequestType: request.PACRequestType
    };
    console.log(insertObject);
    const response = await sp.web.lists.getByTitle('PACRequest').items.add(insertObject);
    const fileInfos: AttachmentFileInfo[] = [];
    for (const attachment of request.Attachments) {
      fileInfos.push({ name: attachment.fileName, content: attachment.file });
    }
    await response.item.attachmentFiles.addMultiple(fileInfos);
    const user = await this.userListService.getCurrentUser();
    this.pacFolderCreationService.moveItemsToFolder('PACRequest', user.Email, [+response.data.Id]);
    await response.item.shareWith(request.PACRequestTo.LoginName, SharingRole.View);
  }

  public async editRequest(request: PACRequest) {
    const insertObject = {
      PACRequestToId: request.PACRequestTo.Id,
      PACDateFrom: this.getSharepointDate(request.PACDateFrom, request.PACHourFrom),
      PACDateTo: this.getSharepointDate(request.PACDateTo, request.PACHourTo),
      PACRequestStatus: 'Pending',
      PACReason: request.PACReason,
      PACRequestType: request.PACRequestType
    };
    console.log(insertObject);
    const response = await sp.web.lists.getByTitle('PACRequest').items.getById(request.Id).update(
      insertObject, '*'
    );
    const fileInfos: AttachmentFileInfo[] = [];
    for (const attachment of request.Attachments) {
      fileInfos.push({ name: attachment.fileName, content: attachment.file });
    }
    await response.item.attachmentFiles.addMultiple(fileInfos);
    await response.item.shareWith(request.PACRequestTo.LoginName, SharingRole.View);
  }

  public async removeAttachment(requestId: number, attachment: Attachment) {
    await sp.web.lists.getByTitle('PACRequest').items.getById(requestId).attachmentFiles.getByName(attachment.fileName).delete();
  }

  public async getTypeOfRequests(): Promise<string[]> {
    const field = sp.web.lists
      .getByTitle('PACRequest').fields
      .getByInternalNameOrTitle('PACRequestType');
    const resJson = await field.select('Choices').get();
    const choices = new Array<string>();
    console.log(resJson);
    for (const item of resJson.Choices) {
      choices.push(item);
    }
    return choices;
  }

  private getSharepointDate(date: Date, time: string) {
    const splitTime = time.split(':');
    date.setHours(+splitTime[0], +splitTime[1]);
    return date.toISOString();
  }
}


