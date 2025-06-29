import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFormDialogComponent } from './book-form-dialog.component';

describe('BookFormDialogComponent', () => {
  let component: BookFormDialogComponent;
  let fixture: ComponentFixture<BookFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
