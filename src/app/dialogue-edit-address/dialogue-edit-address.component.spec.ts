import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueEditAddressComponent } from './dialogue-edit-address.component';

describe('DialogueEditAddressComponent', () => {
  let component: DialogueEditAddressComponent;
  let fixture: ComponentFixture<DialogueEditAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogueEditAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogueEditAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
