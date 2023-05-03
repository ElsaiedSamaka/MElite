import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  isOpened: boolean = false;
  id: string = '';
  treatmentIds = [];
  showAdvancedSearchBar: boolean = false;
  constructor(
    private treatmentsService: TreatmentsService,
    route: ActivatedRoute
  ) {
    this.treatmentsService
      .getAll()
      .pipe(
        tap((treats) => {
          this.treatments = this.treatmentsService.treatments$.value;
        })
      )
      .subscribe();
    const id = route.snapshot.params['id'];
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
  onTreatmentsSearch(treatments: Treatment[]) {
    console.log(treatments);
    this.treatments = treatments;
  }
  onTreatmentOpen(id: string) {
    if (this.id !== id) {
      this.isOpened = true;
      this.treatmentIds.push(id);
    }
  }
  toggleAdvancedSearchBar() {
    this.showAdvancedSearchBar = !this.showAdvancedSearchBar;
  }
}
