import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaquetePageRoutingModule } from './paquete-routing.module';

import { PaquetePage } from './paquete.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PaquetePageRoutingModule
  ],
  declarations: [PaquetePage]
})
export class PaquetePageModule {}
