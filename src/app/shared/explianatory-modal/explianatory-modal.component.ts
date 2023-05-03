import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-explianatory-modal',
  templateUrl: './explianatory-modal.component.html',
  styleUrls: ['./explianatory-modal.component.css'],
})
export class ExplianatoryModalComponent implements OnInit {
  @Output() dismiss = new EventEmitter<boolean>();

  constructor(private el: ElementRef) {}

  ngOnInit() {
    document.body.appendChild(this.el.nativeElement);
  }
  ngOnDestory() {
    this.el.nativeElement.remove();
  }
  onDismissClick() {
    this.dismiss.emit(false);
  }
}
