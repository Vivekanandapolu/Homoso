import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
// import { CommonModule } from '@angular/common';

import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-hostels',
  templateUrl: './hostels.component.html',
  styleUrls: ['./hostels.component.scss'],
  // standalone: true,
  // imports: [CommonModule]
})
export class HostelsComponent implements OnInit {
  hostelsData: any
  closeResult = '';
  Hostels: any = {}
  addClass: any
  compayName: any
  states: any
  statesData: any = {
    "states": [
      { "name": "Andhra Pradesh", "abbreviation": "AP" },
      { "name": "Arunachal Pradesh", "abbreviation": "AR" },
      { "name": "Assam", "abbreviation": "AS" },
      { "name": "Bihar", "abbreviation": "BR" },
      { "name": "Chhattisgarh", "abbreviation": "CG" },
      { "name": "Goa", "abbreviation": "GA" },
      { "name": "Gujarat", "abbreviation": "GJ" },
      { "name": "Haryana", "abbreviation": "HR" },
      { "name": "Himachal Pradesh", "abbreviation": "HP" },
      { "name": "Jharkhand", "abbreviation": "JH" },
      { "name": "Karnataka", "abbreviation": "KA" },
      { "name": "Kerala", "abbreviation": "KL" },
      { "name": "Madhya Pradesh", "abbreviation": "MP" },
      { "name": "Maharashtra", "abbreviation": "MH" },
      { "name": "Manipur", "abbreviation": "MN" },
      { "name": "Meghalaya", "abbreviation": "ML" },
      { "name": "Mizoram", "abbreviation": "MZ" },
      { "name": "Nagaland", "abbreviation": "NL" },
      { "name": "Odisha", "abbreviation": "OR" },
      { "name": "Punjab", "abbreviation": "PB" },
      { "name": "Rajasthan", "abbreviation": "RJ" },
      { "name": "Sikkim", "abbreviation": "SK" },
      { "name": "Tamil Nadu", "abbreviation": "TN" },
      { "name": "Telangana", "abbreviation": "TS" },
      { "name": "Tripura", "abbreviation": "TR" },
      { "name": "Uttar Pradesh", "abbreviation": "UP" },
      { "name": "Uttarakhand", "abbreviation": "UK" },
      { "name": "West Bengal", "abbreviation": "WB" }
    ]
  }
  stateName: any;
  cities: any
  citiesData = [
    {
      "city": "Mumbai",
      "state": "Maharashtra",
      "latitude": 19.0760,
      "longitude": 72.8777
    },
    {
      "city": "Delhi",
      "state": "Delhi",
      "latitude": 28.7041,
      "longitude": 77.1025
    },
    {
      "city": "Bangalore",
      "state": "Karnataka",
      "latitude": 12.9716,
      "longitude": 77.5946
    },
    {
      "city": "Hyderabad",
      "state": "Telangana",
      "latitude": 17.3850,
      "longitude": 78.4867
    },
    {
      "city": "Chennai",
      "state": "Tamil Nadu",
      "latitude": 13.0827,
      "longitude": 80.2707
    },
    {
      "city": "Ahmedabad",
      "state": "Gujarat",
      "latitude": 23.0225,
      "longitude": 72.5714
    },
    {
      "city": "Kolkata",
      "state": "West Bengal",
      "latitude": 22.5726,
      "longitude": 88.3639
    },
    {
      "city": "Surat",
      "state": "Gujarat",
      "latitude": 21.1702,
      "longitude": 72.8311
    },
    {
      "city": "Pune",
      "state": "Maharashtra",
      "latitude": 18.5204,
      "longitude": 73.8567
    },
    {
      "city": "Jaipur",
      "state": "Rajasthan",
      "latitude": 26.9124,
      "longitude": 75.7873
    },
    {
      "city": "Lucknow",
      "state": "Uttar Pradesh",
      "latitude": 26.8467,
      "longitude": 80.9462
    },
    {
      "city": "Kanpur",
      "state": "Uttar Pradesh",
      "latitude": 26.4499,
      "longitude": 80.3319
    },
    {
      "city": "Nagpur",
      "state": "Maharashtra",
      "latitude": 21.1458,
      "longitude": 79.0882
    },
    {
      "city": "Visakhapatnam",
      "state": "Andhra Pradesh",
      "latitude": 17.6868,
      "longitude": 83.2185
    },
    {
      "city": "Bhopal",
      "state": "Madhya Pradesh",
      "latitude": 23.2599,
      "longitude": 77.4126
    },
    {
      "city": "Patna",
      "state": "Bihar",
      "latitude": 25.5941,
      "longitude": 85.1376
    },
    {
      "city": "Ludhiana",
      "state": "Punjab",
      "latitude": 30.9010,
      "longitude": 75.8573
    },
    {
      "city": "Agra",
      "state": "Uttar Pradesh",
      "latitude": 27.1767,
      "longitude": 78.0081
    },
    {
      "city": "Nashik",
      "state": "Maharashtra",
      "latitude": 19.9975,
      "longitude": 73.7898
    },
    {
      "city": "Vadodara",
      "state": "Gujarat",
    }
  ]
  cityName: any
  constructor(private http: HttpClient, private toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.getData()
    this.addClass = document.getElementById('save-btn')
    this.comp_Name()
    for (let states in this.statesData) {
      this.states = this.statesData[states]
    }
    this.states.map((state: any) => {
      this.stateName = state.name
    })
    for (let cities in this.citiesData) {
      this.cities = this.citiesData[cities]
      // console.log(this.cities)
    }

  }

  getData() {
    this.http.get("http://192.168.1.89:8000/hostels/show").subscribe((res) => {
      // console.log(res)
      this.hostelsData = res
      // console.log(this.hostelsData)
    })

  }
  comp_Name() {
    this.http.get("http://192.168.1.89:8000/hostels/companyname").subscribe((res: any) => {
      // console.log(res)
      for (let i in res) {
        this.compayName = res[i]
      }
    })
  }
  addCompany(form: NgForm, save_btn: any) {
    if (form.valid) {
      console.log(form.value)
      if (!this.Hostels.Hostel_id) {
        this.addClass = "#exampleModal"
        this.http.post("http://192.168.1.89:8000/hostels/create/", form.value).subscribe((res) => {
          console.log(res)
          this.toastr.success('Hostel Added Successfully', '', {
            timeOut: 3000,
          });
          this.getData()
        })
      }
      if (this.Hostels.Hostel_id) {
        this.addClass = null
        this.http.put("http://192.168.1.89:8000/hostels/edit_hostel/" + this.Hostels.Hostel_id, form.value).subscribe((res) => {
          console.log(res)
          this.toastr.success('updated successfully', '', { timeOut: 1000 });
          this.getData()
        })
      }
    }
    else {
      this.toastr.error('Enter All Fields', '', {
        timeOut: 3000,
      });
    }
  }
  editCompany(value: any, type: string) {
    this.Hostels = {};
    if (type == 'edit') {
      this.Hostels = { ...value };
    } else {
      this.Hostels = {};
    }
  }
}


