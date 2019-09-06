import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Lobby} from '../../../Models/lobby';
import {PicksComponent} from '../picks/picks.component';

@Component({
  selector: 'app-bans',
  templateUrl: './bans.component.html',
  styleUrls: ['./bans.component.scss']
})
export class BansComponent implements OnInit {
  @Input() lobby: Lobby;
  @Input() btag: string;
  @Output() bansEvent = new EventEmitter<string[]>();
  private  heroes: string[];
  private loading: boolean;
  private bansForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.heroes = this.lobby.players.find(p => p.btag !== this.btag).picks;
    this.createForm();
  }
  checkForm() {
    let picks = 0;
    Object.keys(this.bansForm.value).forEach((val) => {
      const control = this.bansForm.get(val);
      control.value ? picks++ : picks += 0;
    });
    if (picks >= this.lobby.config.bans) {
      Object.keys(this.bansForm.value).forEach((val) => {
        const control = this.bansForm.get(val);
        control.value ? control.enable() : control.disable();
      });
    } else {
      this.bansForm.enable();
    }
  }
  createForm() {
    this.bansForm = this.formBuilder.group({
      Warrior: new FormControl(false),
      Paladin: new FormControl(false),
      Priest: new FormControl(false),
      Druid: new FormControl(false),
      Rouge: new FormControl(false),
      Mage: new FormControl(false),
      Hunter: new FormControl(false),
      Warlock: new FormControl(false),
      Shaman: new FormControl(false),
    }, {validator: PicksComponent.picksValidator(this.lobby.config.bans)});
  }
  onSubmit() {
    this.bansEvent.emit(Object.keys(this.bansForm.value));
    this.loading = true;
  }

}
