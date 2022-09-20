import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilCosasFeasPageRoutingModule } from './perfil-cosas-feas-routing.module';

import { PerfilCosasFeasPage } from './perfil-cosas-feas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilCosasFeasPageRoutingModule
  ],
  declarations: [PerfilCosasFeasPage]
})
export class PerfilCosasFeasPageModule {}
