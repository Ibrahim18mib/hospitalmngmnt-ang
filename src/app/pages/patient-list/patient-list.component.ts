import { Component } from '@angular/core';
import { AppointmentService } from '../../core/services/appointment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css',
})
export class PatientListComponent {
  valObjKeys: any;
  valObjEntries: any;
  getfilterApidetails: any;
  getMultipleCallData: any;
  getApiTypeValue: any;
  foundKey: any[] = [];
  constructor(private apiServ: AppointmentService) {}

  onClick() {
    this.apiServ.getApiId().subscribe((res) => {
      console.log(res, 'apiresponse');
      console.log(res[0].apidetails, 'apidetails');
      console.log(res[0].multipleCallData, 'multipleCallData');
      this.getfilterApidetails = res[0].apidetails;
      this.getMultipleCallData = res[0].multipleCallData[0].value;
      console.log(res[0].multipleCallData[0].value, 'this.getMultipleCallData');
      this.getApiTypeValue;
      this.getfilterApidetails.forEach((elem: any) => {
        console.log(elem, 'eleTYPER');
        if (elem.type) {
          this.getApiTypeValue = elem.type.value;
          console.log(elem.type.value, 'elem.type.value');
        }
      });

      const multipleCallData = res[0].multipleCallData;

      if (multipleCallData[0].key == this.getApiTypeValue) {
        let multiKeyFound = multipleCallData[0].key;

        multipleCallData[0].value.forEach((valres: any) => {
          console.log('valREsP', valres);
          this.valObjKeys = Object.keys(valres);
        });
      }
      console.log('obj.keys', this.valObjKeys);
      let concatenateKey = this.valObjKeys.join('');
      // let concatenateKey = ['fieldToBeUpdatedname'];
      this.getLoadData(concatenateKey);
    });
  }

  async getLoadData(concateKey: any) {
    debugger;
    this.getfilterApidetails.forEach((getimp: any) => {
      console.log('getImportobj', getimp.raw);
      if (getimp?.raw?.ImportAcademyStudentDraw) {
        const importDraw = getimp.raw.ImportAcademyStudentDraw;
        console.log(importDraw, 'importDraw');
        this.valObjEntries = Object.entries(importDraw);
        console.log(this.valObjEntries, 'valObjectEntries');
      }

      // let resultKey = null;
      // this.valObjEntries.forEach(([key, value]: any) => {
      //   if (typeof value === 'string' && value.includes(concateKey[0])) {
      //     resultKey = key;
      //     this.foundKey.push(resultKey);
      //   }
      // });

      let restt = null;
      // const foundEntry = this.valObjEntries.find(([key, value]:any) => value.includes(concateKey));
      this.valObjEntries.forEach(([key, value]: any) => {
        if (typeof value === 'string' && value.includes(concateKey[0])) {
          restt = key;
          this.foundKey.push(restt);
        }
      });
    });
    console.log('fouundeddjkey', this.foundKey);

    const uniqueValues = this.foundKey.filter((item, index, self) => {
      return self.indexOf(item) === index;
    });
    console.log('uniqueValues', uniqueValues);

    this.finalFunc(uniqueValues);
  }

  finalFunc(getUniqueKeys: any) {
    debugger;
    this.getMultipleCallData.forEach((res: any) => {
      this.getfilterApidetails.forEach((apires: any) => {
        if (
          apires?.type.value == this.getApiTypeValue &&
          apires?.raw?.ImportAcademyStudentDraw
        ) {
          let matchKeys = Object.entries(apires?.raw?.ImportAcademyStudentDraw);

          matchKeys.forEach(([key, val]: any) => {
            if (getUniqueKeys.includes(key)) {
              if (key === 'CivilIdNumber') {
                val = res.id;
              }

              if (key === 'StudentName') {
                val = res.name;
              }
              debugger;
              const body = {
                data: apires?.raw?.ImportAcademyStudentDraw,
              };

              this.apiServ.postApiId(apires?.url, body.data);
            }
          });
        }
      });
    });
  }
}
