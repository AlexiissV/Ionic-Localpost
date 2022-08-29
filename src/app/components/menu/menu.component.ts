import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Componente, Paquete } from '../../interfaces/interface';
import { AuthService } from '../../services/auth.service';
import { AlertController, NavController, PopoverController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { LocalService } from '../../services/local.service';
import { PostService } from '../../services/post.service';
import { PopoverinfoComponent } from '../popoverinfo/popoverinfo.component';
import { FilaComponent } from '../fila/fila.component';
import { AvionComponent } from '../avion/avion.component';
import { TulcingoComponent } from '../tulcingo/tulcingo.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu2',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  paquete: Paquete;
  darkMode: boolean = true;

  menucomponet: Observable<Componente[]>;

  constructor(public auth: AuthService,
              private Alertctrl: AlertController,
              private local: LocalService,
              public popctrl: PopoverController,
              private barcode: BarcodeScanner,
              private posts: PostService,
              private Navctrl: NavController) { 
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
                this.darkMode = prefersDark.matches;
              }

  async cerrar() {
    const alert = await this.Alertctrl.create({
      backdropDismiss: false,
      mode: 'ios',
      header: 'Sesión',
      subHeader: 'Esta seguro de cerrar su sesión',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        },
         {
          text: 'Salir',
          cssClass: 'primary',
          handler: () => {
            environment.url = 'https://admin.localpost.com.mx/web/v1';
            this.Navctrl.navigateRoot('/home');
          }
        }
      ]
    });
    await alert.present();
     }

     entregarpaquete() {
      this.barcode.scan().then(barcodeData => {
        if (!barcodeData.cancelled) {

        this.obtenerpaquete(barcodeData.text);
        }else{}
      }).catch(err => {
    });
    }

    obtenerpaquete(folio: string) {
      this.local.presentLoading('Cargando..!');
      this.posts.ObtenerPaquete(folio)
      .subscribe(
        (data) => {
          if (data.type === 'Warning') {
            this.local.detenerloadding();
            this.local.presentAlert('error en el folio: ' + data.data);
          } else {
            this.paquete = data.data;
            this.local.detenerloadding();
            this.presentpopover();
          }
        }, (error) => {
          this.local.detenerloadding();
          this.local.presentAlert('algo salio mal, intenta nuevamente');
        }
        );
    }
    async presentpopover(){
      const popover = await this.popctrl.create({
        component: PopoverinfoComponent,
        backdropDismiss: false,
        componentProps: {
          Paquete: this.paquete
        }
      });
      popover.style.cssText = '--min-width: 90%;';
      await popover.present();
    }

decargarTrailer(){
  this.barcode.scan().then(barcodeData => {
    if (!barcodeData.cancelled) {
      this.local.presentLoading('Cargando...');
      this.posts.ObtenerPaquete(barcodeData.text).subscribe(
        (data) => {
          if (data.type === 'Warning') {
            this.local.detenerloadding();
            this.local.presentAlert('error en el folio: ' + data.data);
          } else {
           /* if(data.data.fila == null) {
              this.local.detenerloadding();
              this.local.presentAlert('este paquete no tiene fila');
            }*/
              this.paquete = data.data;
              this.local.detenerloadding();
              this.mostrarFila();
            
          }
        }, (error) => {
          this.local.detenerloadding();
          this.local.presentAlert('algo salio mal, intenta nuevamente');
        }
      );
     }else{}
  }).catch(err => {
});
}

  async mostrarFila(){
  const popover = await this.popctrl.create({
    component: FilaComponent,
    backdropDismiss: false,
    componentProps: {
      Paquete: this.paquete
    }
  });
  popover.style.cssText = '--min-width: 90%;';
  await popover.present();
}

/*descargarAvion(){
  this.barcode.scan().then(barcodeData => {
    if (!barcodeData.cancelled) {
      this.local.presentLoading('Cargando..');
      this.posts.ObtenerPaquete(barcodeData.text).subscribe(
        (data) => {
          if (data.type === 'Warning') {
            this.local.detenerloadding();
            this.local.presentToast('' + data.data);
          } else {
            if(data.data.bodega_descarga != this.auth.Usuario.bodega_descarga){
              this.local.detenerloadding();
              this.local.presentAlert('Este paquete que no pertenece a su bodega \n' +
              `Pertenece a ${data.data.bodega_descarga_text}` );
              return;
            }
              this.paquete = data.data;
              this.local.detenerloadding();
              this.mostrarAvoion();
          }
        }, (error) => {
          this.local.detenerloadding();
          this.local.presentAlert('algo salio mal, intenta nuevamente');
        }
      );
    }else{}
  }).catch(err => {
});
}*/
  async mostrarAvoion(){
  const popover = await this.popctrl.create({
    component: AvionComponent,
    backdropDismiss: false,
    componentProps: {
      Paquete: this.paquete
    }
  });
  popover.style.cssText = '--min-width: 90%;';
  await popover.present();
}

/*tulcingo(){
  this.barcode.scan().then(barcodeData => {
    if (!barcodeData.cancelled) {
      this.local.presentLoading('Cargando..');
      this.posts.ObtenerPaquete(barcodeData.text).subscribe(
        (data) => {
          if (data.type === 'Warning') {
            this.local.detenerloadding();
            this.local.presentAlert(' ' + data.data);
          } else {
            if(data.data.fila == null) {
              this.local.detenerloadding();
              this.local.presentAlert('este paquete no tiene fila');
            }
              this.paquete = data.data;
              this.local.detenerloadding();
              this.mostrartulcingo();
            }
        }, (error) => {
          this.local.detenerloadding();
          this.local.presentAlert('algo salio mal, intenta nuevamente');
        }
      );
    }else{}
  });
}*/
async mostrartulcingo(){
  const popover = await this.popctrl.create({
    component: TulcingoComponent,
    backdropDismiss: false,
    componentProps: {
      Paquete: this.paquete
    }
  });
  popover.style.cssText = '--min-width: 90%;';
  await popover.present();
}

cambio(event) {
  if (event.detail.checked){
      document.body.setAttribute('color-theme', 'dark');
  }else{
    document.body.setAttribute('color-theme', 'light');
  }
}
}
