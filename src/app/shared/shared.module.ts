import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NotesDialogBoxComponent } from './components/notes-dialog-box/notes-dialog-box.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { ShortenPipe } from './pipes/shorten.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    PageNotFoundComponent,
    NotesDialogBoxComponent,
    HeaderComponent,
    ShortenPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    NavbarComponent,
    PageNotFoundComponent,
    NotesDialogBoxComponent,
    HeaderComponent,
    ShortenPipe
  ]
})
export class SharedModule { }
