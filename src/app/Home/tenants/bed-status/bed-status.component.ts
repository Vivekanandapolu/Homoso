import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { apiurls } from 'src/app/shared/apiurls';

@Component({
  selector: 'app-bed-status',
  templateUrl: './bed-status.component.html',
  styleUrls: ['./bed-status.component.scss']
})
export class BedStatusComponent implements OnInit {
  resposeData: any;
  hostelsData: any;
  companyName: any
  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {

    this.getHostels()
    this.getCompanies()
  }
  getCompanies() {
    this.http.get(apiurls.getComapnies).subscribe((res: any) => {
      this.resposeData = res
      console.log(this.resposeData)
      for (let i in this.resposeData) {
        this.companyName = this.resposeData[i].CompanyName
        console.log(this.companyName)
      }
    })
  }
  getHostels() {
    this.http.get(apiurls.getHostels).subscribe((res) => {
      this.hostelsData = res
      console.log(this.hostelsData)
    })
  }
  radioChecked(id: any, i: any) {
    this.hostelsData.forEach((item: any) => {
      if (item) {
        item['selected'] = false;
      }
      if (item.Hostel_id !== id) {
        item.selected = false;
      } else {
        item.selected = true;
      }
    })
  }
}
