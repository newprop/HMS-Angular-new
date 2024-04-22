import { Component, OnInit } from '@angular/core';
import { Staff } from '../../../models/staff';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonApiService } from '../../../services/common.api.service';
import { StaffService } from '../../../services/staff.service';
import { ImageUpload } from '../../../models/ImageUpload';
import { EditSettingsModel, FilterSettingsModel, PageSettingsModel, SearchSettingsModel, SelectionSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.component.html',
  styleUrl: './staff-edit.component.css'
})
export class StaffEditComponent implements OnInit {
  public model: Staff = new Staff();
  public staffId!: number;
  public shiftTypes: string[] = [];
  public editSettings?: EditSettingsModel;

  public pageSettings: PageSettingsModel = { pageSize: 5 };
  public filterSettings: FilterSettingsModel = { type: 'FilterBar' };

  public toolbarOptions?: ToolbarItems[] = ['Search',
    //'Print',
    'ColumnChooser',
    //'Add', 'Edit', 'Delete', 'Update', 'Cancel',
    //'PdfExport',
    //'ExcelExport',
    //'CsvExport'
  ];

  public selectionOptions?: SelectionSettingsModel;
  public searchOptions?: SearchSettingsModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonApiService,
    private staffService: StaffService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.staffId = +params['id'];
      this.getStaffDetails(this.staffId);
      this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
      this.selectionOptions = { mode: 'Row', type: 'Single' };
      this.searchOptions = { fields: ['staffId', 'staffName', 'designation', 'imagePath'], operator: 'contains', ignoreCase: true, ignoreAccent: true };
    });
    this.commonService.GetShiftTypes().subscribe((data: string[]) => {
      this.shiftTypes = data;
    });
  }

  getStaffDetails(id: number): void {
    this.staffService.getStaff(id).subscribe(
      (data: Staff) => {
        this.model = data;
        this.model.imageUpload = new ImageUpload();
        if (data.imagePath) {
         
          this.model.imageUpload.imageData = data.imagePath;
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  onSubmit(): void {
    this.staffService.updateStaff(this.model).subscribe(
      () => {
        this.router.navigate(['/StaffList']);
      },
      error => {
        console.error(error);
      }
    );
  }
  uploadImage(imageInput: any): void {
    const file: File = imageInput.files[0];
    //if (file.size > 200 * 1024) {
    //  alert('Max allowed size is 200KB');
    //  return;
    //}
    // Assuming this.staff.imageUpload is an instance of a service/utility
    // class with a method called getBase64 for converting image to base64
    this.model.imageUpload.getBase64(file);

  }
}
