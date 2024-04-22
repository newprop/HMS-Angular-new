//import { Component } from '@angular/core';
//import { Doctor } from '../../../models/doctor';
//import { DoctorService } from '../../../services/Doctor.Service';


//@Component({
//  selector: 'app-doctor-list',
//  templateUrl: './doctor-list.component.html',
//  styleUrl: './doctor-list.component.css'
//})
//export class DoctorListComponent {
//  public doctor: Doctor[] = [];
//  constructor(private doctorService: DoctorService) {

//  }
//  ngOnInit(): void {
//    this.LoadData();
//  }

//  LoadData() {
//    this.doctorService.getAllDoctors().subscribe((response: Doctor[]) => {
//      this.doctor = response;
//      console.log(response);
//    },
//      (error:any) => {
//        console.log('Observable emitted an error:' + error);

//      });
//  }

//  deleteDoctor(doctor: Doctor) {
//    let confirmDelete: boolean = confirm(`Delete: ${doctor.name}?`);

//    if (confirmDelete) {

//      this.doctorService.deleteDoctor(doctor.doctorId).subscribe(() => {
//        alert('test');
//        this.LoadData();
//      },
//        (error) => {
//          console.log('Observable emitted an error:' + error);
//        });
//    }

//  }
//}
import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../../models/doctor';
import { DoctorService } from '../../../services/Doctor.Service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css'] // Change here
})
export class DoctorListComponent implements OnInit {
  public doctors: Doctor[] = [];

  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.doctorService.getAllDoctors().subscribe(
      (response: Doctor[]) => {
        this.doctors = response;
        console.log(response);
      },
      (error: any) => {
        console.log('Observable emitted an error:' + error);
      }
    );
  }

  deleteDoctor(doctor: Doctor) {
    let confirmDelete: boolean = confirm(`Delete: ${doctor.name}?`);

    if (confirmDelete) {
      this.doctorService.deleteDoctor(doctor.doctorId).subscribe(
        () => {
          alert('Doctor deleted successfully');
          this.loadData();
        },
        (error) => {
          console.log('Observable emitted an error:' + error);
        }
      );
    }
  }
}

