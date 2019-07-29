import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GLOBAL} from '../config';
import {Observable} from 'rxjs';
import { ConfigLobbyData} from '../Models/configLobby';
@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  constructor(private http: HttpClient) { }
  public createLobby(lobby: ConfigLobbyData) {
    return this.http.post(`${GLOBAL.URL}/lobby`, lobby);
  }
}
