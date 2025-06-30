import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// NotesDialogBoxComponent provides a dialog for adding or editing notes for a book.
// It allows users to enter a note and a summary, and handles saving or canceling the
@Component({
  selector: 'app-notes-dialog-box',
  standalone: false,
  templateUrl: './notes-dialog-box.component.html',
  styleUrl: './notes-dialog-box.component.scss'
})
export class NotesDialogBoxComponent {
 noteContent: string = '';
  summary: string = '';

  constructor(
    public dialogRef: MatDialogRef<NotesDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { bookId: string, existingNote?: any }
  ) {
    if (data.existingNote) {
      this.noteContent = data.existingNote.note;
      this.summary = data.existingNote.summary;
    }
  }

  // onSave is called when the user clicks the save button.
  // It closes the dialog and returns the book ID, note content, and summary.
  onSave(): void {
    this.dialogRef.close({
      bookId: this.data.bookId,
      note: this.noteContent,
      summary: this.summary
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
