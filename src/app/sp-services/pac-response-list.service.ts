import { Injectable } from '@angular/core';
import { PACResponse } from '../models/PACResponse';
import { sp, SharingRole } from '@pnp/sp';
import { UserListService } from './user-list.service';
import { PacFolderCreationService } from './pac-folder-creation.service';

@Injectable({
  providedIn: 'root'
})
export class PacResponseListService {

  constructor(public userListService: UserListService, public pacFolderCreationService: PacFolderCreationService) { }

  public async getPACResponses() {
    const items = await sp.web.lists.getByTitle('PACResponse').items.get();
    const parsedItems: PACResponse[] = new Array<PACResponse>();
    for (const item of items) {
      console.log(item);
      // set item;
    }
    return parsedItems;
  }

  public async getMyPACResponses() {
    const user = await this.userListService.getCurrentUser();
    const items = await sp.web.lists.getByTitle('PACResponse').items.expand('PACRequest').filter(`PACRequestAuthor eq '${user.Id}'`).get();
    const parsedItems: PACResponse[] = new Array<PACResponse>();
    for (const item of items) {
      console.log(item);
      // set item;
    }
    return parsedItems;
  }

  public async addResponse(request: PACResponse) {
    const insertObject = {
      PACRequestId: request.PACRequest.Id,
      PACResponse: request.PACResponse,
      PACResponseReason: request.PACResponseReason,
    };
    const response = await sp.web.lists.getByTitle('PACResponse').items.add(insertObject);
    const user = await this.userListService.getCurrentUser();
    this.pacFolderCreationService.moveItemsToFolder('PACResponse', user.Email, [+response.data.Id]);
    // request.PACRequest.
    // await response.item.shareWith(, SharingRole.View);
  }
}
