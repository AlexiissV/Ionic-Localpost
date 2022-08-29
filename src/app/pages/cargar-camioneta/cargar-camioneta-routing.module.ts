import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CargarCamionetaPage } from './cargar-camioneta.page';

const routes: Routes = [
  {
    path: '',
    component: CargarCamionetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CargarCamionetaPageRoutingModule {}
