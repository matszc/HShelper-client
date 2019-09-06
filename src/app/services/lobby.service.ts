import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GLOBAL} from '../config';
import {Observable} from 'rxjs';
import {ConfigLobbyData} from '../Models/configLobby';
import {Lobby} from '../Models/lobby';
@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  constructor(private http: HttpClient) {}
  public createLobby(lobby: ConfigLobbyData) {
    return this.http.post(`${GLOBAL.URL}/api/lobby`, lobby);
  }
  public getLobby(id: string): Observable<Lobby> {
    return this.http.get<Lobby>(`${GLOBAL.URL}/api/lobby/${id}`);
  }
  public getAllLobby(): Observable<Lobby[]> {
    return this.http.get<Lobby[]>(`${GLOBAL.URL}/api/lobby`);
  }
}
