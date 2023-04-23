import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css'],
})
export class DataGridComponent implements OnInit {
  @Input() data = [];
  @Output() taskCheck = new EventEmitter<any>();
  onTaskChange(id: string) {
    this.taskCheck.emit(id);
  }
  constructor() {}

  ngOnInit() {}
}
