import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  showConfirmationModal: boolean = false;
  constructor() {}

  ngOnInit() {}

  toggleConfirmationModal(): void {
    this.showConfirmationModal = !this.showConfirmationModal;
  }
  nextStep(e: any) {
    console.log('e', e);
  }
  prevStep(e: any) {
    console.log('e', e);
  }
}
