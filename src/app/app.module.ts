import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

// ROUTING
import { ROUTES } from './app-routing.module';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressRouterModule } from 'ngx-progressbar/router';

// COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './components/shared/nav/nav.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { MaterialModule } from './material.module';
import { AuthService } from './services/auth.service';
import { MatIconRegistry } from '@angular/material/icon';
import { CallbackComponent } from './components/callback/callback.component';
import { SpotiloginDirective } from './directives/spotilogin.directive';
import { NotificationService } from './services/notification.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    CallbackComponent,
    SpotiloginDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    NgProgressRouterModule,
    NgProgressModule.withConfig({
      spinner: false,
      color: '#1db954',
      thick: true
    }),
  ],
  providers: [
    AuthService,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
  }
}
