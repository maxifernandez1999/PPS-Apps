import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'appComponent', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'appComponent', loadChildren: () => import('../app/app.module').then( m => m.AppModule)},
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'cosas-lindas',
    loadChildren: () => import('./cosas-lindas/cosas-lindas.module').then( m => m.CosasLindasPageModule)
  },
  {
    path: 'cosas-feas',
    loadChildren: () => import('./cosas-feas/cosas-feas.module').then( m => m.CosasFeasPageModule)
  },
  {
    path: 'perfil-cosas-lindas',
    loadChildren: () => import('./perfil-cosas-lindas/perfil-cosas-lindas.module').then( m => m.PerfilCosasLindasPageModule)
  },
  {
    path: 'perfil-cosas-feas',
    loadChildren: () => import('./perfil-cosas-feas/perfil-cosas-feas.module').then( m => m.PerfilCosasFeasPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
