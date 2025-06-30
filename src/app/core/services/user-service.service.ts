import { Injectable } from '@angular/core';
import { APP_CONSTANTS } from '../utils/app.constants'; 

/**
 * UserServiceService manages user notes and summaries for books.
 * - Stores notes and summaries in localStorage under a single key.
 * - Provides methods to get, set, and retrieve all notes.
 */
@Injectable({ providedIn: 'root' })
export class UserServiceService {
  // The localStorage key for storing user notes
  private storageKey = APP_CONSTANTS.LOCAL_STORAGE_KEYS.USER_NOTES;

  // Retrieves all user notes from localStorage.
  private get userNotes(): { [bookId: string]: { note: string; summary: string } } {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : {};
  }

  // Saves all user notes to localStorage.
  private set userNotes(notes: { [bookId: string]: { note: string; summary: string } }) {
    localStorage.setItem(this.storageKey, JSON.stringify(notes));
  }

  // Retrieves a specific note and summary for a book by its ID.
  getNote(bookId: string): { note: string; summary: string } {
    return this.userNotes[bookId] || { note: '', summary: '' };
  }

  // Retrieves all notes and summaries for all books.
  getAllNotes(): { [bookId: string]: { note: string; summary: string } } {
    return this.userNotes;
  }

  // Saves a note and summary for a specific book by its ID.
  saveNote(bookId: string, data: { note: string; summary: string }) {
    const notes = this.userNotes;
    notes[bookId] = data;
    this.userNotes = notes;
  }
}
