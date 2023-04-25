import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks-delete',
  templateUrl: './tasks-delete.component.html',
  styleUrls: ['./tasks-delete.component.css'],
})
export class TasksDeleteComponent implements OnInit {
  showConfiramtionModel = false;
  tasksIds;
  constructor() {}

  ngOnInit() {}

  openConfirmationModal(ids: any[]) {
    this.showConfiramtionModel = !this.showConfiramtionModel;
    this.tasksIds = ids;
  }
  onConfirmationCloseHandled() {
    this.showConfiramtionModel = false;
  }

  // TODO: ADD API CALL TO DELETE tasks
  deleteALLCheckedTasks() {
    this.onConfirmationCloseHandled();
    console.log('tasks have been deleted');
  }
}
