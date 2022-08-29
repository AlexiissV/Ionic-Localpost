import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sucursales',
    loadChildren: () => import('./pages/sucursales/sucursales.module').then( m => m.SucursalesPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'cargar-trailer',
    loadChildren: () => import('./pages/cargar-trailer/cargar-trailer.module').then( m => m.CargarTrailerPageModule)
  },
  {
    path: 'cargar-camioneta',
    loadChildren: () => import('./pages/cargar-camioneta/cargar-camioneta.module').then( m => m.CargarCamionetaPageModule)
  },
  {
    path: 'scaner',
    loadChildren: () => import('./pages/scaner/scaner.module').then( m => m.ScanerPageModule)
  },
  {
    path: 'paquete',
    loadChildren: () => import('./pages/paquete/paquete.module').then( m => m.PaquetePageModule)
  },
  {
    path: 'paquete-lote',
    loadChildren: () => import('./pages/paquete-lote/paquete-lote.module').then( m => m.PaqueteLotePageModule)
  },
  {
    path: 'entregar-paquetes',
    loadChildren: () => import('./pages/entregar-paquetes/entregar-paquetes.module').then( m => m.EntregarPaquetesPageModule)
  },
  {
    path: 'captura-envio',
    loadChildren: () => import('./pages/captura-envio/captura-envio.module').then( m => m.CapturaEnvioPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
