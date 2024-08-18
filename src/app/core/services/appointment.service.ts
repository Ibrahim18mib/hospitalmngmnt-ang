import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponseModel, Appointment } from '../classes/hospital.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Constant } from '../constant/Constant';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http:HttpClient) { }

  newAppointment(obj: Appointment): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(
      environment.api_url + Constant.API_END_POINT.ADD_NEW_APPOINTMENT,
      obj
    );
  }

  getAppointmentsbyHosp(id: number): Observable<ApiResponseModel> {
    return this.http.get<ApiResponseModel>(
      environment.api_url + Constant.API_END_POINT.GET_APPOINTMENTS_BY_HOSPID + id
    );
  }

  private apiUrl = 'https://dummyapi.io/data/api';

  getApiId(): Observable<any> {
    return this.http.get<any>('assets/getID.json');
  }
  postApiId(url:any,dataObj:any): Observable<any> {
    debugger
    return this.http.post<any>(url, dataObj);
  }

}
