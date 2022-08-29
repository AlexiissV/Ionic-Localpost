import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntregarPaquetesPageRoutingModule } from './entregar-paquetes-routing.module';

import { EntregarPaquetesPage } from './entregar-paquetes.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    EntregarPaquetesPageRoutingModule
  ],
  declarations: [EntregarPaquetesPage]
})
export class EntregarPaquetesPageModule {}
