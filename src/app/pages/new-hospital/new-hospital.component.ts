import { Component, OnDestroy } from '@angular/core';
import { ApiResponseModel, Hospital } from '../../core/classes/hospital.model';
import { FormsModule } from '@angular/forms';
import { HospitalService } from '../../core/services/hospital.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-hospital',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-hospital.component.html',
  styleUrl: './new-hospital.component.css',
})
export class NewHospitalComponent implements OnDestroy {
  public hospitalObj: Hospital = new Hospital();

  private subscriptions: Subscription[] = [];

  constructor(private hosptalServ: HospitalService) {}

  onRegister() {
    console.log(this.hospitalObj);

    this.subscriptions.push(
      this.hosptalServ.registerHospital(this.hospitalObj).subscribe(
        (res: ApiResponseModel) => {
          if (res.result) {
            alert('Hospital Registration Success');
          } else {
            alert(res.message);
          }
        },
        (error) => {
          alert(JSON.stringify(error));
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
