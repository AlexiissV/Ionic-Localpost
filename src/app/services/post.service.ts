import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Bodegamx, Movimiento, Reparto, RestMensaje, RestPaquete, RestSucursal, Sucursalmx } from '../interfaces/interface';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  data = {};

  constructor(private http: HttpClient,
              private auth: AuthService) { }

  ObtenerPaquete(tracked: string ) {
    const url = environment.url;
    //https://admin.localpost.com.mx/web/v1/paquete/get-lax-tierra
    const data = {token: this.auth.Usuario.token, tracked};
    return this.http.post<RestPaquete>(`${url}/paquete/get-lax-tierra`, data, {});
    }

    // tslint:disable-next-line: variable-name
    realizarmovimiento( paquete_id: number, tracked_movimiento: string, tipo_movimiento: string, tipo_envio: number ) {
   const data = {
     token: this.auth.Usuario.token,
     paquete_id, 
     tracked_movimiento, 
     tipo_movimiento, 
     tipo_envio };
     const url = environment.url;

    return this.http.post<Movimiento>(`${url}/paquete/movimiento-lax-tierra-mex`, data, {});
   }
   // tslint:disable-next-line: variable-name
   descargarTrailer(paquete_id: number, tracked_movimiento: string, tipo_movimiento: string, tipo_envio: number, peso_mx: number){
    const data = {token: this.auth.Usuario.token, paquete_id, tracked_movimiento, tipo_movimiento, tipo_envio, peso_mx };
    const url = environment.url;    
    return this.http.post<Movimiento>(`${url}/paquete/movimiento-lax-tierra-mex`, data, {});
   }
   // tslint:disable-next-line: variable-name
ObtenerViajes( tipo_envio: number) {
  const data = {token: this.auth.Usuario.token, tipo_envio };
  const url = environment.url;
  return this.http.post<Reparto>(`${url}/paquete-lote/get-viaje-lote`, data, {});
  }
  getviaje(tracked: string){
    const url = environment.url;
    const data = {token: this.auth.Usuario.token, tracked};

    // http://express.lerco.agency/web/v1/paquete/get-viaje
    return this.http.post<Reparto>(`${url}/paquete/get-viaje`, data, {});
  }

  obtenerrepartos() {
    const data = {token: this.auth.Usuario.token};
    const url = environment.url;

    return this.http.post<Reparto>(`${url}/reparto/reparto-unidades`, data, {});
    }

    ObtenerEstatus() {
      const data = {token: this.auth.Usuario.token};
      const url = environment.url;

      return this.http.post<RestSucursal>(`${url}/paquete/estatus-lax-tierra`, data, {});
      }
        // tslint:disable-next-line: variable-name
      movimientoconviaje(paquete_id: number, tracked_movimiento: string, tipo_movimiento: string,
        // tslint:disable-next-line: variable-name
        tipo_envio: number, viaje_tierra: string) {
         switch (tipo_envio) {
           case 10:
             // tslint:disable-next-line: max-line-length
             this.data = { token: this.auth.Usuario.token , paquete_id, tracked_movimiento, tipo_movimiento, tipo_envio, viaje_tierra_id: viaje_tierra};
             break;
           case 20:
             // tslint:disable-next-line: max-line-length
             this.data = { token: this.auth.Usuario.token , paquete_id, tracked_movimiento, tipo_movimiento, tipo_envio, viaje_lax_id: viaje_tierra};
             break;
           case 30:
             // tslint:disable-next-line: max-line-length
             this.data = { token: this.auth.Usuario.token , paquete_id, tracked_movimiento, tipo_movimiento, tipo_envio, viaje_mex_id: viaje_tierra};
             break;
           default:
             break;             
       }
       const url = environment.url;

         return this.http.post<Movimiento>(`${url}/paquete/movimiento-lax-tierra-mex`, this.data, {});
     }
     // tslint:disable-next-line: variable-name
     movimientoMex(movimiento: string, tracked_movimiento_array: string[]) {
      const data = {token: this.auth.Usuario.token, tipo_movimiento: movimiento, tracked_movimiento_array};
      const url = environment.url;

       return this.http.post<RestMensaje >(`${url}/paquete-lote/movimiento-lote-lax-tierra-mex`, data, {});
    }
         // tslint:disable-next-line: variable-name
    movimientoLoteViaje(movimiento: string, tracked_movimiento_array: string[], viaje: string) {
      const data = {token: this.auth.Usuario.token, tipo_movimiento: movimiento, tracked_movimiento_array, viaje_tierra_id: viaje};
      const url = environment.url;

      return this.http.post<RestMensaje >(`${url}/paquete-lote/movimiento-lote-lax-tierra-mex`, data, {});
    }
    movimientoLotepaqueteria(movimiento: string, tracked_movimiento_array: string[],  paqueteria: string, paqueteria_no_guia:string) {
      const data = {token: this.auth.Usuario.token, tipo_movimiento: movimiento, tracked_movimiento_array, paqueteria,paqueteria_no_guia};
      const url = environment.url;

      return this.http.post<RestMensaje >(`${url}/paquete-lote/movimiento-lote-lax-tierra-mex`, data, {});
    }
    movimientoLotesucursalmx(movimiento: string, tracked_movimiento_array: string[],sucursal_descarga_id: number) {
      const data = {token: this.auth.Usuario.token, tipo_movimiento: movimiento, tracked_movimiento_array,sucursal_descarga_id };
      const url = environment.url;

      return this.http.post<RestMensaje >(`${url}/paquete-lote/movimiento-lote-lax-tierra-mex`, data, {});
    }
    movimientoLotebodegamx(movimiento: string, tracked_movimiento_array: string[],bodega_descarga_id: number) {
      const data = {token: this.auth.Usuario.token, tipo_movimiento: movimiento, tracked_movimiento_array, bodega_descarga_id };
      
      const url = environment.url;

      return this.http.post<RestMensaje >(`${url}/paquete-lote/movimiento-lote-lax-tierra-mex`, data, {});
    }
    // tslint:disable-next-line: variable-name
    cargarcamioneta(tracked: string, reparto_id: string , peso: string ) {
    const data = { token: this.auth.Usuario.token, tracked, reparto_id, peso };
    const url = environment.url;

    return this.http.post<RestMensaje>(`${url}/reparto/reparto-add-paquete`, data, {});
  // http://cora.paqueterialacora.com/web/v1/reparto/reparto-add-paquete

  }

  // http://cora.paqueterialacora.com/web/v1/paquete-lote/movimiento-lote-lax-tierra-mex
