import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TasksService } from 'src/core/services/tasks.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})
export class TasksListComponent implements OnInit {
  tasks$!: Observable<any[]>;
  title: string = '';
  current = 0;
  totalItems: number = 0;
  totalPages: number = 0;
  perPage = 10;
  constructor(private tasksService: TasksService) {
    this.tasks$ = this.tasksService.getAllTasks(this.title, this.current).pipe(
      map((res) => {
        this.totalItems = res['totalItems'];
        this.totalPages = res['totalPages'];
        return res['tasks'];
      })
    );
  }
  ngOnInit() {}
  onGoTo(page: number): void {
    this.current = page;
    this.paginate(this.current, this.perPage);
  }
  onNext(page: number): void {
    if (this.current <= this.totalPages) {
      this.current = page + 1;
      this.paginate(this.current, this.perPage);
    }
  }
  onPrevious(page: number): void {
    if (this.current >= 1) {
      this.current = page - 1;
      this.paginate(this.current, this.perPage);
    }
  }
  paginate(current: number, perPage: number) {
    this.tasks$ = this.tasksService.getAllTasks(this.title, this.current).pipe(
      map((res) => {
        this.totalItems = res['totalItems'];
        this.totalPages = res['totalPages'];
        return res['tasks'];
      })
    );
  }
}
