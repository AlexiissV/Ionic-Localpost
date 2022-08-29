import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LocalService } from '../../services/local.service';
import { AuthService } from '../../services/auth.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-mini-login',
  templateUrl: './mini-login.component.html',
  styleUrls: ['./mini-login.component.scss'],
})
export class MiniLoginComponent {
  loginuser = {
    username: '',
    password: ''
  };

  constructor(private local: LocalService,
              private auth: AuthService,
              public popctrl: PopoverController) { }

  login( flogin: NgForm ) {
    if (flogin.invalid) {
       this.local.presentToast('campos vacios');
       return;
    } else {
      this.local.presentLoading('Validando credenciales..!');
      this.auth.login(this.loginuser)
      .subscribe(
        (data) => {
          this.local.detenerloadding();
          if (data.data == null) {
              this.local.presentAlert(data.message);
          } else {
            // aqui va la salida 
            this.popctrl.dismiss(data.data);
          }
        }, (error) => {
          this.local.detenerloadding();
          this.local.presentToast('error al conectar con el servidor,intenta nuevamente');
          }
          );
    }
    }
}
