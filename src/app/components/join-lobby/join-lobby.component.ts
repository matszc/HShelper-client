import { Component, OnInit, OnDestroy } from '@angular/core';
import {LobbyService} from '../../services/lobby.service';
import {Lobby} from '../../Models/lobby';
import {ActivatedRoute} from '@angular/router';
import {HubConnection, HubConnectionBuilder} from '@aspnet/signalr';

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
  private readonly btag: string;
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
      this.loading = false;
      this.startConnection();
    }, () => this.loading = false);
  }
  ngOnDestroy(): void {
    this.stopConnection();
  }

  startConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:44381/lobbyHub')
      .build();
    this.hubConnection.start()
      .then(() => {
        console.log('Conection started');
        this.joinLobby();
      })
      .catch((err) => console.error(err));
    this.hubConnection.on('Bans', (lb) => {
      this.lobby = lb;
    });
  }
  stopConnection() {
    this.hubConnection.invoke('LeaveLobby', this.lobby.id)
      .then( () => this.hubConnection.stop());
  }
  joinLobby() {
    this.hubConnection.invoke('JoinLobby', this.lobby.id);
  }
  banPhase(picks: string[]) {
    this.hubConnection.invoke('CheckPicks', this.btag, picks, this.lobby, this.lobby.id)
      .then((res) => console.log(res)).catch((err) => console.error(err));
    console.log(this.lobby);
  }

}
