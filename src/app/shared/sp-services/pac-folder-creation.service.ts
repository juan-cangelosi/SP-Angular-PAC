import { Injectable } from '@angular/core';
import { sp, Item, Folder } from '@pnp/sp';

@Injectable({
  providedIn: 'root'
})
export class PacFolderCreationService {

  constructor() { }

  public async ensureFolder(list: string, folderName: string) {
    const splist = sp.web.lists.getByTitle(list);
    const listData = await splist.expand('RootFolder').select('RootFolder/ServerRelativeUrl').get();
    const auxRes = await splist.items.filter(`Title eq '${folderName}'`).get();
    let folderItem: Item;
    if (auxRes.length < 1) {
      const addRes = await splist.items.add({ Title: `${folderName}`, ContentTypeId: '0x0120', FileLeafRef: `${folderName}` });
      folderItem = addRes.item;
    } else {
      folderItem = splist.items.getById(auxRes[0].Id);
    }
  }

  /**
 * Move item from list root to sub-folder in the same list. Create folder if not exist.
 * The sub-folder will have unique permission for current user
 * @param list List name
 * @param subfolder Sub-folder name
 * @param items id of items in list
 */
  public async moveItemsToFolder(list: string, subfolder: string, items: number[]) {
    const web = await sp.web;
    const listData = await web.lists.getByTitle(list).expand('RootFolder').select('RootFolder/ServerRelativeUrl').get();
    const auxRes = await web.lists.getByTitle(list).items.filter(`Title eq '${subfolder}'`).get();
    let folderItem: Item;
    if (auxRes.length < 1) {
      const addRes = await web.lists.getByTitle(list).items.add({ Title: `${subfolder}`, ContentTypeId: '0x0120' });
      folderItem = addRes.item;
      await addRes.item.update({ FileLeafRef: `${subfolder}` });
    } else {
      folderItem = web.lists.getByTitle(list).items.getById(auxRes[0].Id);
    }

    const res = await folderItem.select('HasUniqueRoleAssignments').get();
    if (!res.HasUniqueRoleAssignments) {
      await folderItem.breakRoleInheritance(false);
    }

    for (let index = 0; index < items.length; index++) {
      try {
        await web.getFileByServerRelativeUrl(`${listData.RootFolder.ServerRelativeUrl}/${items[index]}_.000`)
          .moveTo(`${listData.RootFolder.ServerRelativeUrl}/${subfolder}/${items[index]}_.000`);
      } catch (err) {  }
    }

  }
}
