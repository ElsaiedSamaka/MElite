import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TasksService } from 'src/core/services/tasks.service';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css'],
})
export class DataGridComponent implements OnInit {
  @Input() data = [];
  @Output() taskCheck = new EventEmitter<any>();
  showConfiramtionModel: boolean = false;
  showToast: boolean = false;
  taskId;

  onTaskChange(id: string) {
    this.taskCheck.emit(id);
  }
  openConfirmModal(id: string) {
    this.taskId = id;
    this.showConfiramtionModel = true;
    console.log(this.taskId);
  }
  closeConfirmModal() {
    this.taskId = '';
    this.showConfiramtionModel = false;
  }
  deleteTask() {
    this.tasksService.deleteTask(this.taskId).subscribe({
      next: () => this.closeConfirmModal(),
      error: () => console.log('error'),
      complete: () => {
        this.openToast();
        setTimeout(() => {
          this.showToast = false;
        }, 5000);
      },
    });
  }
  openToast() {
    this.showToast = true;
  }
  closeToast(dismissed) {
    this.showToast = dismissed;
  }
  constructor(private tasksService: TasksService) {}

  ngOnInit() {}
}
