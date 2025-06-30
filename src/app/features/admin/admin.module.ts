import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { BookAdminComponent } from './book-admin/book-admin.component';
import { BookFormDialogComponent } from './book-form-dialog/book-form-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ShortenPipe } from '../../shared/pipes/shorten.pipe';
import { SharedModule } from '../../shared/shared.module';

// AdminModule provides the admin interface for managing books.
// It includes components for book management and uses Angular Material for UI.
@NgModule({
  declarations: [
    BookAdminComponent, // BookAdminComponent provides the admin interface for managing books.
    BookFormDialogComponent // BookFormDialogComponent provides a form for adding or editing books.
  ],
  imports: [
    CommonModule, // CommonModule provides common directives like ngIf and ngFor.
    AdminRoutingModule,// AdminRoutingModule defines the routes for the admin feature module.
    ReactiveFormsModule, // ReactiveFormsModule enables reactive form features for form management.
    FormsModule, // FormsModule provides template-driven form features.
    MatDialogModule, // MatDialogModule provides dialog features for displaying forms in a modal.
    MatFormFieldModule, // MatFormFieldModule provides form field features for input controls.
    MatInputModule, // MatInputModule provides input features for text fields.
    MatButtonModule, // MatButtonModule provides button features for form submission and actions.
    SharedModule // SharedModule contains shared components and pipes used across the application.
  ]
})
export class AdminModule { }
