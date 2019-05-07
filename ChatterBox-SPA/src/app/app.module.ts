import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { NgxGalleryModule } from 'ngx-gallery';
import {TimeAgoPipe} from 'time-ago-pipe';
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
import { ChatterEditComponent } from './chatters/chatter-edit/chatter-edit.component';
import { ChatterEditResolver } from './_resolvers/chatter-edit.resolver';
import { PhotoEditorComponent } from './chatters/photo-editor/photo-editor.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { FileUploadModule } from 'ng2-file-upload';
import { ListsResolver } from './_resolvers/lists.resolver';

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
    ChatterDetailComponent,
    ChatterEditComponent,
    PhotoEditorComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    NgxGalleryModule,
    FileUploadModule,
    BsDatepickerModule.forRoot(),
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
    PreventUnsavedChanges,
    UserService,
    ChatterDetailResolver,
    ChatterListResolver,
    ChatterEditResolver,
    ListsResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
