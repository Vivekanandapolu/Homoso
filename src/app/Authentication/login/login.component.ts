// import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
// import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // standalone: true,
  // imports: [CommonModule]
})
export class LoginComponent implements OnInit {
  loginEmail: any
  options = {}
  url: any
  emailErrorMsg: any
  show: any
  loginObj: any = {}
  styles = {
    "border-color": "red"
  }

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private route: ActivatedRoute,) { }
  ngOnInit(): void {
    this.route.queryParamMap
      .subscribe((params) => {
        this.loginObj = { ...params.keys, ...params };
      }
      );
    this.loginEmail = this.loginObj.params.validMail
    // console.log(this.loginEmail)
  }

  login(inputVal: any, pass: any, emailField: any, passField: any, mailIcon: any,
    passIcon: any): void {
    let dataObj = {
      username: inputVal.value,
      password: pass.value
    }
    if (dataObj.username == '' || dataObj.password == '') {
      this.toastr.error('Enter a vaild Credentials', '', {
        timeOut: 2000,
      });
      this.emailErrorMsg = "Enter Valid Credentials"
      inputVal.style.border = 'none'
      mailIcon.style.border = 'none'
      pass.style.border = 'none'
      passIcon.style.border = 'none'
      emailField.style.border = "2px solid red"
      emailField.style.borderRadius = "5px"
      passField.style.border = "2px solid red"
      passField.style.borderRadius = "5px"

    }
    else {
      this.emailErrorMsg = null

      this.http.post("http://192.168.1.89:8000/auth/login", dataObj).subscribe((res: any) => {
        console.log(res)
        if (res?.User) {
          this.router.navigate(["tenants"])
          this.toastr.success('Login Succesful', '', {
            timeOut: 1000,
          });
          inputVal.style.border = 'none'
          mailIcon.style.border = 'none'
          pass.style.border = 'none'
          passIcon.style.border = 'none'
          emailField.style.border = "1px solid white"
          emailField.style.borderRadius = "5px"
          passField.style.border = "1px solid white"
          passField.style.borderRadius = "5px"
          return localStorage.setItem("token", res?.token)
        } else if (res.msg) {
          this.toastr.error('Invalid User Credentials', '', {
            timeOut: 3000,
          });
          this.emailErrorMsg = "Enter Valid Credentials"
          inputVal.style.border = 'none'
          mailIcon.style.border = 'none'
          pass.style.border = 'none'
          passIcon.style.border = 'none'
          emailField.style.border = "2px solid red"
          emailField.style.borderRadius = "5px"
          passField.style.border = "2px solid red"
          passField.style.borderRadius = "5px"
        }
      })
    }
  }

}
