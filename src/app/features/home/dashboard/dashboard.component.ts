import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../core/services/books.service';
import { Book } from '../../../core/models/books.model';
import { APP_CONSTANTS } from '../../../core/utils/app.constants';
import { MatSnackBar } from '@angular/material/snack-bar';

// DashboardComponent provides the main dashboard interface for users.
// It displays a welcome message, lists books by category, and allows users to add books to
// their library. It uses the BookService to fetch book data and MatSnackBar for user notifications.

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  showWelcomeMessage = false;
  bookItem: Book[] = [];
  selectedCategory: string | null = null;

  constructor(private bookService: BookService, private snackBar: MatSnackBar) {}

  // ngOnInit is called when the component is initialized.
  // It shows a welcome message for a brief period and fetches the list of books from 
  // the BookService. The welcome message duration is defined in APP_CONSTANTS.
  ngOnInit() {
    this.showWelcomeMessage = true;
    setTimeout(() => {
      this.showWelcomeMessage = false;
    }, APP_CONSTANTS.SNACKBAR_DURATION);  //  using constant

    this.bookService.getBooks().subscribe((data) => {
      this.bookItem = data;
    });
  }

  // Getter for unique book categories.
  // It uses a Set to ensure categories are unique and returns them as an array.
  get uniqueCategories(): string[] {
    return [...new Set(this.bookItem.map(b => b.category))];
  }

  // getBooksByCategory filters the bookItem array by the selected category.
  // It returns an array of books that match the specified category.
  getBooksByCategory(category: string) {
    return this.bookItem.filter(b => b.category === category);
  }

  // toggleCategory toggles the selected category.
  toggleCategory(category: string) {
    this.selectedCategory = this.selectedCategory === category ? null : category;
  }

  // addBookToLibrary adds a book to the user's library.
  // It calls the addToUserLibrary method from the BookService and shows a snackbar notification
  addBookToLibrary(bookId: string) {
    this.bookService.addToUserLibrary(bookId).subscribe({
      next: (res) => {
        this.snackBar.open('🎉 Yay! You just added a book to your collection!', 'Close',{
          duration:3000,
          panelClass:['cute-snackbar']
        });
      },
      error: (err) => {
         this.snackBar.open('Oops! Could not add the book.', 'Close', {
        duration: 3000,
        panelClass: ['cute-snackbar']
      });
      }
    });
  }
}
