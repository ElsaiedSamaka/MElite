import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { ViewsModule } from './views/views.module';

@NgModule({
  imports: [CommonModule, ViewsModule, TasksRoutingModule],
  declarations: [TasksListComponent],
})
export class TasksModule {}
