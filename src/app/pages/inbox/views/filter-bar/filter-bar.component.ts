import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
})
export class FilterBarComponent implements OnInit {
  tabs = [
    { id: 1, label: 'الجميع' },
    { id: 2, label: 'الجديد' },
    { id: 3, label: 'المؤجل' },
    { id: 4, label: 'عاجلة' },
    { id: 5, label: 'للتوقيع' },
    { id: 6, label: 'الطلبات' },
  ];
  selectedTabId = 1;
  constructor() {}

  ngOnInit() {}
  selectTab(id) {
    this.selectedTabId = id;
  }
}
