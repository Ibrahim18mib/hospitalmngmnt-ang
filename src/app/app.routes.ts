import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppointmentListComponent } from './pages/appointment-list/appointment-list.component';
import { PatientListComponent } from './pages/patient-list/patient-list.component';
import { HospitalListComponent } from './pages/hospital-list/hospital-list.component';
import { NewHospitalComponent } from './pages/new-hospital/new-hospital.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'appointments',
    component: AppointmentListComponent,
  },
  {
    path: 'patients',
    component: PatientListComponent,
  },
  {
    path: 'hospitals',
    component: HospitalListComponent,
  },
  {
    path: 'new-hospital',
    component: NewHospitalComponent,
  },
];
