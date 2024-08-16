import { Component, OnInit } from '@angular/core';
import {
  ApiResponseModel,
  Appointment,
} from '../../core/classes/hospital.model';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../core/services/appointment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css',
})
export class AppointmentListComponent implements OnInit {
  AppointmentObj: Appointment = new Appointment();
  AppointmentLists:Appointment[] =[];
  emptyLists:any[] =[];

  constructor(private appointmentServ: AppointmentService) {
    const loggedData = localStorage.getItem('practoLogin');
    if (loggedData != null) {
      this.AppointmentObj.hospitalId = JSON.parse(loggedData).hospitalId;
    }
  }

  ngOnInit(): void {
    this.getHospitalAppointments();
  }

  onBookAppointment() {
    console.log(this.AppointmentObj), 'AppointmentObj';
    this.appointmentServ.newAppointment(this.AppointmentObj).subscribe(
      (res: ApiResponseModel) => {
        if (res.result) {
          alert('Appointment Created Successfully');
        } else {
          alert(res.message);
        }
      },
      (error) => {
        alert(JSON.stringify(error));
      }
    );
  }

  getHospitalAppointments() {
    this.appointmentServ
      .getAppointmentsbyHosp(this.AppointmentObj.hospitalId)
      .subscribe(
        (res: ApiResponseModel) => {
          if (res.result) {
            // alert(JSON.stringify(res.data));
            this.AppointmentLists = res.data;
          } else {
            alert(res.message);
          }
        },
        (error) => {
          alert(JSON.stringify(error));
        }
      );
  }
}
