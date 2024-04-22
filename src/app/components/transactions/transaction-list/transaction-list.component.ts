import { Component } from '@angular/core';
import { TransactionsService } from '../../../services/transactions.service';
import { Transaction } from '../../../models/transaction';
import { EditSettingsModel, FilterSettingsModel, PageSettingsModel, SearchSettingsModel, SelectionSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent {
  public transactions: Transaction[] = [];
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
  constructor(private transactionsService: TransactionsService) { }

  ngOnInit(): void {
    this.LoadData();
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.selectionOptions = { mode: 'Row', type: 'Single' };
    this.searchOptions = { fields: ['transactionId', 'transactionDate', 'description', 'amount','paidAmount'], operator: 'contains', ignoreCase: true, ignoreAccent: true };
  }

  LoadData() {
    this.transactionsService.GetAllTransactions().subscribe((response: Transaction[]) => {
      this.transactions = response;
      console.log(response);
    }, (error) => {
      console.log('Observable emitted an error: ' + error);
    });
  }


  DeleteTransaction(transaction: Transaction) {
    let confirmDelete: boolean = confirm(`Delete ${transaction.transactionId}?`);
    if (confirmDelete) {
      this.transactionsService.DeleteTransaction(transaction.transactionId).subscribe(() => {
        this.LoadData();
      }, (error) => {
        console.log('Observable emitted an error: ' + error);
      });
    }
  }
}
