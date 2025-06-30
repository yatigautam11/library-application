import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/books.model';
import { Observable } from 'rxjs';

/**
 * BookAdminService handles all CRUD operations for books in the admin panel.
 * - Uses the /books endpoint for all operations.
 * - Returns observables for async HTTP operations.
 */
@Injectable({ providedIn: 'root' })
export class BookAdminService {
  private baseUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {}

  /**
   * Fetch all books.
   */
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl);
  }

  // Fetch a single book by ID.
  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`);
  }
// Create a new book.
  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.baseUrl, book);
  }

  // Update an existing book.
  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/${book.id}`, book);
  }

  // Delete a book by ID.
  deleteBook(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}