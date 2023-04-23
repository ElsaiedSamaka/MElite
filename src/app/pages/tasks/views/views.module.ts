import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataGridComponent } from './data-grid/data-grid.component';
import { PaginationComponent } from './pagination/pagination.component';
import { TasksCreateComponent } from './tasks-create/tasks-create.component';
import { TasksDeleteComponent } from './tasks-delete/tasks-delete.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [
    TasksCreateComponent,
    TasksDeleteComponent,
    DataGridComponent,
    PaginationComponent,
  ],
  exports: [
    TasksCreateComponent,
    TasksDeleteComponent,
    DataGridComponent,
    PaginationComponent,
  ],
})
export class ViewsModule {}
