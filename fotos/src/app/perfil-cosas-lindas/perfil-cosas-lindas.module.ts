import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilCosasLindasPageRoutingModule } from './perfil-cosas-lindas-routing.module';

import { PerfilCosasLindasPage } from './perfil-cosas-lindas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilCosasLindasPageRoutingModule
  ],
  declarations: [PerfilCosasLindasPage]
})
export class PerfilCosasLindasPageModule {}
