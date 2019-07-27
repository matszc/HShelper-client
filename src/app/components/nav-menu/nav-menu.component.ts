import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  width: number;
  constructor() {
    this.width = window.innerWidth;
  }

  ngOnInit() {
  }
  onResize(event) {
    this.width = event.target.innerWidth;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

}
