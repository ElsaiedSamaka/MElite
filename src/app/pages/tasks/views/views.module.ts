import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TasksCreateComponent } from './tasks-create/tasks-create.component';
import { TasksDeleteComponent } from './tasks-delete/tasks-delete.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [TasksCreateComponent, TasksDeleteComponent],
  exports: [TasksCreateComponent, TasksDeleteComponent],
})
export class ViewsModule {}
