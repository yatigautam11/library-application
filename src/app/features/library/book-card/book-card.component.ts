import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../../core/models/books.model';
import { UserServiceService } from '../../../core/services/user-service.service';
import { APP_CONSTANTS, BookProgress } from '../../../core/utils/app.constants';

@Component({
  selector: 'app-book-card',
  standalone: false,
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
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

  readonly BOOK_PROGRESS = APP_CONSTANTS.BOOK_PROGRESS;

  constructor(private notesService: UserServiceService) {}

  ngOnInit() {
    const savedNote = this.notesService.getNote(this.book.id);
    this.note = savedNote.note;
    this.summary = savedNote.summary;
  }

  onProgressChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedProgress = selectElement.value as BookProgress;
    this.updateProgress.emit({
      id: this.book.id,
      progress: selectedProgress
    });
  }

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
