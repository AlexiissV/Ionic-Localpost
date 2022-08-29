import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { PopoverinfoComponent } from './popoverinfo/popoverinfo.component';
import { FilaComponent } from './fila/fila.component';
import { FormsModule } from '@angular/forms';
import { AvionComponent } from './avion/avion.component';
import { MiniLoginComponent } from './mini-login/mini-login.component';
import { TulcingoComponent } from './tulcingo/tulcingo.component';



@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    PopoverinfoComponent,
    FilaComponent,
    AvionComponent,
    TulcingoComponent,
    MiniLoginComponent
  ],
  exports: [
    HeaderComponent,
    PopoverinfoComponent,
    MenuComponent,
    FilaComponent,
    TulcingoComponent,
    AvionComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule
  ]
})
export class ComponentsModule { }
