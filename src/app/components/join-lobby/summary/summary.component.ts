import {Component, Input, OnInit} from '@angular/core';
import {Lobby} from '../../../Models/lobby';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  @Input() lobby: Lobby;

  constructor() { }

  ngOnInit() {
  }

}
