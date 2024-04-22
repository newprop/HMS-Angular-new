import { Component, OnInit } from '@angular/core';
import { Emergency } from '../../../models/emergency';
import { EmergencyService } from '../../../services/emergency.service';
import { EditSettingsModel, FilterSettingsModel, PageSettingsModel, SearchSettingsModel, SelectionSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-emergency-list',
  templateUrl: './emergency-list.component.html',
  styleUrl: './emergency-list.component.css'
})
export class EmergencyListComponent implements OnInit {

  public emergency: Emergency[] = [];
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

  constructor(private service: EmergencyService) { }

  ngOnInit(): void {
    this.LoadData();
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.selectionOptions = { mode: 'Row', type: 'Single' };
    this.searchOptions = { fields: ['emergencyId', 'patientID', 'doctorID', 'departmentID'], operator: 'contains', ignoreCase: true, ignoreAccent: true };
  }

  LoadData() {
    this.service.GetEmergencys().subscribe((response: Emergency[]) => {
      this.emergency = response;
      console.log(response);
    }, (error) => {
      console.log('Observable emitted an error: ' + error);
    });
  }

  deleteEmergency(emargency: Emergency) {
    let confirmDelete: boolean = confirm(`Delete ${emargency.emergencyId}?`);
    if (confirmDelete) {
      this.service.DeleteEmergency(emargency.emergencyId).subscribe(() => {
        this.LoadData();
      }, (error) => {
        console.log('Observable emitted an error: ' + error);
      });
    }
  }
}
