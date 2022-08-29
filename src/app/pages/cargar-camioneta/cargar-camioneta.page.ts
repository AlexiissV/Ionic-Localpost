import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { PostService } from '../../services/post.service';
import { NavController, AlertController } from '@ionic/angular';
import { Camioneta } from '../../interfaces/interface';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-cargar-camioneta',
  templateUrl: './cargar-camioneta.page.html',
  styleUrls: ['./cargar-camioneta.page.scss'],
})
export class CargarCamionetaPage implements OnInit {
  camionetas: Camioneta[] = [];
  id: string;

  constructor(private local: LocalService,
              private post: PostService,
              private alertctrl: AlertController,
              private barcode: BarcodeScanner,
              private navctrl: NavController) { }

  ngOnInit() {
    this.local.presentLoading('Cargando..!');
    this.post.obtenerrepartos()
    .subscribe(
      (data) => {
        if (data.message.length < 1) {
          this.navctrl.navigateBack('/menu');
          this.local.detenerloadding();
          this.local.presentToast('no hay camionetas');
        } else {
          this.local.detenerloadding();
          this.camionetas = data.message;
        }
      }
    );
  }

  onid(id){
    this.id = id;
    this.cargarcamioneta(this.id);
  }

  cargarcamioneta(id: string) {
    this.barcode.scan().then(async barcodeData => {
      if (!barcodeData.cancelled) {
        this.presentAlertConfirm(barcodeData.text, id);
      }else {}
    }).catch(err => {
    });
  }
  async presentAlertConfirm(foilio: string, id: string) {
    const alert = await this.alertctrl.create({
      header: foilio,
      backdropDismiss: false,
      mode:'ios',
      inputs: [
        {
          name: 'peso',
          type: 'number',
          placeholder: 'Peso del paquete'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary ion-button',
          handler: (blah) => {
            alert.dismiss();
          }
        }, {
          text: 'siguiente',
          handler: (aldata) => {
            if (aldata.peso < 1) {
              this.local.presentToast('falta el peso');
            } else {
              this.local.presentLoading('Cargando..!');
              this.post.cargarcamioneta(foilio, id, aldata.peso)
              .subscribe(data => {
                this.local.detenerloadding();
                this.presentAlert(data.message[0].message);
              });
            }
          }
        }
      ]
    });

    await alert.present();
  }
  async presentAlert(message: string ) {
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
            this.cargarcamioneta(this.id);
          }
        }
      ]
    });

    await alert.present();
  }
}
