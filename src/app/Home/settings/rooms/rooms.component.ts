import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent {
  resposeData: any;
  hostelsData: any;
  companyName: any;
  hide = false
  show = true
  Rooms: any = {}
  SelectedHostelroomtypes: any = []
  RoomTypes: any
  selectedHosted_id: any
  RoomRates: any
  RoomSharingType: any = []
  AllRooms: any
  seleted_hostel: any = {}
  SelectedRooms: any = []
  constructor(private http: HttpClient, private ngbMOdalService: NgbModal, private toaster: ToastrService) {

  }
  ngOnInit(): void {

    this.getHostels()
    this.getCompanies()

    this.getRoomTypes()
    this.gethostelsData()

  }
  getCompanies() {
    this.http.get("http://192.168.1.89:8000/companies/show").subscribe((res: any) => {
      this.resposeData = res
      console.log(this.resposeData)
      for (let i in this.resposeData) {
        this.companyName = this.resposeData[i].CompanyName
        console.log(this.companyName)
      }
    })
  }
  getHostels() {
    this.http.get("http://192.168.1.89:8000/hostels/show").subscribe((res) => {
      this.hostelsData = res
      console.log(this.hostelsData)
      if (this.hostelsData.length) {
        this.hostelsData[0].selected = true
        this.seleted_hostel = this.hostelsData[0];
        this.getRooms(this.seleted_hostel)
      }
    })
  }
  radioChecked(id: any, i: any) {
    this.seleted_hostel = {}
    this.hostelsData.forEach((item: any) => {

      if (item) {
        item['selected'] = false;
      }
      if (item.Hostel_id !== id) {
        item.selected = false;
      } else {
        this.seleted_hostel = item;
        // console.log("====================== ", this.seleted_hostel)
        item.selected = true;
        this.getRooms(item)
      }
    })
  }
  createRoom(form: NgForm, modal: any, RoomType: any,
    RoomNumber: any,
    PriceWithFood: any,
    PriceWithoutFood: any,
    HostelName: any) {

    let obj = {
      RoomNumber: RoomNumber.value,
      PriceWithFood: PriceWithFood.value,
      PriceWithoutFood: PriceWithoutFood.value,
      HostelName: HostelName.value,
      RoomType: RoomType.value
    }
    if (obj.PriceWithFood == null || obj.PriceWithoutFood == null || obj.RoomNumber == null || obj.RoomType == null) {
      this.toaster.error('Select All Fileds', '', {
        timeOut: 1000
      })
    }
    else {
      if (form.valid) {
        this.hide = true
        this.show = false
        console.log(form.value)
        if (!this.Rooms.id) {
          this.http.post('http://192.168.1.89:8000/rooms/create', form.value).subscribe((res: any) => {
            console.log(res)
            this.show = true
            this.hide = false
            console.log(res)
            this.toaster.success('Room Added Successfully', '', {
              timeOut: 2000
            })
            modal.close()
          })
          this.getHostels()
          this.gethostelsData()
        }
        if (this.Rooms.id) {
          this.http.put('http://192.168.1.89:8000/rooms/edit/' + this.Rooms.id, form.value).subscribe((res: any) => {
            console.log(res)
            this.toaster.success('Room Updated Successfully', '', {
              timeOut: 2000
            })
            modal.close()
            console.log(form.value)
            this.getHostels()
            this.gethostelsData()
          })
        }
      }

      else {

        this.toaster.error('Select All Fileds', '', {
          timeOut: 2000
        })
      }
    }
  }
  editRoom(room: any, type: string) {
    this.show = true
    this.hide = false
    // console.log(room)
    this.Rooms = {}
    if (type == 'edit') {
      console.log(room)
      this.Rooms = { ...room }
    }
    else {
      this.Rooms = {}
    }
  }
  getRooms(item: any) {
    this.SelectedRooms = []
    this.http.get('http://192.168.1.89:8000/rooms/show').subscribe(res => {
      this.AllRooms = res
      this.AllRooms.filter((room: any) => {
        if (room.Hostel_ID == item.Hostel_id) {
          this.SelectedRooms.push(room)
          console.log(this.SelectedRooms)
          this.selectedHosted(room.HostelName)
        }
      })
    })
  }
  open(content: any) {
    this.ngbMOdalService.open(content, { backdrop: 'static' })
  }
  getRoomTypes() {
    this.http.get('http://192.168.1.89:8000/roomtype/show').subscribe(res => {
      this.RoomTypes = res
      console.log(this.RoomTypes)
    })
  }

  gethostelsData() {
    this.Rooms = []
    this.http.get('http://192.168.1.89:8000/roomrates/show').subscribe((res: any) => {
      this.RoomRates = res
      console.log(this.RoomRates)
    })
  }

  selectedHosted(e: any) {
    this.SelectedHostelroomtypes = []
    this.Rooms.RoomType = []
    this.hostelsData.filter((hostel: any) => {
      if (e == hostel.HostelName) {
        this.selectedHosted_id = hostel.Hostel_id
        this.RoomRates.filter((roomtype: any) => {
          if (this.selectedHosted_id == roomtype.Hostel_ID) {
            this.SelectedHostelroomtypes.push(roomtype)
          }

        })
      }
    })
  }


  selectedHostelRoomType(e: any) {
    this.RoomSharingType = []
    this.Rooms['PriceWithFood'] = ''
    this.Rooms['PriceWithoutFood'] = ''
    this.SelectedHostelroomtypes.filter((rooms: any) => {
      if (e.toLowerCase() == rooms.RoomType.toLowerCase()) {
        this.RoomSharingType.push(rooms)
        this.Rooms['PriceWithFood'] = Number(rooms?.PriceWithFood)
        this.Rooms['PriceWithoutFood'] = Number(rooms?.PriceWithoutFood)
      }
    })
  }
}
