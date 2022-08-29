import { Component, Input, OnInit } from '@angular/core';
import { Paquete } from 'src/app/interfaces/interface';
import { PostService } from '../../services/post.service';
import { LocalService } from '../../services/local.service';
import { AuthService } from 'src/app/services/auth.service';
import { Sucursalmx, Camioneta } from '../../interfaces/interface';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-paquete',
  templateUrl: './paquete.page.html',
  styleUrls: ['./paquete.page.scss'],
})
export class PaquetePage implements OnInit {
  @Input() paquete: Paquete;
  sucrsals: any;
  viajes: any;
  selecioin= 0;
  selecioin1= 0;
  status: string;
  viaje: string;
  mx: Camioneta[]=[];
  bodegas: Camioneta[]=[];
  idmx: number;
  bodegaid: number;
  paqueteria: string ='';
  Nguia: string = '';

  constructor(private post: PostService,
              private auth: AuthService,
              private Alertctrl: AlertController,
              private local: LocalService) { }

  ngOnInit() {
    this.local.presentLoading('Cargando..!');
    this.post.ObtenerEstatus()
    .subscribe(
      (data) => {
        this.local.detenerloadding();
        this.sucrsals = data.message;
      });
  }
  OnChange(event) {
    this.status = event.target.value;
    switch (this.status) {
      case'1':
      this.viaje = null;
      this.idmx= null;
      this.bodegaid= null;
      this.mx= [];
      this.paqueteria='';
      this.Nguia='';
      break;
      case'2':
      this.viaje = null;
      this.idmx= null;
      this.bodegaid= null;
      this.mx= [];
      this.paqueteria='';
      this.Nguia='';
      break;
      case '10':
        this.viaje = null;
        this.idmx= null;
        this.bodegaid= null;
        this.mx= [];
        this.paqueteria='';
        this.Nguia='';
        break;
      case '20':
        this.mx= [];
        this.paqueteria='';
        this.bodegaid= null;
        this.idmx= null;
        this.Nguia='';
        this.post.getviaje( this.paquete.tracked)
        .subscribe( data => {
          if (data.message.length === 0){
            this.local.presentAlert('no hay viajes disponibles');
          }
          this.viajes = data.message;
        });
        this.viaje = this.selecioin1.toString();
        break;
      case '30':
        this.viaje = null;
        this.idmx= null;
        this.bodegaid= null;
        this.mx= [];
        this.paqueteria='';
        this.Nguia='';
        this.local.presentLoading('Cargando..!');
        this.post.getbodegasmx().subscribe(resp =>{
          this.local.detenerloadding();
          this.bodegas = resp.bodega;
        });
        break;
      case '40':
        this.viaje = null;
        this.idmx= null;
        this.bodegaid= null;
        this.mx= [];
        this.paqueteria='';
        this.Nguia='';
        break;
        case '45':
          this.viaje = null;
          this.idmx= null;
          this.bodegaid= null;
          this.paqueteria='';
          this.Nguia='';
          break;
      case '50':
        this.viaje = null;
        this.idmx= null;
        this.bodegaid= null;
        this.mx= [];
        this.paqueteria='';
        this.Nguia='';
        break;
        case '55':
        this.viaje = null;
        this.idmx= null;
        this.bodegaid= null;
        this.mx= [];
        this.paqueteria='';
        this.Nguia='';
        // lo de las sucursales mx
        this.local.presentLoading('Cargando..!');
        this.post.getsucursalesmx().subscribe(resp => {
          this.local.detenerloadding();
          this.mx = resp.sucursal
        });
        break;
      case '60':
        this.viaje = null;
        this.idmx= null;
        this.bodegaid= null;
        this.mx= [];
        this.paqueteria='';
        this.Nguia='';
        break;
      default:
        this.viaje = null;
        this.idmx= null;
        this.bodegaid= null;
        this.mx= [];
        this.paqueteria='';
        this.Nguia='';
        break;
    }

  }
  OnChange2(event) {
    this.viaje = event.target.value;
  }
  sucursalmx(event){
  this.idmx = event.target.value;
  
  }
  bodegamx(event){
    this.bodegaid = event.target.value;

  }

  async validarcampos() {
    if (this.status != null) {
      switch(this.status){
        case '20':
          if (this.viaje != null) {
            this.conviaje();
          } else {
            this.local.presentToast('seleciona un viaje');
          }
          break;
        case '30':
          if(this.bodegaid == null){
            this.local.presentToast('campos requeridos');
            return;
          }
          this.cambiobodegamx();
          break;
            case '45':
              if(this.paqueteria.length==0 || this.Nguia.length ==0){
                this.local.presentToast('campos incompletos');
              }else{
                this.cambioconpaqueteria();
              }
              break;
        case '55':
          if(this.idmx == null){
            this.local.presentToast('campos requeridos');
          }else{
            this.consucursalmx();
          }
          break;
          default:
             this.local.presentLoading('Cargando..!');
            this.post.realizarmovimiento(this.paquete.id, this.paquete.tracked, this.status, this.paquete.tipo_envio)
            .subscribe ( data => {
              this.local.detenerloadding();
              this.local.presentAlert(data.message);
            });
          break;
      }
    } else {
      this.local.presentToast('falta estatus');
    }
  }
  cambiobodegamx(){
    this.local.presentLoading('Cargando..!');
    this.post.realizarmovimientoconbodegamx(this.paquete.id, this.paquete.tracked,this.status, this.paquete.tipo_envio,Number(this.bodegaid))
    .subscribe(data => {
      this.local.detenerloadding();
      this.local.presentAlert(data.message);
    });
  }

  cambioconpaqueteria() {
        this.local.presentLoading('Cargando..!');
        this.post.realizarmovimientoconpaqueteria(this.paquete.id, this.paquete.tracked, this.status, this.paquete.tipo_envio,this.paqueteria, this.Nguia)
        .subscribe(data => {
          this.local.detenerloadding();
          this.local.presentAlert(data.message);
        });

  }
  conviaje() {
    this.local.presentLoading('Cargando..!');
    this.post.movimientoconviaje(this.paquete.id, this.paquete.tracked, this.status, this.paquete.tipo_envio, this.viaje)
    .subscribe(data => {
      this.local.detenerloadding();
      this.local.presentAlert(data.message);
    });
  }
  consucursalmx(){
     this.local.presentLoading('Cargando..!');
    this.post.realizarmovimientoconsucursalmx(this.paquete.id, this.paquete.tracked, this.status, this.paquete.tipo_envio,Number(this.idmx))
    .subscribe(data => {
      this.local.detenerloadding();
      this.local.presentAlert(data.message);
    });
  }
}
