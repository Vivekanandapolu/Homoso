import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { apiurls } from 'src/app/shared/apiurls';

@Component({
  selector: 'app-room-rates',
  templateUrl: './room-rates.component.html',
  styleUrls: ['./room-rates.component.scss']
})
export class RoomRatesComponent {
  resposeData: any;
  hostelsData: any;
  companyName: any
  roomTypes: any = {}
  RoomRates: any
  RoomsTypes: any = []
  loader = false;
  RoomTypes: any
  Rooms: any = []
  seleted_hostel: any = {}
  errorMsg: any
  savebtn = true
  constructor(private http: HttpClient, private modalService: NgbModal, private toaster: ToastrService, private router: Router) {

  }
  ngOnInit(): void {
    this.companies()
    this.getHostels()
    this.getRoomTypes()
  }

  getHostels() {
    this.http.get(apiurls.getHostels).subscribe((res: any) => {
      this.hostelsData = res
      console.log(this.hostelsData)
      if (this.hostelsData.length) {
        this.hostelsData[0].selected = true
        this.seleted_hostel = this.hostelsData[0];
        this.gethostelsData(this.seleted_hostel)
      }
    })
  }

  companies(): void {
    this.http.get(apiurls.getComapnies).subscribe((res: any) => {
      for (let i in res) {
        this.companyName = res[i].CompanyName
      }
    })
  }



  radioChecked(id: any, i: any) {
    this.seleted_hostel = {}
    this.hostelsData.forEach((item: any) => {
      if (item) {
        item['selected'] = false;
        if (item.Hostel_id !== id) {
          item.selected = false;
        } else {
          this.seleted_hostel = item;
          // console.log("====================== ", this.seleted_hostel)
          item.selected = true;
          this.gethostelsData(item)
        }
      }
    })
  }


  gethostelsData(item: any) {
    console.log(item)
    this.Rooms = []
    this.http.get(apiurls.getRoomTypes).subscribe((res: any) => {

      res.filter((room: any) => {
        if (item?.Hostel_id == room?.hostel_id) {
          this.Rooms.push(room)
          console.log(this.Rooms);

        }
      })
    })
  }
  open(content: any) {
    this.modalService.open(content, { size: 'md', backdrop: 'static' })
  }
  createRoomType(form: NgForm, modal: any, Roomtype: any, Bedcount: any, content: any) {
    console.log(form.value)
    let obj = {
      Roomtype: Number(Roomtype),
      Bedcount: Number(Bedcount)
    }
    if (obj.Roomtype == null || obj.Roomtype == null) {
      this.toaster.error('Enter all fields', '', {
        timeOut: 1000
      })
    }
    else {
      if (form.valid) {
        this.loader = true;
        this.savebtn = false
        if (!this.roomTypes.id) {
          this.errorMsg = ''
          this.http.post(apiurls.createRoomTypes, form.value).subscribe((res: any) => {
            console.log(res)
            this.loader = false
            this.savebtn = true
            if (res.msg) {
              this.errorMsg = 'Bed Count Already Exists'
              this.toaster.error('Enter Different Bed Count', '', {
                timeOut: 2000
              })
            }
            else {
              this.errorMsg = ''
              this.toaster.success('Room Type Added Successfully', '', {
                timeOut: 1000
              })
              modal.close()
              this.getHostels()
            }
          })
        }
        if (this.roomTypes.id) {
          this.errorMsg = null
          this.http.put(apiurls.editRoomtypes + this.roomTypes.id, form.value).subscribe((res: any) => {
            console.log(res)
            if (res) {
              this.toaster.success('Room Type Updated Successfully', '', {
                timeOut: 2000
              })
              modal.close()
              this.getHostels()
            }
          })
        }
      }
      else {
        this.toaster.error('Enter All Fields', '', {
          timeOut: 2000
        })
      }
    }
  }
  editRoomTypes(roomtypes: any, type: string) {
    this.loader = false
    this.savebtn = true
    this.errorMsg = ''
    this.roomTypes = {}
    if (type == 'edit') {
      this.errorMsg = ''
      this.roomTypes = { ...roomtypes }
    }
    else {
      this.roomTypes = {}
    }
  }
  getRoomTypes() {
    this.http.get(apiurls.getRoomTypes).subscribe(res => {
      this.RoomTypes = res
      console.log(res)
    })
  }
}
