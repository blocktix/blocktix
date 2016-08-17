/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.style.css',
    '../assets/fonts/opensans_regular/stylesheet.css',
    '../assets/fonts/fontello/fontello.css'
  ],
  providers: [
    Title
  ],
  template: `
    <nav>
      <a [routerLink]=" ['./events' ] " [routerLinkActiveOptions]="{ exact: true }" routerLinkActive="active">
        <img class="nav-logo" src="assets/img/blocktix-logo-white.png" height="30px">

        Events<!-- TODO: translations? -->
      </a>

      <a [routerLink]=" ['./exchange'] " routerLinkActive="active">
        Exchange<!-- TODO: translations? -->
      </a>

      <i class="separator"></i>

      <label class="icon-search">
        <input type="search" placeholder="Search for events" size="48" />
        <!-- TODO: Bind search... -->
        <!-- TODO: translations? -->
      </label>

      <a href="#" class="account-details">

        <span>104.39 ETH</span>

        <i class="separator"></i>

        <span class="account-label">Account</span><img [src]="accountIcon" class="account-image" height="36px;" />
        <!-- TODO: translations? -->
      </a>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>

    <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>

    <!-- TODO: footer>
      <span>WebPack Angular 2 Starter by <a [href]="url">@AngularClass</a></span>
      <div>
        <a [href]="url">
          <img [src]="angularclassLogo" width="25%">
        </a>
      </div>
    </footer-->
  `
})
export class App {
  private sub: Subscription;
  private pageTitle: string;
  accountIcon = 'assets/img/angularclass-avatar.png';
  name = 'Blocktix DApp';
  url = "https://blocktix.org";

  constructor(
    public appState: AppState,
    private router: Router,
    private title: Title) {
      this.pageTitle = title.getTitle();
  }

  ngOnInit() {
    this.sub = this.router.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        this.title.setTitle(this.pageTitle + ' - ' + event.state['_root'].children[0].value.component.pageTitle);
      }
    });
  }

  ngOnDestroy() {

    this.sub.unsubscribe();
  }

}
