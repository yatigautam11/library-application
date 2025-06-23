import { map, Observable, of, tap } from "rxjs";
import { Book } from "../../shared/models/books.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { APP_CONSTANTS } from "../../shared/constants/app.constants"; // ✅ Import the constants

@Injectable({ providedIn: 'root' })
export class BookService {
  private books: Book[] = []; // all available books
  private userLibrary: Book[] = [];

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    if (this.books.length > 0) return of(this.books);

    return this.http.get<{ books: Book[] }>(APP_CONSTANTS.API_ENDPOINTS.BOOKS).pipe(
      tap(res => this.books = res.books),
      map(res => res.books)
    );
  }

  addToLibrary(book: Book) {
    if (!this.userLibrary.find(b => b.id === book.id)) {
      this.userLibrary.push({ ...book, inLibrary: true, progress: 'to-read', likes: false, notes: '' });
    }
  }

  getUserLibrary(): Book[] {
    return this.userLibrary;
  }

  toggleLike(bookId: string) {
    const book = this.userLibrary.find(b => b.id === bookId);
    if (book) book.likes = !book.likes;
  }

  updateProgress(bookId: string, progress: 'to-read' | 'in-progress' | 'finished') {
    const book = this.userLibrary.find(b => b.id === bookId);
    if (book) book.progress = progress;
  }

  saveNote(bookId: string, note: string) {
    const book = this.userLibrary.find(b => b.id === bookId);
    if (book) book.notes = note;
  }

  getNote(bookId: string): string {
    return this.userLibrary.find(b => b.id === bookId)?.notes ?? '';
  }

  getUserLibraryFromServer(): Observable<Book[]> {
    return this.http.get<{ books: Book[] }>(APP_CONSTANTS.API_ENDPOINTS.USER_BOOKS).pipe(
      tap(res => this.userLibrary = res.books),
      map(res => res.books)
    );
  }

  addToUserLibrary(bookId: string): Observable<Book[]> {
    return this.http.put<{ userbooks: Book[] }>(APP_CONSTANTS.API_ENDPOINTS.USER_BOOKS, { placeId: bookId }).pipe(
      tap(res => this.userLibrary = res.userbooks),
      map(res => res.userbooks)
    );
  }

  removeFromUserLibrary(bookId: string): Observable<Book[]> {
    return this.http.delete<{ userbooks: Book[] }>(`${APP_CONSTANTS.API_ENDPOINTS.USER_BOOKS}/${bookId}`).pipe(
      tap(res => this.userLibrary = res.userbooks),
      map(res => res.userbooks)
    );
  }
}
