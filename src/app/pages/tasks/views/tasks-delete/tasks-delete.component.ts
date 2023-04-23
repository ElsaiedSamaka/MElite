import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks-delete',
  templateUrl: './tasks-delete.component.html',
  styleUrls: ['./tasks-delete.component.css'],
})
export class TasksDeleteComponent implements OnInit {
  showConfiramtionModel = false;
  empIds;
  @Input() isTasksChecked: boolean;
  constructor() {}

  ngOnInit() {}

  openConfirmationModal(ids: any[]) {
    this.showConfiramtionModel = !this.showConfiramtionModel;
    this.empIds = ids;
  }
  onConfirmationCloseHandled() {
    this.showConfiramtionModel = false;
  }

  // TODO: ADD API CALL TO DELETE EMPLOYEEs
  deleteALLCheckedTasks() {
    this.onConfirmationCloseHandled();
    console.log('employees have been deleted');
  }
}
