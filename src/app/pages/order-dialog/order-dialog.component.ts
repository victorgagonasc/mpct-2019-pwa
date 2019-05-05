import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent {
  orderForm: FormGroup;
  oldOrder = null;

  constructor(
    public dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      if (!data.order) {
        data.order = { id: null, item: '', price: null, timeToGetReady: null };
        this.oldOrder = data.order;
      }
    }

    onCancelClick(): void {
      this.dialogRef.close();
    }

}
