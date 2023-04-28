import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignment-tab',
  templateUrl: './assignment-tab.component.html',
  styleUrls: ['./assignment-tab.component.css'],
})
export class AssignmentTabComponent implements OnInit {
  tabs = [
    { id: 1, label: 'عموم الامارة' },
    { id: 2, label: 'المفضلة' },
    { id: 3, label: 'موظف محدد' },
  ];
  selectedTabId = 1;
  empddl: boolean = false;
  constructor() {}

  ngOnInit() {}
  selectTab(id: any) {
    this.selectedTabId = id;
  }
}
