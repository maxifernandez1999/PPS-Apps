import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CosasLindasPage } from './cosas-lindas.page';

const routes: Routes = [
  {
    path: 'inicio',
    //component: CosasLindasPage,
    redirectTo: '/cosas-lindas',
  },
  {
    path: 'perfil',
    redirectTo: '/perfil-cosas-lindas',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CosasLindasPageRoutingModule {}
