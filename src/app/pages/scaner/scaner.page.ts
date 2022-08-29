import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { PostService } from '../../services/post.service';
import { LocalService } from '../../services/local.service';
import { Paquete } from '../../interfaces/interface';
import { AlertController, ModalController } from '@ionic/angular';
import { PaquetePage } from '../paquete/paquete.page';
import { PaqueteLotePage } from '../paquete-lote/paquete-lote.page';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-scaner',
  templateUrl: './scaner.page.html',
  styleUrls: ['./scaner.page.scss'],
})
export class ScanerPage {
  paquete: Paquete = {};
  folios: string[] = [];
  constructor(
              private barcode: BarcodeScanner,
              private posts: PostService,
              private local: LocalService,
              private alertctrl: AlertController,
              private modalctrl: ModalController) { }

  scanerone() {
    this.barcode.scan().then(barcodeData => {
      if (!barcodeData.cancelled) {
        this.local.presentLoading('Cargando..!');
        this.posts.ObtenerPaquete(barcodeData.text).subscribe(
          (data) => {
            console.log(data);
            
            if (data.type === 'Warning') {
              this.local.detenerloadding();
              this.local.presentToast(data.data+'');
            } else {
                this.paquete = data.data;
                this.local.detenerloadding();
                this.Abrirpaquete();
            }
          }, (error) => {
            console.log(error);
            this.local.detenerloadding();
            this.local.presentAlert('algo salio mal, intenta nuevamente');
          }
        );
      }else{}
    }).catch(err => {
    });
  }
  async Abrirpaquete(){
    const paquete = await this.modalctrl.create({
      component: PaquetePage,
      componentProps: {
        paquete: this.paquete
      }
    });
    await paquete.present();

  }

  scanerlote() {
    this.barcode.scan().then(async barcodeData => {
      if (!barcodeData.cancelled) {
        const alert = await this.alertctrl.create({
          backdropDismiss: false,
          header: 'Alerta',
          subHeader: '¿Escanear otro paquete?',
          buttons: [
             {
              text: 'Ok',
              handler: () => {
                this.folios.push(barcodeData.text);
                this.scanerlote();
              }
            },
            {
              text: 'Terminar',
              handler: () => {
                this.folios.push(barcodeData.text);
                this.Abrirlote();
              }
            }
          ]
        });
        await alert.present();
      }

    }).catch(err => {
    });
  }
  async Abrirlote(){
    const paquetelote = await this.modalctrl.create({
      component: PaqueteLotePage,
      componentProps: {
        folios: this.folios      }
    });
    await paquetelote.present();
    const {data } = await paquetelote.onDidDismiss();
    // tslint:disable-next-line: deprecation
    if ( isNullOrUndefined(data)){
      this.folios = [];
}
  }
}
