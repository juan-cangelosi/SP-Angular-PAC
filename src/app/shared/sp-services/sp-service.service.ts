import { Injectable } from '@angular/core';
import { sp, Web } from '@pnp/sp';

@Injectable({
  providedIn: 'root'
})
export class SpService {

  private web: Web;

  private _configurations: any;


  constructor() {
    sp.setup(
      {
        defaultCachingStore: 'session', // or "local"
        defaultCachingTimeoutSeconds: 30,
        globalCacheDisable: false
      }
    );
  }

  public get configurations(): any {
    return this._configurations;
  }
  public set configurations(value: any) {
    console.log(value);
    this._configurations = value;
  }

}
