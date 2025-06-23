import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesDialogBoxComponent } from './notes-dialog-box.component';

describe('NotesDialogBoxComponent', () => {
  let component: NotesDialogBoxComponent;
  let fixture: ComponentFixture<NotesDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotesDialogBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
