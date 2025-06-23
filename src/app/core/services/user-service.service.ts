import { Injectable } from '@angular/core';
import { APP_CONSTANTS } from '../../shared/constants/app.constants'; // ✅ Adjust the path if needed

@Injectable({ providedIn: 'root' })
export class UserServiceService {
  private storageKey = APP_CONSTANTS.LOCAL_STORAGE_KEYS.USER_NOTES;

  private get userNotes(): { [bookId: string]: { note: string; summary: string } } {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : {};
  }

  private set userNotes(notes: { [bookId: string]: { note: string; summary: string } }) {
    localStorage.setItem(this.storageKey, JSON.stringify(notes));
  }

  getNote(bookId: string): { note: string; summary: string } {
    return this.userNotes[bookId] || { note: '', summary: '' };
  }

  getAllNotes(): { [bookId: string]: { note: string; summary: string } } {
    return this.userNotes;
  }

  saveNote(bookId: string, data: { note: string; summary: string }) {
    const notes = this.userNotes;
    notes[bookId] = data;
    this.userNotes = notes;
  }
}
