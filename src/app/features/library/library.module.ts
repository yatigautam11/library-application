import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryRoutingModule } from './library-routing.module';
import { MyLibraryComponent } from './my-library/my-library.component';
import { BookCardComponent } from './book-card/book-card.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HighlightDirective } from '../../shared/directive/highlight.directive';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../../shared/shared.module';
import { ShortenPipe } from '../../shared/pipes/shorten.pipe';

// LibraryModule provides the main interface for users to interact with their library.
// It includes components for viewing and managing books, and uses Angular Material for UI components.
@NgModule({
  declarations: [
    HighlightDirective,
    MyLibraryComponent,
    BookCardComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    SharedModule,
  ],
  exports: [
    // also export it if needed in components that import this module
    MatCardModule
  ]
})
export class LibraryModule { }
