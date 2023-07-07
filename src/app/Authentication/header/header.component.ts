import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { apiurls } from 'src/app/shared/apiurls';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  changepasswordData: any = {}
  pass = false
  emailErrorMsg: any;
  currErrorMsg: any
  hide = false;
  show = true;

  user_type: any
  username: any
  user_id: any
  constructor(private router: Router, private modalService: NgbModal, private http: HttpClient, private toastr: ToastrService) {
  }
  ngOnInit(): void {
    this.http.get(apiurls.getUser).subscribe((res: any) => {

      this.user_type = localStorage.getItem('user_type')
      this.username = res.name
      this.user_id = res.email
    })

  }
  width = "120px"
  openNav(myid: any, listitems: any, layer: any) {
    if (myid.style.width == this.width || null) {
      myid.style.width = "50px"
      listitems.style.width = "0px"
      myid.style.transition = "0.7s";
      myid.style.transition = "0.7s";
      layer.style.display = "none"
      layer.style.width = "100vw"
      layer.style.height = "118vh"
      layer.style.position = "absolute"
      layer.style.opacity = "0.7"
    }
    else {
      myid.style.width = this.width
      listitems.style.width = "120px"
      layer.style.display = "block"
      myid.style.transition = "0.7s";
      listitems.style.transition = "0.7s";
    }
  }
  logout() {
    this.router.navigate(['/'])
    localStorage.clear()
  }


  open(content: any) {
    this.modalService.open(content, { size: 'md', backdrop: 'static', centered: true })
  }
  changePass(form: NgForm, modal: any, CurrentPassword: any, NewPassword: any, ConfirmPassword: any) {
    let dataObj = {
      current: CurrentPassword.value,
      NewPass: NewPassword.value,
      ConPass: ConfirmPassword.value
    }
    if (!dataObj.current || !dataObj.NewPass || !dataObj.ConPass) {
      this.show = true
      this.toastr.error('Enter a All Fileds', '', {
        timeOut: 2000,
      });
      this.emailErrorMsg = null
    }
    else {
      this.show = false
      this.hide = true
      if (form.valid) {
        this.http.put(apiurls.changePassword, form.value).subscribe((res: any) => {
          console.log(res)

          // this.emailErrorMsg = null
          if (res.success) {
            this.emailErrorMsg
            this.toastr.success('Password Updated Successfully', '', { timeOut: 1000 });
            localStorage.clear()
            this.router.navigate(['/'])
            modal.close()
          }
          else if (res.msg) {
            this.show = true
            this.hide = false
            this.currErrorMsg = 'Current Password is Wrong'
            this.toastr.error('Current Password is Wrong', '', {
              timeOut: 3000,
            });
          }
          else if (res.msg2) {
            this.show = true
            this.hide = false
            this.currErrorMsg = null
            this.emailErrorMsg = 'New Password and Confirm Password not matched'
            this.toastr.error('New Password and Confirm Password not matched', '', {
              timeOut: 3000,
            });
          }
        })
      }
      else {

        this.toastr.error('Enter correct details', '', {
          timeOut: 3000,
        });
        modal.open()
      }
    }
  }

}
