import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css'],
})
export class AdvancedSearchComponent implements OnInit {
  showSearchModal: boolean = false;
  constructor() {}

  ngOnInit() {}
  openSearchModal() {
    this.showSearchModal = !this.showSearchModal;
  }
  onSearchModalDismiss() {
    this.showSearchModal = false;
  }
}
