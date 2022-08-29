import { Component, Input, OnInit } from '@angular/core';
import { Paquete, Usuario } from '../../interfaces/interface';
import { AuthService } from '../../services/auth.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-tulcingo',
  templateUrl: './tulcingo.component.html',
  styleUrls: ['./tulcingo.component.scss'],
})
export class TulcingoComponent {
  @Input() Paquete: Paquete = {};
  usuario: Usuario ={};

  constructor(public auth: AuthService,
              private popctrl: PopoverController) { 
              this.usuario= auth.Usuario;    
  }

  cancelar(){
    this.popctrl.dismiss();
  }
}
