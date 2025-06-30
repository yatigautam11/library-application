import { BehaviorSubject, map, Observable, of, tap } from "rxjs";
import { Book } from "../models/books.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { APP_CONSTANTS } from "../utils/app.constants"; // ✅ Import the constants

@Injectable({ providedIn: 'root' })
export class BookService {
  private books: Book[] = []; // all available books
  private userLibrary: Book[] = [];
  private booksSubject = new BehaviorSubject<Book[]>(this.loadBooks());

  constructor(private http: HttpClient) {}
// Get the list of all books
  getBooks(): Observable<Book[]> {
    if (this.books.length > 0) return of(this.books);

    return this.http.get<{ books: Book[] }>(APP_CONSTANTS.API_ENDPOINTS.BOOKS).pipe(
      tap(res => this.books = res.books),
      map(res => res.books)
    );
  }

  //
  addToLibrary(book: Book) {
    if (!this.userLibrary.find(b => b.id === book.id)) {
      this.userLibrary.push({ ...book, inLibrary: true, progress: 'to-read', likes: false, notes: '' });
    }
  }

  // Get the list of books in the user's library
  getUserLibrary(): Book[] {
    return this.userLibrary;
  }

  // Toggle the like status of a book in the user's library
  toggleLike(bookId: string) {
    const book = this.userLibrary.find(b => b.id === bookId);
    if (book) book.likes = !book.likes;
  }

  // Update the progress of a book in the user's library
  updateProgress(bookId: string, progress: 'to-read' | 'in-progress' | 'finished') {
    const book = this.userLibrary.find(b => b.id === bookId);
    if (book) book.progress = progress;
  }

  // Save notes for a book in the user's library
  saveNote(bookId: string, note: string) {
    const book = this.userLibrary.find(b => b.id === bookId);
    if (book) book.notes = note;
  }

  //save the books to localStorage
  saveBooks(books: Book[]): void {
    localStorage.setItem('books', JSON.stringify(books));
    this.booksSubject.next(books);
  }

  //get the notes from the user library
  getNote(bookId: string): string {
    return this.userLibrary.find(b => b.id === bookId)?.notes ?? '';
  }

  // Fetch the user's library from the server
  getUserLibraryFromServer(): Observable<Book[]> {
    return this.http.get<{ books: Book[] }>(APP_CONSTANTS.API_ENDPOINTS.USER_BOOKS).pipe(
      tap(res => this.userLibrary = res.books),
      map(res => res.books)
    );
  }

  // Add a book to the user's library
  addToUserLibrary(bookId: string): Observable<Book[]> {
    return this.http.put<{ userbooks: Book[] }>(APP_CONSTANTS.API_ENDPOINTS.USER_BOOKS, { placeId: bookId }).pipe(
      tap(res => this.userLibrary = res.userbooks),
      map(res => res.userbooks)
    );
  }

  // Remove a book from the user's library
  removeFromUserLibrary(bookId: string): Observable<Book[]> {
    return this.http.delete<{ userbooks: Book[] }>(`${APP_CONSTANTS.API_ENDPOINTS.USER_BOOKS}/${bookId}`).pipe(
      tap(res => this.userLibrary = res.userbooks),
      map(res => res.userbooks)
    );
  }
// Add a new book to the main books collection on the server
  addBook(book: Book): Observable<Book> {
  return this.http.post<Book>('http://localhost:3000/books', book);
}
//load books from localStorage
   private loadBooks(): Book[] {
    const stored = localStorage.getItem('books');
    return stored ? JSON.parse(stored) : [];
  }

  // Update the liked books in localStorage
  public updateLikedBooksInStorage(bookId: string, liked: boolean){
    const likedBooks: string[] = JSON.parse(localStorage.getItem('likedBooks') || '[]');
    if(liked && !likedBooks.includes(bookId)){
      likedBooks.push(bookId);
      } else if(!liked){
        const idx = likedBooks.indexOf(bookId);
        if(idx> -1) likedBooks.splice(idx,1);
      }
      localStorage.setItem('likedBooks', JSON.stringify(likedBooks));
    }
  
}
