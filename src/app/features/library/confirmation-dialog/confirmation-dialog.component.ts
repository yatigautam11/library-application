import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

// ConfirmationDialogComponent is a simple dialog component that confirms user actions.
// It provides "Yes" and "No" buttons to confirm or cancel the action.    
@Component({
  selector: 'app-confirmation-dialog',
  standalone: false,
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {

  constructor(private dialogRef: MatDialogRef<ConfirmationDialogComponent>

  ){}

  onNo(){
    this.dialogRef.close(false);
  }

  onYes(){
    this.dialogRef.close(true);
  }
}
