import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespLogin, Usuario } from '../interfaces/interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  Usuario: Usuario = {};
  constructor(private http: HttpClient) { }

  login(login: any) {
    const url = environment.url;
    return this.http.post<RespLogin>(`${url}/auth/login`, login, {});
    }
}
