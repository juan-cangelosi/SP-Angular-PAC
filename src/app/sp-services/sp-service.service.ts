import { Injectable } from '@angular/core';
import { sp, Web } from '@pnp/sp';

@Injectable({
  providedIn: 'root'
})
export class SpServiceService {

  private web: Web;

  constructor() { 
  }
}
