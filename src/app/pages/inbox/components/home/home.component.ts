import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Treatment } from 'src/core/models/treatment';
import { TreatmentsService } from 'src/core/services/treatments.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  
  treatments$!: Observable<Treatment[]>;
  constructor(private treatmentsService: TreatmentsService) {
    this.treatments$ = this.treatmentsService.getAll();
  }

  ngOnInit() {}
}
