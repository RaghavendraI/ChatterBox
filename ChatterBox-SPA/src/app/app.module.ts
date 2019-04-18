import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { ChatterListComponent } from './chatters/chatter-list/chatter-list.component';
import { ChatterCardComponent } from './chatters/chatter-card/chatter-card.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ChatterDetailComponent } from './chatters/chatter-detail/chatter-detail.component';
import { ChatterDetailResolver } from './_resolvers/chatter-detail.resolver';
import { ChatterListResolver } from './_resolvers/chatter-list.resolver';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    ListsComponent,
    MessagesComponent,
    ChatterListComponent,
    ChatterCardComponent,
    ChatterDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4000'],
        blacklistedRoutes: ['localhost:4000/api/auth']
      }
    })
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertifyService,
    AuthGuard,
    UserService,
    ChatterDetailResolver,
    ChatterListResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
