import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.scss']
})
export class UserdetailsComponent implements OnInit {
  hostelsData: any = []
  users: any
  userFormData: any = {}
  userHostels: any
  i: any;
  formVal: any
  constructor(private http: HttpClient, private toaster: ToastrService, private modalService: NgbModal) {

  }
  ngOnInit(): void {
    this.getHostelsData()
    this.getUsersData()
  }
  open(content: any) {
    this.modalService.open(content, { size: 'md', backdrop: 'static', centered: true })
  }
  getUsersData() {
    this.http.get("http://192.168.1.89:8000/user/show_user").subscribe((res: any) => {
      if (res) {
        // this.users = res
        this.users = res.map((each: any) => {
          if (each.hostels.length) {
            each['hostelsStr'] = each.hostels.map((obj: any) => obj.HostelName).join(",");
            each['hostelsArr'] = each.hostels.map((obj: any) => obj.HostelName);
          }
          return each 
        })
        console.log(this.users)
      }
    })
  }
  getHostelsData() {
    this.http.get("http://192.168.1.89:8000/hostels/show").subscribe((res: any) => {
      if (res.length) {
        this.hostelsData = res
      }
    })
  }
  createUser(form: NgForm, modal: any) {
    if (form.valid) {
      console.log(form.value)
      if (!this.userFormData.user_id) {

        this.http.post("http://192.168.1.89:8000/user/create", form.value).subscribe((res) => {
          console.log(res)
          this.userFormData = {}
          this.toaster.success('User Added Successfully', '', {
            timeOut: 3000,
          });
          this.getUsersData()
          modal.close()
        })

      }

      if (this.userFormData.user_id) {
        this.http.put("http://192.168.1.89:8000/user/edit_user/" + this.userFormData.user_id, form.value).subscribe((res) => {
          console.log(res)
          this.toaster.success('updated successfully', '', { timeOut: 1000 });
          this.getUsersData()
          modal.close()
        })

      }
    }
    else {
      this.toaster.error('Enter All Fields', '', {
        timeOut: 3000,
      });
    }
  }
  editCompany(value: any, type: string) {
    console.log(value)
    this.userFormData = {};
    if (type == 'edit') {
      this.userFormData = { ...value };
      // console.log(this.userFormData)
    } else {
      this.userFormData = {};
    }
  }

}
