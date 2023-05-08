import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-room-types',
  templateUrl: './room-types.component.html',
  styleUrls: ['./room-types.component.scss']
})
export class RoomTypesComponent {
  resposeData: any;
  hostelsData: any;
  companyName: any
  roomRates: any = {}
  RoomRates: any
  Rooms: any = []
  show = true;
  hide = false
  seleted_hostel: any = {}
  hosteldropdown = true
  RoomTypes: any;
  selectedHosted_id: any
  SelectedHostelroomtypes: any = []
  errShare: any
  constructor(private http: HttpClient, private modalService: NgbModal, private toaster: ToastrService, private router: Router) {

  }
  ngOnInit(): void {
    this.companies()
    this.getHostels()
    this.getRoomTypes()
  }

  getHostels() {
    this.http.get("http://192.168.1.89:8000/hostels/show").subscribe((res: any) => {
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
    this.http.get("http://192.168.1.89:8000/companies/show").subscribe((res: any) => {
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
      }
      if (item.Hostel_id !== id.Hostel_id) {
        item.selected = false;
      } else {
        this.seleted_hostel = item;
        console.log("====================== ", this.seleted_hostel)
        item.selected = true;
        this.gethostelsData(item)
      }
    })
  }
  gethostelsData(item: any) {
    this.Rooms = []
    this.http.get('http://192.168.1.89:8000/roomrates/show').subscribe((res: any) => {
      console.log(res)
      res.filter((room: any) => {
        if (item?.Hostel_id == room?.Hostel_ID) {
          this.Rooms.push(room)
        }
      })
    })
  }
  open(content: any) {
    this.modalService.open(content, { size: 'md', backdrop: 'static' })
  }
  createRoomRates(form: NgForm, modal: any, PriceWithFood: any, PriceWithoutFood: any) {

    this.errShare = null

    console.log(form.value)
    let obj = {
      PriceWithFood: PriceWithFood,
      PriceWithoutFood: PriceWithoutFood
    }
    if (!this.roomRates.PriceWithFood || !this.roomRates.PriceWithoutFood) {
      this.toaster.error('enter all fields', '', {
        timeOut: 2000
      })

    }
    else {
      if (form.valid) {
        this.show = false
        this.hide = true
        if (!this.roomRates.id) {
          this.hosteldropdown = true
          this.roomRates.PriceWithFood = String(this.roomRates.PriceWithFood)
          this.roomRates.PriceWithoutFood = String(this.roomRates.PriceWithoutFood)
          this.http.post('http://192.168.1.89:8000/roomrates/create', this.roomRates).subscribe((res: any) => {

            if (res.msg) {
              this.errShare = 'Sharing Type Already Exist'
              this.toaster.error('Sharing Type Already Exist', '', {
                timeOut: 2000
              })

            }
            else {
              this.show = true
              this.hide = false
              this.errShare = null
              this.toaster.success("Room Rates Added Successfully", '', {
                timeOut: 2000
              })
              modal.close()
              this.getHostels()
              this.hosteldropdown = true
            }
          })
        }
        else {
          if (this.roomRates.id) {
            this.roomRates.PriceWithFood = String(this.roomRates.PriceWithFood)
            this.roomRates.PriceWithoutFood = String(this.roomRates.PriceWithoutFood)
            this.http.put('http://192.168.1.89:8000/roomrates/edit/' + this.roomRates.id, this.roomRates).subscribe((res: any) => {
              console.log(res)
              this.hosteldropdown = false
              if (res.transaction) {
                this.toaster.success("Room Rates Updated Successfully", '', {
                  timeOut: 2000
                })
                modal.close()
                this.gethostelsData(this.seleted_hostel)
                this.hosteldropdown = true
              }
            })
          }
        }
      }
    }
  }

  editRoomRates(roomrate: any, type: string) {
    this.show = true
    this.hide = false
    this.roomRates = {};
    if (type == 'edit') {
      this.roomRates = { ...roomrate };

    } else {
      this.roomRates = {};
    }
  }
  getRoomTypes() {
    this.http.get('http://192.168.1.89:8000/roomtype/show').subscribe(res => {
      this.RoomTypes = res
      console.log(res)
    })
  }
  selectedHosted(e: any) {
    this.SelectedHostelroomtypes = []
    console.log("========= ", e, this.SelectedHostelroomtypes)
    this.hostelsData.filter((hostel: any) => {
      if (e == hostel.HostelName) {
        this.selectedHosted_id = hostel.Hostel_id
      }
    })

    this.RoomTypes.filter((roomtype: any) => {
      if (this.selectedHosted_id == roomtype.hostel_id) {
        this.SelectedHostelroomtypes.push(roomtype)
      }
    })

  }
}


