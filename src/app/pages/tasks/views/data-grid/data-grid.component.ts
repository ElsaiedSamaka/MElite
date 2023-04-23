import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TasksService } from 'src/core/services/tasks.service';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css'],
})
export class DataGridComponent implements OnInit {
  tasks$!: Observable<any[]>;
  title: string = '';
  current = 0;

  constructor(private tasksService: TasksService) {
    this.tasks$ = this.tasksService.getAllTasks(this.title, this.current).pipe(
      map((res) => {
        return res['tasks'];
      })
    );
  }

  ngOnInit() {}
}
