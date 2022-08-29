import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CapturaEnvioPageRoutingModule } from './captura-envio-routing.module';

import { CapturaEnvioPage } from './captura-envio.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    CapturaEnvioPageRoutingModule
  ],
  declarations: [CapturaEnvioPage]
})
export class CapturaEnvioPageModule {}
