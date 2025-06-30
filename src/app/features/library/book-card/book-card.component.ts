import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../../core/models/books.model';
import { UserServiceService } from '../../../core/services/user-service.service';
import { APP_CONSTANTS, BookProgress } from '../../../core/utils/app.constants';

// BookCardComponent displays a card for each book in the user's library.
// It allows users to toggle wishlist status, like status, update reading progress, view and edit notes, and remove the book from their library.
// It uses UserServiceService to manage user notes and summaries.
@Component({
  selector: 'app-book-card',
  standalone: false,
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  // BookCardComponent is used to display individual book details in the user's library.
  @Input() book!: Book;

  @Output() toggleWishlist = new EventEmitter<string>();
  @Output() toggleLike = new EventEmitter<string>();
  @Output() updateProgress = new EventEmitter<{
    id: string;
    progress: BookProgress;
  }>();
  @Output() openNotes = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();

  isEditing = false;
  note = '';
  summary = '';
  showNotes = false;

  // BOOK_PROGRESS is a constant that contains the available book progress options.
  readonly BOOK_PROGRESS = APP_CONSTANTS.BOOK_PROGRESS;

  constructor(private notesService: UserServiceService) {}

  // ngOnInit is called when the component is initialized.
  // It retrieves the saved note and summary for the book from UserServiceService.
  ngOnInit() {
    const savedNote = this.notesService.getNote(this.book.id);
    this.note = savedNote.note;
    this.summary = savedNote.summary;
  }

  // on progress change updates the book's progress based on user selection.
  onProgressChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedProgress = selectElement.value as BookProgress;
    this.updateProgress.emit({
      id: this.book.id,
      progress: selectedProgress
    });
  }

  //
  onRemoveClick() {
    this.remove.emit(this.book.id);
  }


  viewMyNotes() {
    this.showNotes = !this.showNotes;
  }

  editNote() {
    this.isEditing = true;
  }

  saveNote() {
    this.notesService.saveNote(this.book.id, {
      note: this.note,
      summary: this.summary
    });
    this.isEditing = false;
  }

  cancelEdit() {
    const savedNote = this.notesService.getNote(this.book.id);
    this.note = savedNote.note;
    this.summary = savedNote.summary;
    this.isEditing = false;
  }
}
