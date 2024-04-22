
import { Staff } from '../../../models/staff';
import { StaffService } from '../../../services/staff.service';
import { CommonApiService } from '../../../services/common.api.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff-create',
  templateUrl: './staff-create.component.html',
  styleUrl: './staff-create.component.css'
})
export class StaffCreateComponent implements OnInit {
  public model: Staff = new Staff();
  public shiftTypes: string[] = [];

  constructor(
    private staffService: StaffService,
    private commonService: CommonApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.model = new Staff();
    this.commonService.GetShiftTypes().subscribe((data: string[]) => {
      this.shiftTypes = data;
    });
  }

  onSubmit(): void {
    this.staffService.createStaff(this.model).subscribe({
      next: () => {
        this.router.navigate(['/StaffList']);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  uploadImage(imageInput: any): void {
    const file: File = imageInput.files[0];
    if (file.size > 200 * 1024) {
      alert('Max allowed size is 200KB');
      return;
    }
    // Assuming this.staff.imageUpload is an instance of a service/utility
    // class with a method called getBase64 for converting image to base64
    this.model.imageUpload.getBase64(file);
  }
}
