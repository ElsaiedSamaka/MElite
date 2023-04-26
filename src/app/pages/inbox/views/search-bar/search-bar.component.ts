import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  showDDL: boolean = false;
  constructor() {}

  ngOnInit() {}
  toggleDDL() {
    this.showDDL = !this.showDDL;
  }
}
