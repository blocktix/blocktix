import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { AppState, InteralStateType } from './app.service';
import { LocationService, ORDERBY_PROVIDERS, DistanceComponent, LocationComponent, MapComponent, GeocodingService, GeocodingComponent } from './core';
import { EventListComponent, EventDetailComponent, EventComponent } from './events';
import { NoContent } from './no-content';

// Application wide providers
const APP_PROVIDERS = [
  AppState,
  LocationService,
  GeocodingService
];

type StoreType = {
  state: InteralStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    EventDetailComponent,
    EventComponent,
    NoContent,
    ORDERBY_PROVIDERS,
    DistanceComponent,
    LocationComponent,
    GeocodingComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
