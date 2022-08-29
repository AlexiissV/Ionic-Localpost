import { Injectable } from '@angular/core';
import { Entregas, RestMensaje } from '../interfaces/interface';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EntregaService {
  ArrayProductos: Entregas[] = [];

  constructor(private storage: Storage,
              private http: HttpClient) { }

  guardarnoticia(producto: Entregas) {
    /*const existe = this.ArrayProductos.find(noti => noti.sucursal_id === producto.sucursal_id );
    if (!existe) {
    this.ArrayProductos.unshift(producto);
    this.storage.set('favoritos', this.ArrayProductos );
    }*/
    this.ArrayProductos.unshift(producto);
    this.storage.set('favoritos', this.ArrayProductos );

  }

  async cargarfavoritos() {
    const favoritos = await this.storage.get('favoritos');
    if (favoritos) {
        this.ArrayProductos = favoritos;
    }
  }

  borrarnoticia() {
    this.ArrayProductos = [];
    this.storage.set('favoritos', this.ArrayProductos );
  }
  actualizarSucursal(jsonobject: any){
    const url = environment.url;
    return this.http.post<RestMensaje >(`${url}/paquete-lote/movimiento-entrega-paquete`, jsonobject, {});
  }
}
