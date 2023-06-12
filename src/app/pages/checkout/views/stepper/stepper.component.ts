import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent implements OnInit {
  currentStepIndex = 1;
  steps = [
    { id: 1, label: 'بيانات الدفع', description: 'This is step 1' },
    { id: 2, label: 'عنوان الشحن', description: 'This is step 2' },
    { id: 3, label: 'مراجعة الطلب', description: 'This is step 3' },
  ];

  constructor() {}

  ngOnInit() {}
  nextStep() {
    this.currentStepIndex++;
    console.log(this.currentStepIndex);
  }

  prevStep() {
    this.currentStepIndex--;
    console.log(this.currentStepIndex);
  }
}