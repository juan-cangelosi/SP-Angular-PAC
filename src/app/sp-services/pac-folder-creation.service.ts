import { Injectable } from '@angular/core';
import { sp, Item } from '@pnp/sp';

@Injectable({
  providedIn: 'root'
})
export class PacFolderCreationService {

  constructor() { }

  public async ensureFolder(list: string, folderName: string) {
    const web = sp.web;
    let folder = await web.lists.getByTitle(list).rootFolder.folders.getByName(folderName).get();
    console.log(folder);
    folder = web.lists.getByTitle(list).rootFolder.folders.add('folderName');
  }
}
