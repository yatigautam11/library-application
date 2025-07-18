import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../core/services/books.service';
import { UserServiceService } from '../../../core/services/user-service.service';
import { Book } from '../../../core/models/books.model';
import { MatDialog } from '@angular/material/dialog';
import { NotesDialogBoxComponent } from '../../../shared/components/notes-dialog-box/notes-dialog-box.component';
import { APP_CONSTANTS } from '../../../core/utils/app.constants'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

// MyLibraryComponent is the main component for managing the user's book library.
// It allows users to view, search, filter, and manage their books, including adding/rem
@Component({
  selector: 'app-my-library',
  standalone: false,
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.scss']
})
export class MyLibraryComponent implements OnInit {
  notesList: { bookId: string; bookName: string; note: string; summary: string }[] = [];
  isEditing: { [bookId: string]: boolean } = {};
  categories: string[] = [];
  searchTerm: string = '';
  books: Book[] = [];
  noteContent: string = '';
  activeNoteBookId: string | null = null;
  selectedCategory: string = '';
  selectedProgress: string = '';

  constructor(
    private bookService: BookService,
    private notesService: UserServiceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

// ngOnInit is called when the component is initialized.
// It fetches the user's library from the server and initializes the books and categories.
  ngOnInit(): void {
    this.bookService.getUserLibraryFromServer().subscribe(userBooks => {
      const likedBooks: string[]= JSON.parse(localStorage.getItem('likedBooks') || '[]');
      this.books = userBooks.map(book => ({
        ...book,
        likes: likedBooks.includes(book.id)
      }));
      this.categories = [...new Set(this.books.map(book => book.category))];
    });
  }

// filteredBooks returns the list of books based on the search term, selected category, and selected progress.
  filteredBooks() {
    return this.books.filter(book => {
      const matchesSearch = this.searchTerm
        ? book.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          book.author?.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      const matchesCategory = this.selectedCategory
        ? book.category === this.selectedCategory
        : true;

      const matchesProgress = this.selectedProgress
        ? book.progress === this.selectedProgress
        : true;

      return matchesSearch && matchesCategory && matchesProgress;
    });
  }

  // addToLibrary adds a book to the user's library and updates the books list.
  // It uses the BookService to add the book and updates the local books array.
  addToLibrary(bookId: string) {
    this.bookService.addToUserLibrary(bookId).subscribe(userBooks => {
      this.books = userBooks;
    });
  }

  // removeFromLibrary opens a confirmation dialog before removing a book from the user's library.
  removeFromLibrary(bookId: string) {
    const dialogRef= this.dialog.open(ConfirmationDialogComponent, {
      width:'350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
    this.bookService.removeFromUserLibrary(bookId).subscribe(() => {
      this.books = this.books.filter(book => book.id !== bookId);
      this.snackBar.open('You removed a book. ', 'Close'), {duration : 3000}
    });
  }
});
  }

  // viewMyNotes retrieves all notes from the user's library and formats them for display.
  viewMyNotes() {
    const allNotes = this.notesService.getAllNotes();
    this.notesList = Object.entries(allNotes).map(([bookId, data]) => {
      const book = this.books.find(b => b.id === bookId);
      return {
        bookId,
        bookName: book?.name || 'Unknown Book',
        note: data.note,
        summary: data.summary
      };
    });
  }

  // isInUserLibrary checks if a book is already in the user's library.
  isInUserLibrary(bookId: string): boolean {
    return this.books.some(b => b.id === bookId);
  }

  // onToggleWishlist toggles the wishlist status of a book and updates the local storage.
  onToggleLike(id: string) {
    const book= this.books.find(b => b.id===id);
    if(!book) return;
    book.likes= !book.likes;
    this.bookService.updateLikedBooksInStorage(id, book.likes);
    this.snackBar.open(
      book.likes ? 'You liked this book!' : 'You unliked this book',
      'Close',
      {duration : 3000}
    );
    
  }

  
  onUpdateProgress(book: Book, newProgress: "to-read" | "in-progress" | "finished") {
  book.progress = newProgress;
}

// getActiveNoteBook retrieves the currently active notebook based on the activeNoteBookId.
  getActiveNoteBook(): Book | undefined {
    return this.books.find(b => b.id === this.activeNoteBookId!);
  }

  openNotesDialog(bookId: string) {
    const existingNote = this.notesService.getNote(bookId);

    const dialogRef = this.dialog.open(NotesDialogBoxComponent, {
      width: '500px',
      data: { bookId, existingNote }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notesService.saveNote(result.bookId, {
          note: result.note,
          summary: result.summary
        });
      }
    });
  }
}
