import { Component, Input, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TasksService } from 'src/core/services/tasks.service';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css'],
})
export class DataGridComponent implements OnInit {
  @Input() data = [];


  constructor() {}

  ngOnInit() {}
}
