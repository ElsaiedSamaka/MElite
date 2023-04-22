import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TasksCreateComponent } from './tasks-create/tasks-create.component';
import { TasksDeleteComponent } from './tasks-delete/tasks-delete.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TasksCreateComponent, TasksDeleteComponent],
  exports: [TasksCreateComponent, TasksDeleteComponent],
})
export class ViewsModule {}
