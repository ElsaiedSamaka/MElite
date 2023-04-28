import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { tap } from 'rxjs';
import { TreatmentsService } from 'src/core/services/treatments.service';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
})
export class FilterBarComponent implements OnInit {
  tabs = [
    { id: 1, label: 'الجميع' },
    { id: 2, label: 'الجديد' },
    { id: 3, label: 'المؤجل' },
    { id: 4, label: 'عاجلة' },
    { id: 5, label: 'للتوقيع' },
    { id: 6, label: 'الطلبات' },
  ];
  selectedTabId = 1;
  @Output() treatmentsFilter = new EventEmitter<any>();
  constructor(private treatmentsService: TreatmentsService) {}

  ngOnInit() {}
  selectTab(id: number) {
    this.selectedTabId = id;
    console.log(this.tabs[id - 1].label);
    this.treatmentsService
      .filter(this.tabs[id - 1].label.toString().trim())
      .pipe(
        tap((treats) => {
          this.treatmentsFilter.emit(this.treatmentsService.treatments$.value);
        })
      )
      .subscribe();
  }
}
