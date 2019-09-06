import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GLOBAL} from '../../../config';

@Component({
  selector: 'app-nick',
  templateUrl: './nick.component.html',
  styleUrls: ['./nick.component.scss']
})
export class NickComponent implements OnInit {
  @Output() savebtag = new EventEmitter();
  public btag: string;
  public isBtagSet: boolean;
  public isChecked: boolean;
  public link: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.url.subscribe((r) => this.link = r.toString());
    this.link = this.link.replace(',', '/');
    this.link = GLOBAL.DOMAIN + this.link;
    const localBtag = localStorage.getItem('btag');
    if (localBtag) {
      this.btag = localBtag;
      this.isBtagSet = true;
      this.save();
    } else {
     this.btag = '';
     this.isBtagSet = false;
    }
  }
  save() {
    if (this.isChecked) {
      localStorage.setItem('btag', this.btag);
    }
    this.savebtag.emit(this.btag);
  }
  copy(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
  public checkIfEnterPressed(e) {
    if (e.which === 13) {
      this.save();
    }
  }

}
