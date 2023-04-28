import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.css'],
})
export class TabBarComponent implements OnInit {
  activeTab = 'خطاب تغطية';

  empddl: boolean = false;
  showSpeedDial: boolean = false;
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
  openAssignmentTab() {
    this.activeTab = 'الاحالة';
  }
  openEmpDDL() {
    this.empddl = !this.empddl;
  }
  openSpeedDial() {
    this.showSpeedDial = !this.showSpeedDial;
    console.log('speed dial');
  }
}
