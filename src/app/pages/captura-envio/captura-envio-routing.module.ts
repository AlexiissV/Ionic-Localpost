import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CapturaEnvioPage } from './captura-envio.page';

const routes: Routes = [
  {
    path: '',
    component: CapturaEnvioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CapturaEnvioPageRoutingModule {}
