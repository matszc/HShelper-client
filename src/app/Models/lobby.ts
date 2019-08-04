import {ConfigLobby} from './configLobby';

export interface Lobby {
  config: ConfigLobby;
  creationDate: Date;
  id: string;
  players: string[];
  status: string;
  _id: string;
}
