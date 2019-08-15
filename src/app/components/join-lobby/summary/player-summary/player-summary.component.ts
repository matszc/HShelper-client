import {Component, Input, OnInit} from '@angular/core';
import {Player} from '../../../../Models/lobby';

@Component({
  selector: 'app-player-summary',
  templateUrl: './player-summary.component.html',
  styleUrls: ['./player-summary.component.scss']
})
export class PlayerSummaryComponent implements OnInit {
  @Input() player: Player;
  bansToShow;
  picksToShow;
  heroes;
  constructor() {
    // tslint:disable-next-line:max-line-length
    this.heroes = [{name: 'Warrior', url: 'https://firebasestorage.googleapis.com/v0/b/hshelper-51abd.appspot.com/o/classIcons%2Fwarrior.webp?alt=media&token=d453878e-1e86-4090-853d-1bdf100216f2'},
      // tslint:disable-next-line:max-line-length
      {name: 'Paladin', url: 'https://firebasestorage.googleapis.com/v0/b/hshelper-51abd.appspot.com/o/classIcons%2Fpaladin.png?alt=media&token=f90e89bb-c687-4b41-bb78-044d70589ea7'},
      // tslint:disable-next-line:max-line-length
      {name: 'Priest', url: 'https://firebasestorage.googleapis.com/v0/b/hshelper-51abd.appspot.com/o/classIcons%2Fpriest.png?alt=media&token=8d564e4d-b89c-4637-bc19-e4ff27983298'},
      // tslint:disable-next-line:max-line-length
      {name: 'Druid', url: 'https://firebasestorage.googleapis.com/v0/b/hshelper-51abd.appspot.com/o/classIcons%2Fdruid.png?alt=media&token=225653de-1925-40ed-8bbf-be1d616390ee'},
      // tslint:disable-next-line:max-line-length
      {name: 'Rouge', url: 'https://firebasestorage.googleapis.com/v0/b/hshelper-51abd.appspot.com/o/classIcons%2Frogue.png?alt=media&token=61c1efae-d0ef-4c4d-b3fb-be770fe63768'},
      // tslint:disable-next-line:max-line-length
      {name: 'Mage', url: 'https://firebasestorage.googleapis.com/v0/b/hshelper-51abd.appspot.com/o/classIcons%2Fmage.png?alt=media&token=4011325f-f2c5-41bf-b583-e9eb7029a5c6'},
      // tslint:disable-next-line:max-line-length
      {name: 'Hunter', url: 'https://firebasestorage.googleapis.com/v0/b/hshelper-51abd.appspot.com/o/classIcons%2Fhunter.png?alt=media&token=eead5f48-c716-496d-a868-f0f34f28778b'},
      // tslint:disable-next-line:max-line-length
      {name: 'Warlock', url: 'https://firebasestorage.googleapis.com/v0/b/hshelper-51abd.appspot.com/o/classIcons%2Fwarlock.png?alt=media&token=be912edb-8e8f-4117-812f-850719f74c14'},
      // tslint:disable-next-line:max-line-length
      {name: 'Shaman', url: 'https://firebasestorage.googleapis.com/v0/b/hshelper-51abd.appspot.com/o/classIcons%2Fshaman.png?alt=media&token=d6de1e16-60d7-4b41-9087-8fc4b2c09296'}];
  }

  ngOnInit() {
    this.picksToShow = this.player.picks.filter(p => {
      return !this.player.bans.includes(p);
    });
    this.picksToShow = this.picksToShow.map(p => {
      return this.heroes.find(h => h.name === p);
    });
    this.bansToShow = this.player.bans.map(p => {
      return this.heroes.find(h => h.name === p);
    });
  }

}
