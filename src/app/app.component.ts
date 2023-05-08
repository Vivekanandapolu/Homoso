import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  emailVal: any
  title = 'Homoso';
  formModal: any;
  onUpdatedMail(eventData: { title: string }) {
    this.emailVal = eventData.title
  }
  ngOnInit(): void {
  }
}
