import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaqueteLotePage } from './paquete-lote.page';

const routes: Routes = [
  {
    path: '',
    component: PaqueteLotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaqueteLotePageRoutingModule {}
