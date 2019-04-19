import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { ChatterListComponent } from './chatters/chatter-list/chatter-list.component';
import { ChatterDetailComponent } from './chatters/chatter-detail/chatter-detail.component';
import { ChatterDetailResolver } from './_resolvers/chatter-detail.resolver';
import { ChatterListResolver } from './_resolvers/chatter-list.resolver';
import { ChatterEditComponent } from './chatters/chatter-edit/chatter-edit.component';
import { ChatterEditResolver } from './_resolvers/chatter-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'chatters', component: ChatterListComponent, resolve: {users: ChatterListResolver}  },
      { path: 'chatters/:id', component: ChatterDetailComponent, resolve: {user: ChatterDetailResolver} },
      { path: 'chatter/edit', component: ChatterEditComponent, 
              resolve: {user: ChatterEditResolver}, canDeactivate:[PreventUnsavedChanges] },
      { path: 'messages', component: MessagesComponent },
      { path: 'lists', component: ListsComponent }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
