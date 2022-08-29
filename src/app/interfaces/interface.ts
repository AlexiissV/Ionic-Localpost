export interface RespLogin {
  code: number;
  name: string;
  message: string;
  data: Usuario;
  type: string;
}
export interface Componente {
  icon: string;
  name: string;
  redirecTo: string;
  }
export interface Usuario {
  token?: string;
  email?: string;
  username?: string;
  nombre?: string;
  apellidos?: string;
  sexo?: string;
  telefono?: string;
  bodega_descarga?: number;
  bodega_descarga_text?: string;

}
export interface RestPaquete {
  code?: number;
  name?: string;
  data?: Paquete;
  type?: string;
}
export interface Paquete {
  id?: number;
  tracked?: string;
  envio_id?: number;
  tipo_envio?: number;
  destinatario?: string;
  telefono_destinatario?: string;
  direccion_destino?: string;
  cantidad?: number;
  tipo_movimiento?: number;
  tipo_movimiento_text?: string;
  peso?: string;
  comentarios?: string;
}

export interface RestSucursal {
  code: number;
  name: string;
  message: any[];
  type: string;
}
export interface Movimiento {
  code: number;
  name: string;
  message: string;
  type: string;
}
export interface Reparto {
  code: number;
  name: string;
  message: Camioneta[];
  type: string;
}

export interface Camioneta {
  id: number;
  nombre: string;
}
export interface RestMensaje {
  code: number;
  name: string;
  message: Mensaje[];
  type: string;
}
export interface Mensaje {
  tracked: string;
  message: string;
}


export interface RestCaja {
  code?: number;
  name?: string;
  data?: Caja;
  type?: string;
}

export interface Caja {
  id?: number;
  folio?: string;
  nombre?: string;
  nota?: string;
  paquetes?: Paquetecj[];
}

export interface Paquetecj {
  tracked?: string;
  producto?: string;
  categoria?: string;
  piezas?: any;
  peso?: any;
  impuesto?: number;
}

export interface ListCaja {
  code: number;
  name: string;
  message: MessageCaja[];
  type: string;
}

export interface MessageCaja {
  id: number;
  categoria_id: number;
  nombre: string;
  folio: string;
  status: number;
  nota: string;
}

export interface Entregas {
  sucursal_id?: number;
  paquete_array?: string[];
}

export interface Sucursalmx {
  code: number;
  name: string;
  sucursal: Camioneta[];
  type: string;
}
export interface Bodegamx {
  code: number;
  name: string;
  bodega: Camioneta[];
  type: string;
}
