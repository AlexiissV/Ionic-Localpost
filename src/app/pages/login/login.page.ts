import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LocalService } from '../../services/local.service';
import { AuthService } from '../../services/auth.service';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginuser = {
    username: '',
    password: ''
  };
  si: boolean = false;

  swiper0pts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };
  constructor(private local: LocalService,
              private auth: AuthService,
              private navctrl: NavController) { }

  ngOnInit() {    
  }
  cambio(event){
    if(this.si){
      environment.url = 'https://partners.localpost.com.mx/web/v1';
    }else{
      environment.url = 'https://admin.localpost.com.mx/web/v1';

    }
  }
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
            this.local.presentToast(`Bienvenido ${data.data.nombre}`);
            this.auth.Usuario = data.data;
            this.navctrl.navigateRoot('/menu');
          }
        }, (error) => {
          this.local.detenerloadding();
          this.local.presentToast('error al conectar con el servidor,intenta nuevamente');
          }
          );
    }
    }
}
