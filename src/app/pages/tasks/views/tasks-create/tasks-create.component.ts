import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks-create',
  templateUrl: './tasks-create.component.html',
  styleUrls: ['./tasks-create.component.css'],
})
export class TasksCreateComponent {
  showModel = false;
  editMode: boolean = false;
  showToast: boolean = false;
  constructor() {}

  onClick() {
    this.showModel = !this.showModel;
  }
  onCloseHandled() {
    this.showModel = !this.showModel;
  }
  addTask(task: any) {
    this.showToast = !this.showToast;
    console.log(task);
    setTimeout(() => {
      this.showToast = false;
    }, 5000);
  }
  dismissToast(dismissed: boolean) {
    this.showToast = dismissed;
  }
}
