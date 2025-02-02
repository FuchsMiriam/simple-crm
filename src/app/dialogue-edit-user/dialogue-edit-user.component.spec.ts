import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueEditUserComponent } from './dialogue-edit-user.component';

describe('DialogueEditUserComponent', () => {
  let component: DialogueEditUserComponent;
  let fixture: ComponentFixture<DialogueEditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogueEditUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogueEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
