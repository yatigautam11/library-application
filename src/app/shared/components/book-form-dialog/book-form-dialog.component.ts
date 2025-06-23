import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../../shared/models/books.model';
import { APP_CONSTANTS } from '../../../shared/constants/app.constants'; // ✅ Import constants

@Component({
  selector: 'app-book-form-dialog',
  standalone: false,
  templateUrl: './book-form-dialog.component.html',
  styleUrls: ['./book-form-dialog.component.scss']
})
export class BookFormDialogComponent {
  bookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BookFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { book: Book }
  ) {
    this.bookForm = this.fb.group({
      id: [data?.book?.id || crypto.randomUUID()],
      name: [data?.book?.name || '', Validators.required],
      author: [data?.book?.author || '', Validators.required],
      category: [data?.book?.category || '', Validators.required],
      image: [data?.book?.image || '', Validators.required]
    });
  }

  save() {
    if (this.bookForm.valid) {
      this.dialogRef.close(this.bookForm.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
