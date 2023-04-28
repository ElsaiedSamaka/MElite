import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Treatment } from 'src/core/models/treatment';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.css'],
})
export class DetailedComponent implements OnInit {
  treatment$!: Treatment;
  showConfirmModal: boolean = false;
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((res) => {
      this.treatment$ = res['treatment'];
    });
  }

  ngOnInit() {}
  openConfirmModal() {
    this.showConfirmModal = true;
  }
  onDismiss(dismissed: boolean) {
    console.log('dismissed');
    this.showConfirmModal = dismissed;
  }
  onConfirmationCloseHandled() {
    this.showConfirmModal = false;
  }
  submitAssignment() {
    console.log('submitted');
    this.showConfirmModal = false;
  }
}
