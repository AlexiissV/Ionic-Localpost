import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { NavController, AlertController } from '@ionic/angular';
import { LocalService } from '../../services/local.service';
import { Camioneta } from '../../interfaces/interface';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-cargar-trailer',
  templateUrl: './cargar-trailer.page.html',
  styleUrls: ['./cargar-trailer.page.scss'],
})
export class CargarTrailerPage implements OnInit {
  trailers: Camioneta[] = [];
  id: string;

  constructor(private post: PostService,
              private local: LocalService,
              private barcode: BarcodeScanner,
              private alertctrl: AlertController,
              private navctrl: NavController) { }

  async ngOnInit() {
   await this.local.presentLoading('Cargando..!');
    this.post.ObtenerViajes(10)
    .subscribe(
      async (data) => {
        if (data.message.length < 1) {
         await this.local.detenerloadding();
          this.navctrl.navigateBack('/menu');
          this.local.presentToast('No hay trailer disponibles');
        } else {
         await this.local.detenerloadding();
          this.trailers = data.message;
        }
      },
      async (error) => {
       await this.local.detenerloadding();
        this.local.presentToast('Algo salio mal, intenta nuevamente');
      }
    );
  }
  onid(id){
    this.id = id;
    this.cargartrailer(id);
  }
  cargartrailer(id: string) {
    this.barcode.scan().then(async barcodeData => {
      if (!barcodeData.cancelled) {
       await this.local.presentLoading('Cargando..!');
        this.post.cargartrailer('20', [barcodeData.text], id)
        .subscribe( data1 => {
           this.presentAlert(data1.message[0].message);
          }
        );
      }else {}
    }).catch(err => {
    });
}
async presentAlert(message: string) {
  const alert = await this.alertctrl.create({
    header: message,
    backdropDismiss: false,
    mode: 'ios',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary ion-button',
        handler: (blah) => {
          alert.dismiss();
        }
      },
     {
        text: 'siguiente',
        handler: () => {
          this.cargartrailer(this.id);
        }
      }
    ]
  });
  this.local.detenerloadding();
  await alert.present();
}

}
