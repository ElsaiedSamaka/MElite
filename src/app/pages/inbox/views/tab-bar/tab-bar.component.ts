import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.css'],
})
export class TabBarComponent implements OnInit {
  activeTab = 'خطاب تغطية';
  tabs = [
    { id: 1, label: 'عموم الامارة' },
    { id: 2, label: 'المفضلة' },
    { id: 3, label: 'موظف محدد' },
  ];
  selectedTabId = 1;
  empddl: boolean = false;
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
  selectTab(id: any) {
    this.selectedTabId = id;
  }
  openEmpDDL() {
    this.empddl = !this.empddl;
  }
}
