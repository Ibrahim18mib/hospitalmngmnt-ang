import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Constant } from '../constant/Constant';
import { ApiResponseModel, Hospital } from '../classes/hospital.model';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor(private http: HttpClient) {}

  registerHospital(obj: Hospital): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(
      environment.api_url + Constant.API_END_POINT.ADD_NEW_HOSPITAL,
      obj
    );
  }
}
