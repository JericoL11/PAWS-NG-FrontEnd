import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OwnerDisplay } from '../../../models/owner';
import { hasError, hasFormArrayError } from '../../../Shared/helpers/form-validations';
import { ClientService } from '../../../Shared/client.service';

// 👇 Tell TypeScript about Bootstrap
declare var bootstrap: any;

@Component({
  selector: 'app-add-owner-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-owner-modal.component.html',
  styleUrl: './add-owner-modal.component.css'
})
export class AddOwnerModalComponent {
  @Output() ownerCreated = new EventEmitter<OwnerDisplay>(); // Emit OwnerDisplay when created
  @ViewChild('addOwnerModal', { static: false }) modalRef!: ElementRef;

  // Helper functions
  hasError = hasError;
  hasFormArrayError = hasFormArrayError;

  CreateOwnerForm!: FormGroup;

  constructor(public service: ClientService, private fb: FormBuilder) {}

  closeModal() {
    const modal = bootstrap.Modal.getInstance(this.modalRef.nativeElement);
    if (modal) {
      modal.hide(); // ✅ Close the modal
    }
  }
  
  
  ngOnInit(): void {
    this.initializeFromAddEdit();
  }

  initializeFromAddEdit() {
    this.CreateOwnerForm = this.fb.group({
      person: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        middleName: [''],
        email: ['', Validators.email],
        gender: [null, Validators.required],
        birthDate: [null, Validators.required],
        homeAddress: ['', Validators.required],
        contacts: this.fb.array([this.createContact()])
      }),
      pets: this.fb.array([this.createPets()])
    });
  }

  // 🧱 Create one contact field (like a contact row)
  createContact(): FormGroup {
    return this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.maxLength(11)]]
    });
  }

  createPets(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      birthDate: ['', Validators.required],
      breed: ['', Validators.required],
      gender: [null, Validators.required],
      specie: [null, Validators.required]
    });
  }

  // Accessor for the array (used in HTML)
  get contacts(): FormArray {
    return this.CreateOwnerForm.get('person.contacts') as FormArray;
  }

  get pets(): FormArray {
    return this.CreateOwnerForm.get('pets') as FormArray;
  }

  // ➕ Add another contact input
  addContact(): void {
    if (this.contacts.length < 3) {
      this.contacts.push(this.createContact());
    }
  }

  addPet(): void {
    this.pets.push(this.createPets());
  }

  // ❌ Remove contact at a specific index
  removeContact(index: number): void {
    if (this.contacts.length > 1) {
      this.contacts.removeAt(index);
    }
  }

  removePet(index: number): void {
    if (this.pets.length > 1) {
      this.pets.removeAt(index);
    }
  }

  closeModalReset() {
    this.CreateOwnerForm.reset();
    while (this.contacts.length > 1) {
      this.contacts.removeAt(1);
    }
    while (this.pets.length > 1) {
      this.pets.removeAt(1);
    }
  }

  

  onSubmit(): void {
    if (this.CreateOwnerForm.invalid) {
      this.CreateOwnerForm.markAllAsTouched();
      return;
    }

    const payload = this.CreateOwnerForm.getRawValue();
    payload.person.gender = Number(payload.person.gender);
    payload.pets.forEach((pet: any) => {
      pet.gender = Number(pet.gender);
      pet.specie = Number(pet.specie);
    });

    this.service.postOwner(payload).subscribe({
      next: (res: OwnerDisplay) => {
        alert('Owner added!');
        this.closeModal(); // 👈 Close modal on success
        this.ownerCreated.emit(res);
      },
      error: (err) => {
        console.error(err);
        alert('Something went wrong');
      }
    });
  }
}
