import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Paquete } from 'src/app/interfaces/interface';
import { PostService } from 'src/app/services/post.service';
import { LocalService } from '../../services/local.service';
import { Usuario } from '../../interfaces/interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-fila',
  templateUrl: './fila.component.html',
  styleUrls: ['./fila.component.scss'],
})
export class FilaComponent {
  @Input() Paquete: Paquete = {};
  usuario: Usuario = {};
    peso: number;

  constructor(private popctrl: PopoverController,
              private local: LocalService,
              private auth: AuthService,
              private posts: PostService) {
                this.usuario = this.auth.Usuario;
               }

  cancelar() {
    this.popctrl.dismiss({mensaje: ''});

  }
  realizarmovimiento() {
    if (this.peso === 0 || this.peso === undefined){
      this.local.presentToast('falta el peso');
      return;
    }
    this.local.presentLoading('Cargando');
    this.posts.descargarTrailer(this.Paquete.id, this.Paquete.tracked, '30', this.Paquete.tipo_envio, this.peso)
    .subscribe(
      ( data1 ) => {
        this.local.detenerloadding();
        this.popctrl.dismiss({mensaje: ''});
        this.local.presentAlert(data1.message);
      }, (err) => {
        this.local.detenerloadding();
        this.popctrl.dismiss({mensaje: ''});
        this.local.presentAlert('algo salio mal, intenta nuevamente');
      }
    );
  }
}
