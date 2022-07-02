import {Component, Inject, OnInit} from '@angular/core';
import {DialogData} from 'projects/administration/src/app/shared/models/DialogData';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close('cancel');
  }

  ngOnInit(): void {
  }

  onSaveClick() {
    this.dialogRef.close('ok');
  }
}
