import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }
  isUserAuthenticated() {
    if (localStorage.getItem('token')) {
      this.http.get("http://192.168.1.89:8000/settings/show").subscribe((res: any) => {
        localStorage.setItem('user_type', res.user_type)
      })
      
      return true;
    }
    else {
      this.router.navigate(['/'])
      return false
    }
  }
}
