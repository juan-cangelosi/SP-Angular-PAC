import { Injectable } from '@angular/core';
import { sp, SharingRole } from '@pnp/sp';
import { PACRequest } from '../models/PACRequest';
import { UserListService } from './user-list.service';
import { PacFolderCreationService } from './pac-folder-creation.service';
import { Attachment } from '../models/Attachment';

@Injectable({
  providedIn: 'root'
})
export class PacRequestListService {

  constructor(public userListService: UserListService, public pacFolderCreationService: PacFolderCreationService) { }

  public async getMyPACRequests(): Promise<PACRequest[]> {
    const user = await this.userListService.getCurrentUser();
    const items = await sp.web.lists.getByTitle('PACRequest').items.filter(`AuthorId eq '${user.Id}' and Title eq null`).get();
    const parsedItems: PACRequest[] = new Array<PACRequest>();
    for (const item of items) {
      const attachments = await sp.web.lists.getByTitle('PACRequest').items.getById(item.Id).attachmentFiles.get();
      console.log(attachments);
      const parsedItem = new PACRequest();
      parsedItem.PrepareDTO(item);
      parsedItems.push(parsedItem);
    }
    console.log(parsedItems);
    return parsedItems;
  }

  public async getUserRequests(): Promise<PACRequest[]> {
    const user = await this.userListService.getCurrentUser();
    const items = await sp.web.lists.getByTitle('PACRequest').items.filter(`RequestToId eq '${user.Id}'`).get();
    const parsedItems: PACRequest[] = new Array<PACRequest>();
    for (const item of items) {
      const parsedItem = new PACRequest();
      parsedItem.PrepareDTO(item);
      const attachments = await sp.web.lists.getByTitle('PACRequest').items.getById(item.Id).attachmentFiles.get();
      for (const attachmentItem of attachments) {
        const attachment = new Attachment();
        attachment.fileName = attachmentItem.fileName;
        parsedItem.Attachments.push(attachment);
      }
    }
    console.log(parsedItems);
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
    const user = await this.userListService.getCurrentUser();
    this.pacFolderCreationService.moveItemsToFolder('PACRequest', user.Email, [+response.data.Id]);
    await response.item.shareWith(request.PACRequestTo.LoginName, SharingRole.View);
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
    const spDate: string = date.getFullYear() +
      '-' + (date.getMonth() + 1) + '-' + date.getDay() + 'T' + date.getHours() + ':' + date.getMinutes() + ':00.000Z';
    return spDate;
  }
}


