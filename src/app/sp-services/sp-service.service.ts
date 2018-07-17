import { Injectable } from '@angular/core';
import { sp, Web } from '@pnp/sp';

@Injectable({
  providedIn: 'root'
})
export class SpService {

  private web: Web;

  constructor() {
    sp.setup(
      {
        defaultCachingStore: 'session', // or "local"
        defaultCachingTimeoutSeconds: 30,
        globalCacheDisable: false
      }
    );
  }
}
