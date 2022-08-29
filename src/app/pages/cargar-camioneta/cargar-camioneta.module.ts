import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CargarCamionetaPageRoutingModule } from './cargar-camioneta-routing.module';

import { CargarCamionetaPage } from './cargar-camioneta.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    CargarCamionetaPageRoutingModule
  ],
  declarations: [CargarCamionetaPage]
})
export class CargarCamionetaPageModule {}
