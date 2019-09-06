export interface ConfigLobby {
  type: string;
  bans: number;
  picks: number;
  openDecklist: boolean;
}
export interface ConfigLobbyData {
  config: ConfigLobby;
  player: string;
}
