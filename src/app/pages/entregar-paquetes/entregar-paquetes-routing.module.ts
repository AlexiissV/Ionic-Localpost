import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntregarPaquetesPage } from './entregar-paquetes.page';

const routes: Routes = [
  {
    path: '',
    component: EntregarPaquetesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntregarPaquetesPageRoutingModule {}
