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

@NgModule({
  declarations: [
    BookAdminComponent,
    BookFormDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SharedModule
  ]
})
export class AdminModule { }
