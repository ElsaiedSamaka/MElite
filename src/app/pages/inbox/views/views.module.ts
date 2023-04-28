import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AssignmentTabComponent } from './assignment-tab/assignment-tab.component';
import { AttachmentsTabComponent } from './attachments-tab/attachments-tab.component';
import { CommitteeReportsTabComponent } from './committee-reports-tab/committee-reports-tab.component';
import { ExplanationsTabComponent } from './explanations-tab/explanations-tab.component';
import { ExternalLetterTabComponent } from './external-letter-tab/external-letter-tab.component';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { InternalMemoComponent } from './internal-memo-tab/internal-memo.component';
import { OffersTabComponent } from './offers-tab/offers-tab.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TabBarComponent } from './tab-bar/tab-bar.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    FilterBarComponent,
    SearchBarComponent,
    TabBarComponent,
    ExternalLetterTabComponent,
    OffersTabComponent,
    InternalMemoComponent,
    CommitteeReportsTabComponent,
    ExplanationsTabComponent,
    AttachmentsTabComponent,
    AssignmentTabComponent,
  ],
  exports: [
    FilterBarComponent,
    SearchBarComponent,
    TabBarComponent,
    ExternalLetterTabComponent,
    OffersTabComponent,
    InternalMemoComponent,
    CommitteeReportsTabComponent,
    ExplanationsTabComponent,
    AttachmentsTabComponent,
    AssignmentTabComponent,
  ],
})
export class ViewsModule {}
