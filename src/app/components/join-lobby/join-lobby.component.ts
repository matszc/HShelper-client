import { Component, OnInit, OnDestroy } from '@angular/core';
import {LobbyService} from '../../services/lobby.service';
import {Lobby} from '../../Models/lobby';
import {ActivatedRoute} from '@angular/router';
import {HubConnection, HubConnectionBuilder} from '@aspnet/signalr';
import {GLOBAL} from '../../config';

@Component({
  selector: 'app-join-lobby',
  templateUrl: './join-lobby.component.html',
  styleUrls: ['./join-lobby.component.scss']
})
export class JoinLobbyComponent implements OnInit, OnDestroy {
  private lobbyId: string;
  private lobby: Lobby;
  private loading: boolean;
  private hubConnection: HubConnection;
  private btag: string;
  constructor(private lobbyService: LobbyService, private route: ActivatedRoute) {
    this.loading = true;
    this.btag = localStorage.getItem('btag') ?  localStorage.getItem('btag') : '';
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.lobbyId = params.id;
    });
    this.lobbyService.getLobby(this.lobbyId).subscribe(res => {
      console.log(res);
      this.lobby = res;
      this.startConnection();
    }, () => this.loading = false);
  }
  ngOnDestroy(): void {
    this.stopConnection();
  }

  startConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${GLOBAL.URL}/lobbyHub1`)
      .build();
    this.hubConnection.start()
      .then(() => {
        console.log('Conection started');
        this.joinLobby();
      })
      .catch((err) => console.error(err));
    this.hubConnection.on('Picks', (lb: Lobby) => {
      this.lobby = lb;
    });
    this.hubConnection.on('Bans', (lb) => {
      this.lobby = lb;
    });
    this.hubConnection.on('Players', (lb) => {
      this.lobby = lb;
    });
  }
  updateNick(btag) {
    this.hubConnection.invoke('getNick', btag, this.lobby, this.lobby.id).then(() => {
      if (this.btag === '') {
        this.btag = btag;
      }
      if (this.btag === 'unknown') {
        localStorage.removeItem('btag');
      }
    });
  }
  stopConnection() {
    this.hubConnection.invoke('LeaveLobby', this.lobby.id)
      .then( () => this.hubConnection.stop());
  }
  joinLobby() {
    this.hubConnection.invoke('JoinLobby', this.lobby.id).then(() => {
      this.loading = false;
    });
  }
  picksPhase(picks: string[]) {
    this.hubConnection.invoke('CheckPicks', this.btag, picks, this.lobby, this.lobby.id);
  }
  banPhase(bans: string[]) {
    this.hubConnection.invoke('CheckBans', this.btag, bans, this.lobby, this.lobbyId);
  }

}
