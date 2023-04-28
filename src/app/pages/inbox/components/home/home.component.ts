import { Component, OnInit } from '@angular/core';
import { Treatment } from 'src/core/models/treatment';
import { TreatmentsService } from 'src/core/services/treatments.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // treatments$!: Observable<Treatment[]>;
  treatments!: Treatment[];
  constructor(private treatmentsService: TreatmentsService) {
    // this.treatments$ =
    this.treatmentsService.getAll().subscribe((treatments) => {
      this.treatments = treatments;
    });
    console.log(this.treatments)
  }

  ngOnInit() {}
  refreshTreatments() {
    this.treatmentsService.getAll().subscribe((treatments) => {
      this.treatments = treatments;
    });
  }
}
