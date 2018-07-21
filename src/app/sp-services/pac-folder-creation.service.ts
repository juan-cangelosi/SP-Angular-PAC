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
      const addRes = await splist.items.add({ Title: `${folderName}`, ContentTypeId: '0x0120' });
      folderItem = addRes.item;
      await addRes.item.update({ FileLeafRef: `${folderName}` });
    } else {
      folderItem = splist.items.getById(auxRes[0].Id);
    }
  }
}
