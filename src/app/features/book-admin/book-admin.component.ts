import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Book } from '../../shared/models/books.model';
import { BookFormDialogComponent } from '../../shared/components/book-form-dialog/book-form-dialog.component';
import { BookService } from '../../core/services/books.service';
import { APP_CONSTANTS } from '../../shared/constants/app.constants'; 

@Component({
  selector: 'app-book-admin',
  standalone: false,
  templateUrl: './book-admin.component.html',
  styleUrls: ['./book-admin.component.scss']
})
export class BookAdminComponent implements OnInit {
  books: Book[] = [];
  categories: string[] = [];
  searchTerm = '';
  selectedCategory = '';

  constructor(private dialog: MatDialog, private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(books => {
  this.books = books;
  this.categories = [...new Set(books.map(book => book.category || 'Uncategorized'))];
});

  }

  openBookForm(bookToEdit?: Book): void {
    const dialogRef = this.dialog.open(BookFormDialogComponent, {
      width: '600px',
      data: bookToEdit ? { book: bookToEdit } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.books.findIndex(b => b.id === result.id);
        if (index > -1) {
          this.books[index] = result; // update
        } else {
          this.books.push(result); // add
        }
      }
    });
  }

  editBook(book: Book): void {
    this.openBookForm(book);
  }

  deleteBook(bookId: string): void {
    this.books = this.books.filter(b => b.id !== bookId);
    // Optionally: persist deletion to server
  }

  filteredBooks(): Book[] {
    return this.books.filter(book =>
      (!this.searchTerm ||
        book.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        book.author?.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (!this.selectedCategory || book.category === this.selectedCategory)
    );
  }
}
