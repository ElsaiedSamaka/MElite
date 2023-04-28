import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Treatment } from 'src/core/models/treatment';
import { TreatmentsService } from 'src/core/services/treatments.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  treatments!: Treatment[];
  constructor(private treatmentsService: TreatmentsService) {
    this.treatmentsService
      .getAll()
      .pipe(
        tap((treats) => {
          this.treatments = this.treatmentsService.treatments$.value;
        })
      )
      .subscribe();
  }

  ngOnInit() {}
  refreshTreatments() {
    this.treatmentsService
      .getAll()
      .pipe(
        tap((treats) => {
          this.treatments = this.treatmentsService.treatments$.value;
        })
      )
      .subscribe();
  }
  onTreatmentsFilter(treatments: Treatment[]) {
    console.log(treatments);
    this.treatments = treatments;
  }
}
