import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';
import { createCustomElement } from '@angular/elements';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { UserViewComponent } from './user-view/user-view.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NewRequestComponent } from './user-view/new-request/new-request.component';
import { FinalReportViewComponent } from './human-resources-view/final-report-view/final-report-view.component';
import { HumanResourcesViewComponent } from './human-resources-view/human-resources-view.component';
import { RequestResponseComponent } from './manager-view/requests/request-response.component';
import { ManagerViewComponent } from './manager-view/manager-view.component';
import { RequestViewComponent } from './request-view/request-view.component';

// Services
import { UserViewService } from './user-view/user-view.service';
import { CalendarService } from './calendar/calendar.service';
import { RequestViewService } from './request-view/request-view.service';
import { PacFolderCreationService } from './shared/sp-services/pac-folder-creation.service';
import { PacRequestListService } from './shared/sp-services/pac-request-list.service';
import { PacResponseListService } from './shared/sp-services/pac-response-list.service';
import { UserListService } from './shared/sp-services/user-list.service';
import { SpService } from './shared/sp-services/sp-service.service';
import { LoaderService } from './shared/components/loader/loader.service';
import { ManagerViewService } from './manager-view/manager-view.service';
import { HumanResourcesViewService } from './human-resources-view/human-resources-view.service';


// Possible states of the router
const userViewState = { name: 'user-view', component: UserViewComponent };
const managerViewState = { name: 'manager-view', component: ManagerViewComponent };
const newRequestState = { name: 'new-request', component: NewRequestComponent };
// const calendarState = { name: 'calendar', component: CalendarComponent };
const managerRequestResponseState = { name: 'request-response', component: RequestResponseComponent };
const hrViewState = { name: 'human-resources', component: HumanResourcesViewComponent };
const hrFinalViewState = { name: 'final-request-view', component: FinalReportViewComponent };

@NgModule({
  declarations: [
    AppComponent,
    UserViewComponent,
    RequestViewComponent,
    CalendarComponent,
    NewRequestComponent,
    HeaderComponent,
    RequestViewComponent,
    RequestResponseComponent,
    ManagerViewComponent,
    LoaderComponent,
    HumanResourcesViewComponent,
    FinalReportViewComponent,
  ],
  imports: [
    BrowserModule,
    // Import the router and add all the possible states
    UIRouterModule.forRoot({
      states: [
        userViewState,
        managerViewState,
        newRequestState,
        // calendarState,
        managerRequestResponseState,
        hrViewState,
        hrFinalViewState
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
    ManagerViewService,
    UserViewService,
    CalendarService,
    RequestViewService,
    HumanResourcesViewService,
  ],
  entryComponents: [
    AppComponent,
    /* UserViewComponent,
    ManagerViewComponent,
    CalendarComponent,
    NewRequestComponent,
    HeaderComponent,
    RequestViewComponent,
    RequestResponseComponent,
    LoaderComponent
    */
  ]
})
export class AppModule {

  constructor(private injector: Injector) {

  }

  /**
   * Called when the module bootstraps, it will create the angular element that will be used in sharepoint
   */
  ngDoBootstrap() {
    if (!customElements.get('pac-element')) {
      const strategyFactory = new ElementZoneStrategyFactory(AppComponent, this.injector);
      const helloElement = createCustomElement(AppComponent, { injector: this.injector, strategyFactory });
      customElements.define('pac-element', helloElement);
    }

  }


}
