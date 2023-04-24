import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { debounceTime, take } from 'rxjs';
import { Task } from 'src/core/models/task';
import { TasksService } from 'src/core/services/tasks.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  @Input() taskId!: any;
  @Input() editMode: boolean = false;
  @Output() dismiss = new EventEmitter<void>();
  @Output() addNewTask = new EventEmitter<any>();

  taskForm: FormGroup;
  // loading$;

  constructor(
    private taskService: TasksService,
    // private uiSer: uiService,
    private fb: FormBuilder
  ) {
    this.initForm();
    // this.loading$ = this.uiSer.loading$;
  }

  ngOnInit() {
    if (this.editMode === true) {
      this.getTaskByID(this.taskId);
    }
  }
  ngDoCheck(): void {
    this.checkEditMode();
  }
  checkEditMode() {
    if (this.editMode) return;
    if (this.taskId) {
      this.editMode = true;
      this.taskService
        .getTaskById(this.taskId)
        .pipe(take(1))
        .subscribe((res: Task) => {
          console.log('subscribed');
          this.taskForm.controls['taskName'].setValue(res.title);
          this.taskForm.controls['taskDescription'].setValue(res.description);
          this.taskForm.controls['taskUser'].setValue(res.userId);
          this.taskForm.controls['taskDeadline'].setValue(res.deadline);
        });
    }
  }
  initForm() {
    this.taskForm = this.fb.group({
      taskName: ['', [Validators.required]],
      taskDescription: ['', [Validators.required]],
      taskUser: [1, [Validators.required]],
      taskDeadline: ['', [Validators.required]],
    });
    this.taskForm.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      console.log(value);
    });
  }
  get nameControl() {
    return this.taskForm.get('taskName') as FormControl;
  }
  get descriptionControl() {
    return this.taskForm.get('taskDescription') as FormControl;
  }
  get userControl() {
    return this.taskForm.get('taskUser') as FormControl;
  }
  get deadlineControl() {
    return this.taskForm.get('taskDeadline') as FormControl;
  }

  onDismissClick() {
    this.dismiss.emit();
  }

  onSubmit() {
    if (this.taskForm.invalid) return;
    const task: Task = {
      title: this.taskForm.controls['taskName'].value,
      description: this.taskForm.controls['taskDescription'].value,
      userId: this.taskForm.controls['taskUser'].value,
      deadline: this.taskForm.controls['taskDeadline'].value,
    };
    // if (this.editMode === true) {
    //   const updatedTask: Task = {
    //     ...task,
    //     id: this.taskId,
    //   };

    //   this.taskService
    //     .updateTask(this.taskId, updatedTask)
    //     .pipe()
    //     .subscribe({
    //       next: (response) => {
    //         this.dismiss.emit();
    //         console.log(response);
    //       },
    //       error: (err) => {
    //         this.dismiss.emit();
    //         console.log(err);
    //       },
    //       complete: () => {
    //         this.getTasks();
    //         console.log('complete');
    //       },
    //     });
    // } else {
    this.taskService.createTask(task).subscribe({
      next: (response) => {
        this.addNewTask.emit(response);
        this.dismiss.emit();
      },
      error: (err) => {
        this.dismiss.emit();
        console.log(err);
      },
      complete: () => {
        console.log('complete');
        this.getTasks();
      },
    });
    // }
  }

  getTaskByID(id) {
    this.taskService.getTaskById(id).subscribe((res) => {
      // this.taskDetails = res;
    });
  }
  getTasks() {
    this.taskService.getAllTasks().subscribe((res) => {
      console.log(res);
    });
  }
}
