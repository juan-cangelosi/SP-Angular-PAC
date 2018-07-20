import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';

import { ElementZoneStrategyFactory } from 'elements-zone-strategy';
import { createCustomElement } from '@angular/elements';

// Components
import { AppComponent } from './app.component';
import { UserViewComponent } from './user-view/user-view.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NewRequestComponent } from './user-view/new-request/new-request.component';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatOptionModule,
  MatSelectModule,
  MatCardModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatBadgeModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestViewComponent } from './request-view/request-view.component';
import { RequestResponseComponent } from './admin-view/requests/request-response.component';

const userViewState = { name: 'user-view', component: UserViewComponent };
const adminViewState = { name: 'admin-view', component: AdminViewComponent };
const newRequestState = { name: 'new-request', component: NewRequestComponent };
const calendarState = { name: 'calendar', component: CalendarComponent };
const adminRequestsState = { name: 'request-response', component: RequestResponseComponent };

@NgModule({
  declarations: [
    AppComponent,
    UserViewComponent,
    AdminViewComponent,
    CalendarComponent,
    NewRequestComponent,
    HeaderComponent,
    RequestViewComponent,
    RequestResponseComponent
  ],
  imports: [
    BrowserModule,
    UIRouterModule.forRoot({
      states: [
        userViewState,
        adminViewState,
        newRequestState,
        calendarState,
        adminRequestsState,
      ], useHash: true
    }),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatListModule
  ],
  providers: [],
  entryComponents: [
    AppComponent,
    UserViewComponent,
    AdminViewComponent,
    CalendarComponent,
    NewRequestComponent,
    HeaderComponent,
    RequestViewComponent,
    RequestResponseComponent
  ]
})
export class AppModule {

  constructor(private injector: Injector) {

  }

  ngDoBootstrap() {
    const strategyFactory = new ElementZoneStrategyFactory(AppComponent, this.injector);
    const helloElement = createCustomElement(AppComponent, { injector: this.injector, strategyFactory });
    customElements.define('pac-element', helloElement);
  }


}
