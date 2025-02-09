import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueEditDepartmentComponent } from './dialogue-edit-department.component';

describe('DialogueEditDepartmentComponent', () => {
  let component: DialogueEditDepartmentComponent;
  let fixture: ComponentFixture<DialogueEditDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogueEditDepartmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogueEditDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
