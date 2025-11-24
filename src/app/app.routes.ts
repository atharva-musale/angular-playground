import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FormCheckGuard } from './guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'users',
    loadComponent: () => import('./components/user-list/user-list.component').then(m => m.UserListComponent),
    children: [
      {
        path: ':id',
        loadComponent: () => import('./components/user/user.component').then(m => m.UserComponent)
      }
    ]
  },
  {
    path: 'add-new-user',
    canDeactivate: [FormCheckGuard],
    loadComponent: () => import('./components/add-new-user/add-new-user.component').then(m => m.AddNewUserComponent)
  }
];
