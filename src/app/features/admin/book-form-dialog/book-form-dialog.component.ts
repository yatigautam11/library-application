import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../../core/models/books.model';

// BookFormDialogComponent provides a form for adding or editing books.
// It uses Angular Material Dialog for UI and FormBuilder for form management.

@Component({
  selector: 'app-book-form-dialog',
  standalone: false,
  templateUrl: './book-form-dialog.component.html',
  styleUrls: ['./book-form-dialog.component.scss']
})
export class BookFormDialogComponent {
  bookForm: FormGroup;

  // Define the form controls with default values and validators
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BookFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { book: Book }
  ) {
    this.bookForm = this.fb.group({
      id: [data?.book?.id || crypto.randomUUID()], // Generate a new ID if not provided
      name: [data?.book?.name || '', Validators.required], // Book name is required
      author: [data?.book?.author || '', Validators.required], // Author is required
      category: [data?.book?.category || '', Validators.required], // Category is required
      image: [data?.book?.image || '', Validators.required], // Image URL is required
      description: [''] // Description is optional
    });
  }

  // Save the book data if the form is valid
  save() {
    if (this.bookForm.valid) {
      this.dialogRef.close(this.bookForm.value);
    }
  }

  // Cancel the dialog without saving
  cancel() {
    this.dialogRef.close();
  }
}
