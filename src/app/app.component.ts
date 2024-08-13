import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  ApiResponseModel,
  Hospital,
  User,
} from './core/classes/hospital.model';
import { FormsModule } from '@angular/forms';
import { HospitalService } from './core/services/hospital.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  userObj: User = new User();
  LoggedHospitalData: Hospital = new Hospital();

  constructor(private hospitalServ: HospitalService) {
    const loggedData = localStorage.getItem('practoLogin');;
    if(loggedData != null){
      this.LoggedHospitalData = JSON.parse(loggedData);
    }
  }

  showLogin() {
    const modal = document.getElementById('loginModel');
    if (modal != null) {
      modal.style.display = 'block';
    }
  }

  onLogout() {
    localStorage.removeItem('practoLogin');
    this.LoggedHospitalData = new Hospital();
  }

  closeLogin() {
    const closeModal = document.getElementById('loginModel');
    if (closeModal != null) {
      closeModal.style.display = 'none';
    }
  }

  onLogin() {
    this.hospitalServ.userLogin(this.userObj).subscribe(
      (res: ApiResponseModel) => {
        if (res.result) {
          alert('Logged Inn Successfull...');
          this.LoggedHospitalData = res.data;
          localStorage.setItem('practoLogin', JSON.stringify(res.data));
          this.closeLogin();
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
