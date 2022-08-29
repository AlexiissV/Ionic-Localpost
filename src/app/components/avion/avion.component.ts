import { Component, OnInit, Input } from '@angular/core';
import { Paquete, Usuario } from '../../interfaces/interface';
import { PopoverController } from '@ionic/angular';
import { LocalService } from '../../services/local.service';
import { PostService } from '../../services/post.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-avion',
  templateUrl: './avion.component.html',
  styleUrls: ['./avion.component.scss'],
})
export class AvionComponent {
  @Input() Paquete: Paquete = {};
  peso: number;
  usuario: Usuario = {};


  constructor(private popctrl: PopoverController,
              private local: LocalService,
              private posts: PostService,
              private auth: AuthService) {
                this.usuario = this.auth.Usuario; }

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
