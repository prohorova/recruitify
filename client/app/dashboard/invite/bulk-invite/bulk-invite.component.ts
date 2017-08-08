import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { MdDialog } from '@angular/material';
import { InviteListComponent } from './invite-list/invite-list.component';

@Component({
  selector: 'app-bulk-invite',
  templateUrl: 'bulk-invite.component.html',
  styleUrls: ['bulk-invite.component.css']
})
export class BulkInviteComponent implements OnInit {

  @ViewChild('file') file: ElementRef;

  customers: any[];

  constructor(private dialog: MdDialog) { }

  ngOnInit() {
  }

  processWorkbook(workbook) {
    const sheetName = workbook.SheetNames[0];
    this.customers = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    this.file.nativeElement.value = null;
    this.dialog.open(InviteListComponent, {
      data: {
        customers: this.customers
      }
    })
  }

  upload(e) {
    const files = e.target.files;
    let i,f;
    for (i = 0, f = files[i]; i != files.length; ++i) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target['result'];

        const workbook = XLSX.read(data, {type: 'binary'});
        this.processWorkbook(workbook);
      };
      reader.readAsBinaryString(f);
    }
  }

}
