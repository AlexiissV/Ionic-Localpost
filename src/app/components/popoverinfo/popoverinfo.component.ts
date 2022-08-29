import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PostService } from 'src/app/services/post.service';
import { Paquete } from '../../interfaces/interface';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'app-popoverinfo',
  templateUrl: './popoverinfo.component.html',
  styleUrls: ['./popoverinfo.component.scss'],
})
export class PopoverinfoComponent{
@Input() Paquete: Paquete = {};
  constructor(private popctrl: PopoverController,
              private local: LocalService,
              private posts: PostService) { }

  cancelar() {
    this.popctrl.dismiss({mensaje: ''});

  }
  realizarmovimiento() {
    this.local.presentLoading('Cargando');
    this.posts.realizarmovimiento(this.Paquete.id, this.Paquete.tracked, '60', this.Paquete.tipo_envio)
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
