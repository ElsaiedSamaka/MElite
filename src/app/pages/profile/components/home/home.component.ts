import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tabs = [
    { id: 1, label: 'منتجات بالمفضلة' },
    { id: 2, label: 'السلة' },
  ];
  selectedTabId = 2;
  constructor() {}

  ngOnInit() {}
  selectTab(id: number) {
    this.selectedTabId = id;
    console.log('selectedTabId', id);
  }
}
