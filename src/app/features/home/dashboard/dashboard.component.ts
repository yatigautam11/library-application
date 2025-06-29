import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../core/services/books.service';
import { Book } from '../../../core/models/books.model';
import { APP_CONSTANTS } from '../../../core/utils/app.constants';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  ngOnInit() {
    this.showWelcomeMessage = true;
    setTimeout(() => {
      this.showWelcomeMessage = false;
    }, APP_CONSTANTS.SNACKBAR_DURATION);  // ✅ using constant

    this.bookService.getBooks().subscribe((data) => {
      this.bookItem = data;
    });
  }

  get uniqueCategories(): string[] {
    return [...new Set(this.bookItem.map(b => b.category))];
  }

  getBooksByCategory(category: string) {
    return this.bookItem.filter(b => b.category === category);
  }

  toggleCategory(category: string) {
    this.selectedCategory = this.selectedCategory === category ? null : category;
  }

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