// tslint:disable-next-line: variable-name
cargartrailer(tipo_movimiento: string, tracked_movimiento_array: string[], viaje_tierra_id: string) {
  const data = {token: this.auth.Usuario.token, tipo_movimiento, tracked_movimiento_array, viaje_tierra_id};
  const url = environment.url;

  return this.http.post<RestMensaje>(`${url}/paquete-lote/movimiento-lote-lax-tierra-mex`, data, {});
  }

getsucursalesmx(){
  const url = environment.url;

  return this.http.post<Sucursalmx>(`${url}/paquete/get-sucursal`,{token:this.auth.Usuario.token},{});
}
getbodegasmx(){
  const url = environment.url;

  return this.http.post<Bodegamx>(`${url}/paquete/get-bodega`,{token:this.auth.Usuario.token},{});
}
realizarmovimientoconsucursalmx( paquete_id: number, tracked_movimiento: string, tipo_movimiento: string, tipo_envio: number, sucursal_descarga_id:number ) {
  const data = {token: this.auth.Usuario.token, paquete_id, tracked_movimiento, tipo_movimiento, tipo_envio, sucursal_descarga_id };
  
  const url = environment.url;

   return this.http.post<Movimiento>(`${url}/paquete/movimiento-lax-tierra-mex`, data, {});
  }
  realizarmovimientoconpaqueteria(paquete_id: number, tracked_movimiento: string, tipo_movimiento: string, tipo_envio: number, paqueteria: string, paqueteria_no_guia:string ) {
    const data = {token: this.auth.Usuario.token, paquete_id, tracked_movimiento, tipo_movimiento, tipo_envio, paqueteria, paqueteria_no_guia };
    
    const url = environment.url;

     return this.http.post<Movimiento>(`${url}/paquete/movimiento-lax-tierra-mex`, data, {});
  }
  realizarmovimientoconbodegamx(paquete_id: number, tracked_movimiento: string, tipo_movimiento: string, tipo_envio: number,bodega_descarga_id: number ){
    const data = {token: this.auth.Usuario.token, paquete_id, tracked_movimiento, tipo_movimiento, tipo_envio, bodega_descarga_id };
    const url = environment.url;

    return this.http.post<Movimiento>(`${url}/paquete/movimiento-lax-tierra-mex`, data, {});

  }

}
