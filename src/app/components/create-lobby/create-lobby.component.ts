import { Component, OnInit } from '@angular/core';
import {ConfigLobby} from '../../Models/configLobby';

@Component({
  selector: 'app-create-lobby',
  templateUrl: './create-lobby.component.html',
  styleUrls: ['./create-lobby.component.scss']
})
export class CreateLobbyComponent implements OnInit {
  config: ConfigLobby;
  defaultConfig: ConfigLobby;
  constructor() {
      this.defaultConfig = {
        type: 'Conquest',
        bans: 1,
        picks: 2,
        openDecklist: false
      };
  }

  ngOnInit() {
    const localConfig: ConfigLobby = JSON.parse(localStorage.getItem('configLobby'));
    this.config = localConfig ? localConfig : this.defaultConfig;
  }

}
