import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  showQuickViewModal: boolean = false;
  constructor() {}

  ngOnInit() {}
  toggleQuickViewModal() {
    this.showQuickViewModal = !this.showQuickViewModal;
  }
}
