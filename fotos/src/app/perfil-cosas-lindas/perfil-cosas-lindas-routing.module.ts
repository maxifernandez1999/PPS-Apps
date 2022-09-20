import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilCosasLindasPage } from './perfil-cosas-lindas.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilCosasLindasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilCosasLindasPageRoutingModule {}
