import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Treatment } from 'src/core/models/treatment';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.css'],
})
export class DetailedComponent implements OnInit {
  treatment$!: Treatment;
  showConfirmModal: boolean = false;
  showAssignementModal: boolean = false;
  showExplainatoryModal: boolean = false;
  showToast: boolean = false;
  toastType: string = '';
  referedUsers: Array<any> = [];

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((res) => {
      this.treatment$ = res['treatment'];
    });
  }

  ngOnInit() {}
  openConfirmModal() {
    this.showConfirmModal = true;
  }
  onDismiss(dismissed: boolean) {
    console.log('dismissed');
    this.showConfirmModal = dismissed;
  }
  onConfirmationCloseHandled() {
    this.showConfirmModal = false;
  }
  submitAssignment(treatId: any) {
    // TODO: make sure that the backend have setup an endpoint for submiting  assignment and then call it here
    console.log('treatment id', treatId);
    console.log('المعاملة برقم', treatId, 'تمت توقيعها بنجاح');
    this.showConfirmModal = false;
    this.openToast();
  }
  closeToast(dismissed: any) {
    this.showToast = dismissed;
  }
  openToast() {
    this.showToast = true;
    this.toastType = 'success';
    setTimeout(() => {
      this.showToast = false;
    }, 5000);
  }
  openAssignementModal() {
    this.showAssignementModal = !this.showAssignementModal;
  }
  onAssignementCloseHandled() {
    this.showAssignementModal = false;
  }
  onAssignementModalDismiss(dismissed: boolean) {
    console.log(dismissed);
    this.showAssignementModal = dismissed;
  }
  addReferedUser() {
    // TODO: make sure that we are creating an object with the same structure as the one in the backend
    this.referedUsers.push({ name: 'محمد عبد الله', id: 1 });
    console.log(this.referedUsers);
  }
  removeReferedUser(id: number) {
    this.referedUsers.splice(id, 1);
  }
  onAssignementSubmit() {
    // TODO: make sure that the backend have setup an endpoint for submiting  assignment and then call it here
    console.log('submitted');
    this.showAssignementModal = false;
    this.openToast();
  }
  openExplainatoryModal() {
    this.showExplainatoryModal = true;
  }
  onExplainatoryModalDismiss(dismissed: boolean) {
    this.showExplainatoryModal = dismissed;
  }
  onExplainatoryModalCloseHandled() {
    this.showExplainatoryModal = false;
  }
  onExplainatorySubmit(treatId: any) {
    // TODO: make sure that the backend have setup an endpoint for submiting  assignment and then call it here
    console.log('submitted');
    console.log('treatment id', treatId);
    this.showExplainatoryModal = false;
    this.openToast();
  }
}
