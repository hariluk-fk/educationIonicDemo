import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationPageModule)
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module').then( m => m.AuthenticationPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, {
      preloadingStrategy: PreloadAllModules
    }
    )
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
