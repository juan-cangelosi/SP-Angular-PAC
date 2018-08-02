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

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestViewComponent } from './request-view/request-view.component';
import { RequestResponseComponent } from './admin-view/requests/request-response.component';
import { MaterialModule } from './material.module';
import { PacFolderCreationService } from './sp-services/pac-folder-creation.service';
import { PacRequestListService } from './sp-services/pac-request-list.service';
import { PacResponseListService } from './sp-services/pac-response-list.service';
import { UserListService } from './sp-services/user-list.service';
import { SpService } from './sp-services/sp-service.service';
import { AdminViewService } from './admin-view/admin-view.service';
import { UserViewService } from './user-view/user-view.service';
import { CalendarService } from './calendar/calendar.service';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';
import { RequestViewService } from './request-view/request-view.service';
import { HumanResourcesComponent } from './human-resources/human-resources.component';
import { HumanResourcesService } from './human-resources/human-resources.service';
import { FinalReportViewComponent } from './human-resources/final-report-view/final-report-view.component';

// Possible states of the router
const userViewState = { name: 'user-view', component: UserViewComponent };
const adminViewState = { name: 'admin-view', component: AdminViewComponent };
const newRequestState = { name: 'new-request', component: NewRequestComponent };
const calendarState = { name: 'calendar', component: CalendarComponent };
const adminRequestsState = { name: 'request-response', component: RequestResponseComponent };
const hrState = { name: 'human-resources', component: HumanResourcesComponent };
const hrViewState = { name: 'final-request-view', component: FinalReportViewComponent };

@NgModule({
  declarations: [
    AppComponent,
    UserViewComponent,
    AdminViewComponent,
    CalendarComponent,
    NewRequestComponent,
    HeaderComponent,
    RequestViewComponent,
    RequestResponseComponent,
    LoaderComponent,
    HumanResourcesComponent,
    FinalReportViewComponent,
  ],
  imports: [
    BrowserModule,
    // Import the router and add all the possible states
    UIRouterModule.forRoot({
      states: [
        userViewState,
        adminViewState,
        newRequestState,
        calendarState,
        adminRequestsState,
        hrState,
        hrViewState
      ], useHash: true
    }),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    // Sharepoint Services
    PacFolderCreationService,
    PacRequestListService,
    PacResponseListService,
    UserListService,
    SpService,

    // Utility Services
    LoaderService,

    // Component Services
    AdminViewService,
    UserViewService,
    CalendarService,
    RequestViewService,
    HumanResourcesService,
  ],
  entryComponents: [
    AppComponent,
    UserViewComponent,
    AdminViewComponent,
    CalendarComponent,
    NewRequestComponent,
    HeaderComponent,
    RequestViewComponent,
    RequestResponseComponent,
    LoaderComponent
  ]
})
export class AppModule {

  constructor(private injector: Injector) {

  }

  /**
   * Called when the module bootstraps, it will create the angular element that will be used in sharepoint
   */
  ngDoBootstrap() {
    const strategyFactory = new ElementZoneStrategyFactory(AppComponent, this.injector);
    const helloElement = createCustomElement(AppComponent, { injector: this.injector, strategyFactory });
    customElements.define('pac-element', helloElement);
  }


}
