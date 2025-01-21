import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueAddUserComponent } from './dialogue-add-user.component';

describe('DialogueAddUserComponent', () => {
  let component: DialogueAddUserComponent;
  let fixture: ComponentFixture<DialogueAddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogueAddUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogueAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
