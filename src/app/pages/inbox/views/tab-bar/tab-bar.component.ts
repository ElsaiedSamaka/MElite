import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.css'],
})
export class TabBarComponent implements OnInit {
  activeTab = 'خطاب تغطية';
  constructor() {}

  ngOnInit() {}
  openExternalLetterTab() {
    this.activeTab = 'خطاب تغطية';
  }
  openOfferTab() {
    this.activeTab = 'عروض';
  }
  openExplanationsTab() {
    this.activeTab = 'الشروحات';
  }
  openMemoTab() {
    this.activeTab = 'مذكرة';
  }
  openAttachmentTab() {
    this.activeTab = 'المرفقات';
  }
  openCommitteeMinutesTab() {
    this.activeTab = 'محاضر اللجان';
  }
}
