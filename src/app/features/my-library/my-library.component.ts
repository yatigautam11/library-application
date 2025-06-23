import { Component, OnInit } from '@angular/core';
import { BookService } from '../../core/services/books.service';
import { UserServiceService } from '../../core/services/user-service.service';
import { Book } from '../../shared/models/books.model';
import { MatDialog } from '@angular/material/dialog';
import { NotesDialogBoxComponent } from '../../shared/components/notes-dialog-box/notes-dialog-box.component';
import { APP_CONSTANTS } from '../../shared/constants/app.constants'; 

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
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.bookService.getUserLibraryFromServer().subscribe(userBooks => {
      this.books = userBooks;
      this.categories = [...new Set(this.books.map(book => book.category))];
    });
  }

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

  addToLibrary(bookId: string) {
    this.bookService.addToUserLibrary(bookId).subscribe(userBooks => {
      this.books = userBooks;
    });
  }

  removeFromLibrary(bookId: string) {
    this.bookService.removeFromUserLibrary(bookId).subscribe(() => {
      this.books = this.books.filter(book => book.id !== bookId);
    });
  }

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

  isInUserLibrary(bookId: string): boolean {
    return this.books.some(b => b.id === bookId);
  }

  onToggleLike(id: string) {
    this.bookService.toggleLike(id);
  }

  onUpdateProgress(event: { id: string, progress: 'to-read' | 'in-progress' | 'finished' }) {
    this.bookService.updateProgress(event.id, event.progress);
  }

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
