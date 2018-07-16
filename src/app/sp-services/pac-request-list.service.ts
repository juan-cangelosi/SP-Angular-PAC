import { Injectable } from '@angular/core';
import { sp } from '@pnp/sp';

@Injectable({
  providedIn: 'root'
})
export class PacRequestListService {

  constructor() { }

  public async getPACRequests() {
    const items = await sp.web.lists.getByTitle('PACRequest').items.get();
    // const parsedItems:
    for (const item of items) {
      console.log(item);
      // set item;
    }
    // return parsedItems;
  }
}