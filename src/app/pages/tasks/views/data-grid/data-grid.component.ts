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
  @Output() deleteTaskEmitter = new EventEmitter<any>();
  showConfiramtionModel: boolean = false;
  showToast: boolean = false;
  toastType: string;
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

  closeToast(dismissed) {
    this.showToast = dismissed;
  }
  constructor(private tasksService: TasksService) {}

  ngOnInit() {}
  // the below code is responsible for removing task
  deleteTask() {
    this.tasksService.deleteTask(this.taskId).subscribe({
      next: (res) => {
        this.deleteTaskEmitter.emit(res);
        this.closeConfirmModal();
      },
      error: () => {
        this.showToast = true;
        this.toastType = 'error';
        setTimeout(() => {
          this.showToast = false;
        }, 5000);
        this.closeConfirmModal();
      },
      complete: () => {
        this.showToast = true;
        this.toastType = 'success';
        setTimeout(() => {
          this.showToast = false;
        }, 5000);
      },
    });
  }
}
