import { Component, Input, OnInit } from '@angular/core';
import { Camioneta } from 'src/app/interfaces/interface';
import { LocalService } from 'src/app/services/local.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-paquete-lote',
  templateUrl: './paquete-lote.page.html',
  styleUrls: ['./paquete-lote.page.scss'],
})
export class PaqueteLotePage implements OnInit {
  @Input() folios: string[] = [];
  sucrsals: any;
  viaje: string;
  viajes: any[] = [];
  selecioin1= 0;
  selecioin= 0;
  status: string;
  messages: any[] = [];
  mx: Camioneta[];
  idmx: number;
  paqueteria: string ='';
  Nguia: string = '';
  bodegas: Camioneta[]=[];
  bodegaid: number;


  constructor(public local: LocalService,
              private post: PostService) { }

  ngOnInit() {
    this.local.presentLoading('Cargando..!');
    this.post.ObtenerEstatus()
    .subscribe(
      (data) => {
        this.sucrsals = data.message;
        this.local.detenerloadding();
      });
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
  OnChange(event) {
    this.status = event.target.value;
    switch (this.status) {
      case'1':
      this.viaje = null;
      this.idmx= null;
      this.bodegaid = null;
      this.mx= [];
      this.paqueteria='';
      this.Nguia='';
      break;
      case'2':
      this.viaje = null;
      this.idmx= null;
      this.bodegaid = null;
      this.mx= [];
      this.paqueteria='';
      this.Nguia='';
      break;
      case '10':
        this.viaje = null;
        this.idmx= null;
        this.bodegaid = null;
        this.mx= [];
        this.paqueteria='';
        this.Nguia='';
        break;
      case '20':
        this.mx= [];
        this.paqueteria='';
        this.bodegaid = null;
        this.idmx= null;
        this.Nguia='';
        this.post.ObtenerViajes(10)
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
        this.bodegaid = null;
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
        this.bodegaid = null;
        this.mx= [];
        this.paqueteria='';
        this.Nguia='';
        break;
        case '45':
          this.viaje = null;
          this.idmx= null;
          this.bodegaid = null;
          this.paqueteria='';
          this.Nguia='';
          break;
      case '50':
        this.viaje = null;
        this.idmx= null;
        this.bodegaid = null;
        this.mx= [];
        this.paqueteria='';
        this.Nguia='';
        break;
        case '55':
        this.viaje = null;
        this.idmx= null;
        this.bodegaid = null;
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
        this.bodegaid = null;
        this.mx= [];
        this.paqueteria='';
        this.Nguia='';
        break;
      default:
        this.viaje = null;
        this.idmx= null;
        this.bodegaid = null;
        this.mx= [];
        this.paqueteria='';
        this.Nguia='';
        break;
    }
}
validarcampos() {
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
          this.post.movimientoMex(this.status, this.folios)
          .subscribe( data => {
            this.local.detenerloadding();
            this.messages = data.message;
          });
          break;
      }
    }else{
      this.local.presentToast('falta estatus');
    }

}
conviaje() {
  this.local.presentLoading('Cargando..!');
  this.post.movimientoLoteViaje( this.status, this.folios, this.viaje)
  .subscribe (data => {
    this.local.detenerloadding();
    this.messages = data.message;
  });
}
cambioconpaqueteria(){
  this.local.presentLoading('Cargando..!');
  this.post.movimientoLotepaqueteria( this.status, this.folios,this.paqueteria,this.Nguia)
  .subscribe (data => {
    this.local.detenerloadding();
    this.messages = data.message;
  });
}
consucursalmx(){
  this.local.presentLoading('Cargando..!');
  this.post.movimientoLotesucursalmx( this.status, this.folios,this.idmx)
  .subscribe (data => {
    this.local.detenerloadding();
    this.messages = data.message;
  });
}
cambiobodegamx(){
  this.local.presentLoading('Cargando..!');
  this.post.movimientoLotebodegamx( this.status, this.folios,Number(this.bodegaid))
  .subscribe (data => {
    this.local.detenerloadding();
    this.messages = data.message;
  });
}
}
