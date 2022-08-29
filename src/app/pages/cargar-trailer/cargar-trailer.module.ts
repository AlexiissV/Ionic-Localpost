import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CargarTrailerPageRoutingModule } from './cargar-trailer-routing.module';

import { CargarTrailerPage } from './cargar-trailer.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    CargarTrailerPageRoutingModule
  ],
  declarations: [CargarTrailerPage]
})
export class CargarTrailerPageModule {}
