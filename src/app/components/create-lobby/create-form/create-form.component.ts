import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {ConfigLobby, ConfigLobbyData} from '../../../Models/configLobby';
import {LobbyService} from '../../../services/lobby.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})

export class CreateFormComponent implements OnInit {
  lobbyForm: FormGroup;
  formats: string[];
  picks: number[];
  bans: number[];
  loading: boolean;
  @Input() config: ConfigLobby;
  private static picksAndBansValidator() {
    const validator: ValidatorFn = (fg: FormGroup) => {
      const bans = fg.get('bansFormControl').value;
      const picks = fg.get('pickFormControl').value;
      return bans !== null && picks !== null && bans < picks
        ? null
        : { range: true };
    };
    return validator;
  }
  constructor(private formBuilder: FormBuilder, private lobbyService: LobbyService, private router: Router) {
    this.loading = false;
    this.formats = ['Conquest', 'Specialist'];
    this.picks = [1, 2, 3, 4, 5, 6, 7 , 8 , 9];
    this.bans = [0, 1, 2, 3, 4, 5, 6, 7 , 8 ];
  }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.lobbyForm = this.formBuilder.group({
      formatFormControl: new FormControl(this.config.type),
      openDecklistFormControl: new FormControl(this.config.openDecklist),
      pickFormControl:  new FormControl(this.config.picks),
      bansFormControl: new FormControl(this.config.bans)
    }, {validator: CreateFormComponent.picksAndBansValidator()});
  }
  onSubmit() {
    const {formatFormControl, openDecklistFormControl, pickFormControl, bansFormControl} = this.lobbyForm.controls;
    if (this.lobbyForm.invalid) {
      return false;
    }
    // TODO add css preloader
    this.loading = true;
    if (!localStorage.getItem('btag')) {
      localStorage.setItem('btag', 'unknown');
    }
    const btag = localStorage.getItem('btag');
    this.config.type = formatFormControl.value;
    this.config.openDecklist = openDecklistFormControl.value;
    this.config.bans = bansFormControl.value;
    this.config.picks = pickFormControl.value;
    localStorage.setItem('configLobby', JSON.stringify(this.config));
    const result: ConfigLobbyData = {
      config: this.config,
      player: btag
    };
    this.lobbyService.createLobby(result).subscribe(res => {
      // console.log(res);
      // @ts-ignore
      const {id} = res;
      this.router.navigate(['/join/' + id]);
    }, () => this.loading = false);
  }
  adjustToFormatType() {
    const {formatFormControl, openDecklistFormControl, pickFormControl, bansFormControl} = this.lobbyForm.controls;
    if (formatFormControl.value === 'Specialist') {
      openDecklistFormControl.setValue(true);
      openDecklistFormControl.disable();
      pickFormControl.setValue(1);
      pickFormControl.disable();
      bansFormControl.setValue(0);
      bansFormControl.disable();
    }
    if (formatFormControl.value === 'Conquest') {
      openDecklistFormControl.setValue(this.config.openDecklist);
      openDecklistFormControl.enable();
      pickFormControl.enable();
      bansFormControl.enable();
    }
  }

}
