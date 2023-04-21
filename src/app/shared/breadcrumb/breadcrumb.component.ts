import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
  @Input() mainProgramName: string = 'الرئيسية';
  @Input() supProgramName: string = '';
  @Input() childSubProgramName: string = '';
  constructor() {}

  ngOnInit() {}
}
