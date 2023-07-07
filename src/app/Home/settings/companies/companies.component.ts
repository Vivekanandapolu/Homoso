import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { window } from 'rxjs';
import { apiurls } from 'src/app/shared/apiurls';
var window1: any = window;
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  resposeData: any
  companyData: any = {}
  formModal: any

  user_type = true
  user: any
  states: any
  statesData: any = {
    "states": [
      {
        "key": "AN",
        "name": "Andaman and Nicobar Islands"
      },
      {
        "key": "AP",
        "name": "Andhra Pradesh"
      },
      {
        "key": "AR",
        "name": "Arunachal Pradesh"
      },
      {
        "key": "AS",
        "name": "Assam"
      },
      {
        "key": "BR",
        "name": "Bihar"
      },
      {
        "key": "CG",
        "name": "Chandigarh"
      },
      {
        "key": "CH",
        "name": "Chhattisgarh"
      },
      {
        "key": "DH",
        "name": "Dadra and Nagar Haveli"
      },
      {
        "key": "DD",
        "name": "Daman and Diu"
      },
      {
        "key": "DL",
        "name": "Delhi"
      },
      {
        "key": "GA",
        "name": "Goa"
      },
      {
        "key": "GJ",
        "name": "Gujarat"
      },
      {
        "key": "HR",
        "name": "Haryana"
      },
      {
        "key": "HP",
        "name": "Himachal Pradesh"
      },
      {
        "key": "JK",
        "name": "Jammu and Kashmir"
      },
      {
        "key": "JH",
        "name": "Jharkhand"
      },
      {
        "key": "KA",
        "name": "Karnataka"
      },
      {
        "key": "KL",
        "name": "Kerala"
      },
      {
        "key": "LD",
        "name": "Lakshadweep"
      },
      {
        "key": "MP",
        "name": "Madhya Pradesh"
      },
      {
        "key": "MH",
        "name": "Maharashtra"
      },
      {
        "key": "MN",
        "name": "Manipur"
      },
      {
        "key": "ML",
        "name": "Meghalaya"
      },
      {
        "key": "MZ",
        "name": "Mizoram"
      },
      {
        "key": "NL",
        "name": "Nagaland"
      },
      {
        "key": "OR",
        "name": "Odisha"
      },
      {
        "key": "PY",
        "name": "Puducherry"
      },
      {
        "key": "PB",
        "name": "Punjab"
      },
      {
        "key": "RJ",
        "name": "Rajasthan"
      },
      {
        "key": "SK",
        "name": "Sikkim"
      },
      {
        "key": "TN",
        "name": "Tamil Nadu"
      },
      {
        "key": "TS",
        "name": "Telangana"
      },
      {
        "key": "TR",
        "name": "Tripura"
      },
      {
        "key": "UK",
        "name": "Uttar Pradesh"
      },
      {
        "key": "UP",
        "name": "Uttarakhand"
      },
      {
        "key": "WB",
        "name": "West Bengal"
      }
    ]
  }
  indiaStates = []
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
  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {
  }
  ngOnInit(): void {
    this.companies()

    for (let states in this.statesData) {
      this.states = this.statesData[states]
      console.log(this.states)
    }
    this.states.map((state: any) => {
      this.stateName = state.name
      console.log(this.stateName)
    })
    this.user = localStorage.getItem('user_type')

    if (this.user == 'owner') {
      this.user_type = false
    }
  }

  companies(): void {
    this.http.get(apiurls.getComapnies).subscribe(res => {
      this.resposeData = res
    })
  }

  addCompany(form: NgForm) {
    console.log(form.value)
    if (form.valid) {
      if (!this.companyData.Company_id) {
        this.http.post(apiurls.createCompany, form.value).subscribe((res) => {
          console.log(res)
          this.companyData = {}
          this.toastr.success('Company Added Successfully', '', {
            timeOut: 3000,
          });
        })
      }
      if (this.companyData.Company_id) {
        this.http.put(apiurls.editCompany + this.companyData.Company_id, form.value).subscribe((res) => {
          console.log(res)
          this.toastr.success('updated successfully', '', { timeOut: 1000 });
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
    this.companyData = {};
    if (type == 'edit') {
      this.companyData = { ...value };
    } else {
      this.companyData = {};
    }
  }
}