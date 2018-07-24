import { Injectable } from '@angular/core';
import { sp, Web } from '@pnp/sp';
import {
  Logger,
  ConsoleListener,
  LogLevel
} from '@pnp/logging';

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


    // subscribe a listener
    Logger.subscribe(new ConsoleListener());

    // set the active log level
    Logger.activeLogLevel = LogLevel.Verbose;
  }
}
