import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-btag',
  templateUrl: './btag.component.html',
  styleUrls: ['./btag.component.scss']
})
export class BtagComponent implements OnInit {
  btag: string;
  isBtagSet: boolean;
  constructor() {
    this.btag = localStorage.getItem('btag');
  }

  ngOnInit() {
    this.isBtagSet = this.checkBtag();
  }
  public saveBtag() {
    localStorage.setItem('btag', this.btag);
    this.isBtagSet = true;
  }
  public checkBtag() {
    const btag = localStorage.getItem('btag');
    return !!btag;
  }
  public clearBtag() {
    localStorage.removeItem('btag');
    this.isBtagSet = false;
    this.btag = '';
  }
  public checkIfEnterPressed(e) {
    if(e.which === 13){
      this.saveBtag();
    }
  }

}
