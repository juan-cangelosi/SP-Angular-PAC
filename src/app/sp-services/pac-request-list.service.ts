import { Injectable } from '@angular/core';
import { sp, SharingRole } from '@pnp/sp';
import { PACRequest } from '../models/PACRequest';
import { UserListService } from './user-list.service';

@Injectable({
  providedIn: 'root'
})
export class PacRequestListService {

  constructor(public userListService: UserListService) { }

  public async getMyPACRequests(): Promise<PACRequest[]> {
    const user = await this.userListService.getCurrentUser();
    const items = await sp.web.lists.getByTitle('PACRequest').items.filter(`AuthorId eq '${user.ID}' and Title eq null`).get();
    const parsedItems: PACRequest[] = new Array<PACRequest>();
    for (const item of items) {
      console.log(item);
      // set item;
    }
    return parsedItems;
  }

  public async getUserRequests(): Promise<PACRequest[]> {
    const user = await this.userListService.getCurrentUser();
    const items = await sp.web.lists.getByTitle('PACRequest').items.filter(`RequestToId eq '${user.ID}'`).get();
    const parsedItems: PACRequest[] = new Array<PACRequest>();
    for (const item of items) {
      console.log(item);
      // set item;
    }
    return parsedItems;
  }

  public async addRequest(request: PACRequest) {
    const insertObject = {
      PACRequestToId: request.PACRequestTo.ID,
      PACDateFrom: this.getSharepointDate(request.PACDateTo),
      PACDateTo: this.getSharepointDate(request.PACDateTo),
      PACRequestStatus: 'pending',
      PACReason: request.PACReason,
      PACRequestType: request.PACRequestType
    };
    const response = await sp.web.lists.getByTitle('PACRequest').items.add(insertObject);
    await response.item.shareWith(request.PACRequestTo.LoginName, SharingRole.View);
  }

  private getSharepointDate(date: Date) {
    let spDate: string;
    const month: number = date.getMonth() + 1;
    spDate = date.getFullYear() + '-' + month + '-' + date.getDate() + 'T' + date.getHours() + date.getMinutes();
    return spDate;
  }
}
