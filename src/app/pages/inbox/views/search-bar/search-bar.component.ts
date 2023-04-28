import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { TreatmentsService } from 'src/core/services/treatments.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  showDDL: boolean = false;
  @Output() searchTreatment = new EventEmitter<any>();
  searchForm = new FormGroup({
    search: new FormControl(''),
    searchTag: new FormControl(''),
  });
  constructor(private treatmentsService: TreatmentsService) {}

  ngOnInit() {
    this.searchTreatments();
  }
  toggleDDL() {
    this.showDDL = !this.showDDL;
  }
  searchTreatments() {
    this.searchForm.controls.search.valueChanges
      .pipe(
        debounceTime(3000),
        distinctUntilChanged(),
        switchMap((searchString) => {
          console.log('search string', searchString);
          return this.treatmentsService.search(searchString);
        }),
        tap((treats) => {
          this.searchTreatment.emit(this.treatmentsService.treatments$.value);
        })
      )
      .subscribe();
  }
  onSubmit() {
    console.log(this.searchForm.value);
    this.searchForm.reset();
  }
}
