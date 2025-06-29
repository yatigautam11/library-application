import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/books.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { APP_CONSTANTS } from '../utils/app.constants'; // Adjust path as needed

@Injectable({ providedIn: 'root' })
export class BookAdminService {
  private baseUrl = APP_CONSTANTS.API_ENDPOINTS.USER_BOOKS;

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl);
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.baseUrl, book);
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/${book.id}`, book);
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
