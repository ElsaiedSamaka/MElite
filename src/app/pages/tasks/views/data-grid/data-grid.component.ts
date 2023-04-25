import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css'],
})
export class DataGridComponent implements OnInit {
  @Input() data = [];
  @Output() taskCheck = new EventEmitter<any>();
  showConfiramtionModel: boolean= false;
  onTaskChange(id: string) {
    this.taskCheck.emit(id);
  }
  openConfirmModal() {
    this.showConfiramtionModel = true;
  }
  closeConfirmModal() {
    this.showConfiramtionModel =false
  }

  constructor() {}

  ngOnInit() {}
}
