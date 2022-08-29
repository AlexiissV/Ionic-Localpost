import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanerPageRoutingModule } from './scaner-routing.module';

import { ScanerPage } from './scaner.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ScanerPageRoutingModule
  ],
  declarations: [ScanerPage]
})
export class ScanerPageModule {}
