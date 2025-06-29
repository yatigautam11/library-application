import { Component, computed, effect, signal, OnInit, inject } from '@angular/core';
import { Book } from '../../../core/models/books.model';
import { BookService } from '../../../core/services/books.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APP_CONSTANTS } from '../../../core/utils/app.constants';
import { BookFormDialogComponent } from '../book-form-dialog/book-form-dialog.component';
import { ConfirmationDialogComponent } from '../../library/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-book-admin',
  standalone : false,
  templateUrl: './book-admin.component.html',
  styleUrls: ['./book-admin.component.scss']
})
export class BookAdminComponent implements OnInit {
  private bookService = inject(BookService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  //writwable signals 
  books = signal<Book[]>([]); 
  searchTerm = signal('');
  selectedCategory = signal('');

  //computed signal as deriving values from other signals
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

 
  categories = computed(() =>
    [...new Set(this.books().map(book => book.category || 'Uncategorized'))]
  );

  //logs whenever the books changes
  constructor() {
    effect(() => {
      console.log('Books updated:', this.books());
    });
  }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(books => this.books.set(books));
  }

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
          books[index] = result;
          this.snackBar.open(APP_CONSTANTS.MESSAGES.BOOK_UPDATED, 'Close', {
            duration: APP_CONSTANTS.SNACKBAR_DURATION
          });
        } else {
          this.bookService.addBook(result).subscribe(newBook => {
          books.push(newBook);
          this.books.set(books);
          this.snackBar.open(APP_CONSTANTS.MESSAGES.BOOK_ADDED, 'Close', {
            duration: APP_CONSTANTS.SNACKBAR_DURATION
          });
        });
        }
        // this.books.set(books);
        // this.bookService.saveBooks(books);
      }
    });
  }

  editBook(book: Book): void {
    this.openBookForm(book);
  }

  deleteBook(bookId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    width: '350px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
    const books = this.books().filter(b => b.id !== bookId);
    this.books.set(books);
    this.bookService.saveBooks(books);
    this.snackBar.open(APP_CONSTANTS.MESSAGES.BOOK_DELETED, 'Close', {
      duration: APP_CONSTANTS.SNACKBAR_DURATION
    });
  }
   });
}

//   isAdmin(): boolean {
//   return localStorage.getItem('userEmail') === 'admin@example.com';
// }
}