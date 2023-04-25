import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs';
import { TasksService } from 'src/core/services/tasks.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})
export class TasksListComponent implements OnInit {
  tasks$;
  data;
  title: string = '';
  //pagination related vars
  current = 0;
  totalItems: number = 0;
  totalPages: number = 0;
  perPage = 10;
  //selection tasks related vars
  isTasksChecked: boolean = false;
  selectedItemsList = [];

  constructor(private tasksService: TasksService) {
    this.tasks$ = this.tasksService.getAllTasks(this.title, this.current).pipe(
      map((res) => {
        this.totalItems = res['totalItems'];
        this.totalPages = res['totalPages'];
        return res['tasks'];
      }),
      tap((res) => this.tasksService.tasksSubject$.next(res))
    );
  }
  ngOnInit() {
    this.data = this.tasksService.tasksSubject$.value;
    console.log(this.data);
  }

  //pagination functionality
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
    this.getTasks();
  }
  getTasks() {
    this.tasks$ = this.tasksService.getAllTasks(this.title, this.current).pipe(
      map((res) => {
        this.totalItems = res['totalItems'];
        this.totalPages = res['totalPages'];
        return res['tasks'];
      })
    );
  }
  //selection of tasks
  onTasksCheck(tasksIds: string[]) {
    this.isTasksChecked = !this.isTasksChecked;
    if (this.isTasksChecked === true) {
      let isSelected = this.selectedItemsList.includes(
        tasksIds[0] ||
          tasksIds[1] ||
          tasksIds[2] ||
          tasksIds[3] ||
          tasksIds[4] ||
          tasksIds[5] ||
          tasksIds[6] ||
          tasksIds[7] ||
          tasksIds[8] ||
          tasksIds[9]
      );
      if (isSelected) {
        console.log('includes task - will not appendTask');
      } else {
        this.selectedItemsList = [...this.selectedItemsList, ...tasksIds];
        console.log('not includes task - appendTask');
      }
      console.log('selectedItemsList', this.selectedItemsList);
    } else {
      this.selectedItemsList.length = 0;
      console.log('selectedItemsList', this.selectedItemsList);
    }
  }

  onTaskChange(taskId: string) {
    if (this.selectedItemsList.includes(taskId)) {
      this.selectedItemsList = this.selectedItemsList.filter(
        (emp) => emp !== taskId
      );
    } else {
      this.selectedItemsList.push(taskId);
    }
    console.log('selectedItemsList', this.selectedItemsList);
  }
  onTaskDeleted(deletedTask) {
    // ideally we would recieve that emitted deleted task and filter out our displayed tasks with that task id
    // now since there an issue filter displayed tasks$
    // im gonna simply make another api call to get the updated tasks list
    // this.tasks$.filter((task) => task.id === deletedTask.id);
    // console.log(deletedTask);
    this.getTasks();
  }
}
