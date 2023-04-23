import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sort-icon',
  templateUrl: './sort-icon.component.html',
  styleUrls: ['./sort-icon.component.css'],
})
export class SortIconComponent implements OnInit {
  @Input() isDesc = true;
  @Output() sortTypeChange = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit() {}
  toggle() {
    this.isDesc = !this.isDesc;
    this.sortTypeChange.emit(this.isDesc);
  }
}
