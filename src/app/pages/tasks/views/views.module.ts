import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataGridComponent } from './data-grid/data-grid.component';
import { PaginationComponent } from './pagination/pagination.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TasksCreateComponent } from './tasks-create/tasks-create.component';
import { TasksDeleteComponent } from './tasks-delete/tasks-delete.component';

@NgModule({
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  declarations: [
    TasksCreateComponent,
    TasksDeleteComponent,
    DataGridComponent,
    PaginationComponent,
    TaskFormComponent,
    // SortDirective,
  ],
  exports: [
    TasksCreateComponent,
    TasksDeleteComponent,
    DataGridComponent,
    PaginationComponent,
    TaskFormComponent,
  ],
})
export class ViewsModule {}
