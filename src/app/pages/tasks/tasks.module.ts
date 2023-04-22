import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { ViewsModule } from './views/views.module';

@NgModule({
  imports: [CommonModule, ViewsModule, TasksRoutingModule],
  declarations: [TasksComponent, TasksListComponent],
})
export class TasksModule {}
