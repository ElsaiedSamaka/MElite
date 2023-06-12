import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payement-card',
  templateUrl: './payement-card.component.html',
  styleUrls: ['./payement-card.component.css'],
})
export class PayementCardComponent implements OnInit {
  selectedCardID = 0;
  constructor() {}

  ngOnInit() {}
  onCardSelect(id: any): void {
    if (this.selectedCardID === id) {
      this.selectedCardID = 0;
    } else {
      this.selectedCardID = id;
    }
  }
}
