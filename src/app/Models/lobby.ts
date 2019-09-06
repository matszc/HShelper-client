import {ConfigLobby} from './configLobby';

export interface Lobby {
  config: ConfigLobby;
  creationDate: Date;
  id: string;
  players: Player[];
  status: string;
  _id: string;
}
export interface Player {
  btag: string;
  picks: string[];
  bans: string[];
}
