import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderSubject = new Subject<boolean>();

  public loaderState = this.loaderSubject.asObservable();

  constructor() { }

  public show(): any {
      this.loaderSubject.next(true);
  }

  public hide() {
      this.loaderSubject.next(false);
  }
}
