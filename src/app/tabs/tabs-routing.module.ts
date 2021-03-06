import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'shopping',
        children: [
          {
            path: '',
            loadChildren: () => import('./shopping/shopping.module').then( m => m.ShoppingPageModule)
          }
        ]
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'notification',
        children: [
          {
            path: '',
            loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }

// {
//   path: 'tabs',
//   component: TabsPage,
//   children: [
//     { path: '', redirectTo: 'home', pathMatch: 'full' },
//     { path: 'shopping', loadChildren: './shopping/shopping.module#ShoppingPageModule' },
//     { path: 'home', loadChildren: './home/home.module#HomePageModule' },
//     { path: 'notification', loadChildren: './notification/notification.module#NotificationPageModule' },
//   ]
// },
// {
//   path: '',
//   redirectTo: '/tabs/home',
//   pathMatch: 'full'
// }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TabsPageRoutingModule {}
