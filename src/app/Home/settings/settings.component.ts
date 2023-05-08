import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  Owner = false
  Supervisor = true
  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    if (localStorage.getItem('user_type') == 'owner') {
      this.Owner = true
    }
    else if (localStorage.getItem('user_type') == 'supervisor') {
      this.Supervisor = false
    }
  }
}
