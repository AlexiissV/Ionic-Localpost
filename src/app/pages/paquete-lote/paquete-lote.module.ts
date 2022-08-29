import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaqueteLotePageRoutingModule } from './paquete-lote-routing.module';

import { PaqueteLotePage } from './paquete-lote.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PaqueteLotePageRoutingModule
  ],
  declarations: [PaqueteLotePage]
})
export class PaqueteLotePageModule {}
