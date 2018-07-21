import { Injectable } from '@angular/core';
import { PACResponse } from '../models/PACResponse';
import { sp } from '@pnp/sp';

@Injectable({
  providedIn: 'root'
})
export class PacResponseListService {

  constructor() { }

  public async getPACResponses() {
    const items = await sp.web.lists.getByTitle('PACResponse').items.get();
    const parsedItems: PACResponse[] = new Array<PACResponse>();
    for (const item of items) {
      console.log(item);
      // set item;
    }
    return parsedItems;
  }
}
