import { Component, OnInit } from '@angular/core';
import {LobbyService} from '../../services/lobby.service';
import {Lobby} from '../../Models/lobby';

@Component({
  selector: 'app-join-lobby',
  templateUrl: './join-lobby.component.html',
  styleUrls: ['./join-lobby.component.scss']
})
export class JoinLobbyComponent implements OnInit {
  lobbyList: Lobby[];
  constructor(private lobbyService: LobbyService) { }

  ngOnInit() {
    this.lobbyService.getAllLobby().subscribe( res => {
      this.lobbyList = res;
      console.log(res);
    });
  }

}
