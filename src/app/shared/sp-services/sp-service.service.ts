import { Injectable } from '@angular/core';
import { sp, Web } from '@pnp/sp';
import { IConfiguration } from '../../models/IConfiguration';

@Injectable({
  providedIn: 'root'
})
export class SpService {

  private web: Web;

  private _configurations: IConfiguration;


  constructor() {
    sp.setup(
      {
        defaultCachingStore: 'session', // or "local"
        defaultCachingTimeoutSeconds: 30,
        globalCacheDisable: false
      }
    );
  }

  public get configurations(): IConfiguration {
    return this._configurations;
  }
  public set configurations(value: IConfiguration) {
    this._configurations = value;
  }

}
