import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { apiurls } from 'src/app/shared/apiurls';

@Component({
  selector: 'app-forgot-component',
  templateUrl: './forgot-component.component.html',
  styleUrls: ['./forgot-component.component.scss'],

})
export class ForgotComponentComponent implements OnInit {
  show = true
  hide = false
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {
  }
  SubmittedEmail: any
  forgotPassword(emails: any, submit_btn: any, forgotEmailField: any): void {

    if (!emails?.value && emails.value != this.SubmittedEmail) {
      this.show = true
      console.log("enter email")
      forgotEmailField.style.border = "1px solid red"
      forgotEmailField.style.borderRadius = "5px"
      this.toastr.error('Enter Email', '', {
        timeOut: 3000,
      });
    }
    else {
      this.show = false
      this.hide = true
      let dataObj = {
        email: emails?.value,
      }
      this.http.post(apiurls.forgotPassword, dataObj).subscribe((res: any) => {
        console.log(res)
        if (res?.success) {
          this.toastr.success('Password Generated', '', {
            timeOut: 3000,
          });
          this.SubmittedEmail = dataObj.email
          console.log(this.SubmittedEmail)
          this.router.navigate(["forgot_password/generate_password"],
            { queryParams: { emailVal: this.SubmittedEmail } }
          )

        } else if (res?.invalid || dataObj?.email == null) {
          this.show = true
          this.hide = false
          this.toastr.error('Enter a valid email', '', {
            timeOut: 3000,

          });
        }
      })

    }
  }

  ngOnInit(): void {

  }



}
