import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks-create',
  templateUrl: './tasks-create.component.html',
  styleUrls: ['./tasks-create.component.css'],
})
export class TasksCreateComponent {
  showModel = false;

  constructor() {}

  onClick() {
    this.showModel = !this.showModel;
  }
  onCloseHandled() {
    this.showModel = !this.showModel;
  }
  addTask(task: any) {
    console.log(task);
  }
}
