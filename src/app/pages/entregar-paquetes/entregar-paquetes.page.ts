import { Component, OnInit } from '@angular/core';
import { PopoverController, AlertController } from '@ionic/angular';
import { Entregas } from '../../interfaces/interface';
import { EntregaService } from '../../services/entrega.service';
import { MiniLoginComponent } from '../../components/mini-login/mini-login.component';
import { isNullOrUndefined } from 'util';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'app-entregar-paquetes',
  templateUrl: './entregar-paquetes.page.html',
  styleUrls: ['./entregar-paquetes.page.scss'],
})
export class EntregarPaquetesPage {
  messages: any[] = [];
  traking: string[] = [];
  sucursal: Entregas = {};

  constructor( public entrega: EntregaService,
               public popctrl: PopoverController,
               private alertctrl: AlertController,
               private local: LocalService,
               private barcode: BarcodeScanner) {
                this.entrega.cargarfavoritos();
   }

  async Actualizar(){
    const popover = await this.popctrl.create({
      component: MiniLoginComponent,
    });
    popover.style.cssText = '--min-width: 90%;';
    await popover.present();
    const data = await popover.onDidDismiss();
    // tslint:disable-next-line: deprecation
    if (isNullOrUndefined(data.data)){
    }else{
     this.local.presentLoading('Actualizado');
     const jsonobject = {
       token: data.data.token,
      sucursales: this.entrega.ArrayProductos
     };
     this.entrega.actualizarSucursal(jsonobject).subscribe(resp => {
       this.local.detenerloadding();
       this.messages = resp.message;
       this.entrega.borrarnoticia();
       setTimeout(() => {
        this.entrega.cargarfavoritos();
       }, 1000);
     }, (error) => {
       this.local.detenerloadding();
       this.local.presentAlert('Algo salio mal intenta de nuevo');
     });
    }
  }

  escanear(){
    this.barcode.scan().then(async barcodeData => {
      if (!barcodeData.cancelled) {
        const alert = await this.alertctrl.create({
          backdropDismiss: false,
          header: 'Alerta',
          subHeader: '¿Escanear Paquetes?',
          buttons: [
             {
              text: 'Ok',
              handler: () => {
                this.sucursal.sucursal_id = Number(barcodeData.text);
                this.escanerPaquetes();
              }
            } ,
            {
              text: 'Cancelar',
              handler: () => {
                alert.dismiss();
              }
            }
          ]
        });
        await alert.present();
      }else {}
    }).catch(err => {
    });
  }
  escanerPaquetes(){
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
                this.traking.push(barcodeData.text);
                this.escanerPaquetes();
              }
            },
            {
              text: 'Terminar',
              handler: () => {
                this.traking.push(barcodeData.text);
                this.sucursal.paquete_array = this.traking;
                this.entrega.guardarnoticia(this.sucursal);
                setTimeout(() => {
                  this.entrega.cargarfavoritos();
                 }, 1000);
              }
            }
          ]
        });
        await alert.present();
      } else {}
    }).catch(err => {
    });
  }
}
