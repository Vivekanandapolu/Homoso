import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-generate-password',
  templateUrl: './generate-password.component.html',
  styleUrls: ['./generate-password.component.scss'],

})
export class GeneratePasswordComponent implements OnInit {
  paramsEmailVal: any
  generatedMail: any
  constructor(private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.route.queryParamMap
      .subscribe((params) => {
        this.paramsEmailVal = { ...params.keys, ...params };
      }
      );
    this.generatedMail = this.paramsEmailVal.params.emailVal
    console.log(this.generatedMail)
    setTimeout(() => {
      this.router.navigate(['/'], { queryParams: { validMail: this.generatedMail } })
    }, 4000)
  }

}
