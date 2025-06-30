import { Component, computed, effect, signal, OnInit, inject } from '@angular/core';
import { Book } from '../../../core/models/books.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APP_CONSTANTS } from '../../../core/utils/app.constants';
import { BookFormDialogComponent } from '../book-form-dialog/book-form-dialog.component';
import { ConfirmationDialogComponent } from '../../library/confirmation-dialog/confirmation-dialog.component';
import { BookAdminService } from '../../../core/services/book-admin.service';

/**
 * BookAdminComponent provides the admin interface for managing books.
 * - Allows searching, filtering, adding, editing, and deleting books.
 * - Uses signals and computed signals for reactive state management.
 * - Uses BookAdminService for all CRUD operations.
 */
@Component({
  selector: 'app-book-admin',
  standalone: false,
  templateUrl: './book-admin.component.html',
  styleUrls: ['./book-admin.component.scss']
})
export class BookAdminComponent implements OnInit {
  // Inject admin book service, dialog, and snackbar for CRUD and UI feedback
  private bookService = inject(BookAdminService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  // Writable signals
  books = signal<Book[]>([]);
  searchTerm = signal('');
  selectedCategory = signal('');

  // Computed signals
  filteredBooks = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const cat = this.selectedCategory();
    return this.books().filter(book =>
      (!term ||
        book.name?.toLowerCase().includes(term) ||
        book.author?.toLowerCase().includes(term)) &&
      (!cat || book.category === cat)
    );
  });

  /**
   * Computed signal for unique book categories.
   * Used for category filter dropdown.
   */
  categories = computed(() =>
    [...new Set(this.books().map(book => book.category || 'Uncategorized'))]
  );

  /**
   * Logs whenever the books signal changes (for debugging).
   */
  constructor() {
    effect(() => {
      console.log('Books updated:', this.books());
    });
  }

  /**
   * On component initialization, fetch all books from the server.
   * Handles both array and object API responses for flexibility.
   */
  ngOnInit(): void {
  this.bookService.getBooks().subscribe((response: any) => {
    console.log('Books API response:', response);
    if (Array.isArray(response)) {
      this.books.set(response);
    } else if (response && Array.isArray((response as any).books)) {
      this.books.set((response as any).books);
    } else {
      this.books.set([]); // fallback
    }
  });
}

// Opens the book form dialog for adding or editing a book.
  openBookForm(bookToEdit?: Book): void {
    const dialogRef = this.dialog.open(BookFormDialogComponent, {
      width: '600px',
      data: bookToEdit ? { book: bookToEdit } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const books = [...this.books()];
        const index = books.findIndex(b => b.id === result.id);
        if (index > -1) {
          // Update existing book
          this.bookService.updateBook(result).subscribe(updatedBook => {
            books[index] = updatedBook;
            this.books.set(books);
            this.snackBar.open(APP_CONSTANTS.MESSAGES.BOOK_UPDATED, 'Close', {
              duration: APP_CONSTANTS.SNACKBAR_DURATION
            });
          });
        } else {
          // Add new book
          this.bookService.createBook(result).subscribe(newBook => {
            books.push(newBook);
            this.books.set(books);
            this.snackBar.open(APP_CONSTANTS.MESSAGES.BOOK_ADDED, 'Close', {
              duration: APP_CONSTANTS.SNACKBAR_DURATION
            });
          });
        }
      }
    });
  }

  // Getter and setter for search term to use in template binding
  // This allows two-way binding with the input field in the template
  get searchTermValue() {
  return this.searchTerm();
}
set searchTermValue(val: string) {
  this.searchTerm.set(val);
}

// Opens the book form dialog for editing.
  editBook(book: Book): void {
    this.openBookForm(book);
  }

  // Deletes a book after confirmation dialog
  deleteBook(bookId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px'
    });

    // Pass the book ID to the confirmation dialog
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.deleteBook(bookId).subscribe(() => {
          const books = this.books().filter(b => b.id !== bookId);
          this.books.set(books);
          this.snackBar.open(APP_CONSTANTS.MESSAGES.BOOK_DELETED, 'Close', {
            duration: APP_CONSTANTS.SNACKBAR_DURATION
          });
        });
      }
    });
  }
}