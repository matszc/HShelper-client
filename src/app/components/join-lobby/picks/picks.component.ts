import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LobbyService} from '../../../services/lobby.service';
import {Lobby} from '../../../Models/lobby';
import {FormBuilder, FormControl, FormGroup, ValidatorFn} from '@angular/forms';

@Component({
  selector: 'app-picks',
  templateUrl: './picks.component.html',
  styleUrls: ['./picks.component.scss']
})
// TODO style checkbox and loader add css for disabled
export class PicksComponent implements OnInit {
  private picksForm: FormGroup;
  @Input() lobby: Lobby;
  @Output() pickEvent = new EventEmitter<string[]>();
  private loader = false;
  private heroes;
  public static picksValidator(maxPicks: number) {
    const validator: ValidatorFn = (fg: FormGroup) => {
      let picks = 0;
      Object.keys(fg.value).forEach((val) => {
        const control = fg.get(val);
        control.value ? picks++ : picks += 0;
      });
      return picks === maxPicks
        ? null
        : { range: true };
    };
    return validator;
  }
  constructor(private lobbyService: LobbyService, private formBuilder: FormBuilder) {
    // tslint:disable-next-line:max-line-length
    this.heroes = ['Warrior', 'Paladin', 'Priest', 'Druid', 'Rouge', 'Mage', 'Hunter', 'Warlock', 'Shaman'];
  }

  ngOnInit() {
    this.createForm();
  }
  checkForm() {
    let picks = 0;
    Object.keys(this.picksForm.value).forEach((val) => {
      const control = this.picksForm.get(val);
      control.value ? picks++ : picks += 0;
    });
    if (picks >= this.lobby.config.picks) {
      Object.keys(this.picksForm.value).forEach((val) => {
        const control = this.picksForm.get(val);
        control.value ? control.enable() : control.disable();
      });
    } else {
      this.picksForm.enable();
    }
  }
  createForm() {
    this.picksForm = this.formBuilder.group({
      Warrior: new FormControl(false),
      Paladin: new FormControl(false),
      Priest: new FormControl(false),
      Druid: new FormControl(false),
      Rouge: new FormControl(false),
      Mage: new FormControl(false),
      Hunter: new FormControl(false),
      Warlock: new FormControl(false),
      Shaman: new FormControl(false),
    }, {validator: PicksComponent.picksValidator(this.lobby.config.picks)});
  }
  onSubmit() {
    this.loader = true;
    this.pickEvent.emit(Object.keys(this.picksForm.value));
  }

}
