import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';

// Components
import { AppComponent } from './app.component';
import { UserViewComponent } from './user-view/user-view.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { RequestsComponent } from './admin-view/requests/requests.component';
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
  MatPaginatorModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';

const userViewState = { name: 'user-view', component: UserViewComponent };
const adminViewState = { name: 'admin-view', component: AdminViewComponent };
const newRequestState = { name: 'new-request', component: NewRequestComponent };
const calendarState = { name: 'calendar', component: CalendarComponent };
const adminRequestsState = { name: 'admin-requests', component: RequestsComponent };
const adminResponseState = { name: 'admin-responses', component: RequestsComponent };
const viewRequestState = { name: 'view-request', component: RequestsComponent };

@NgModule({
  declarations: [
    AppComponent,
    UserViewComponent,
    AdminViewComponent,
    RequestsComponent,
    CalendarComponent,
    NewRequestComponent,
    HeaderComponent
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
        adminResponseState,
        viewRequestState
      ], useHash: true
    }),
    FormsModule,
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

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
