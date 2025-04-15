import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-update-modal',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-update-modal.component.html',
  styleUrl: './add-update-modal.component.css'
})
export class AddUpdateModalComponent implements OnInit{

personForm! : FormGroup;

constructor( private fb:FormBuilder ){}

  ngOnInit(): void {
    this.personForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['',Validators.required],
      middleName: [''],
      email: ['', Validators.email],
      gender: [''],
      address: [''],
      birthDate: [''],

      // 💡 Contacts as a dynamic array
      contacts: this.fb.array([this.createContact()])
    })
  }

   // 🧱 Create one contact field (like a contact row)
  createContact(): FormGroup{
    return this.fb.group({
      number: ['', [Validators.required, Validators.maxLength(11)]]
    });
  }


  // Accessor for the array (used in HTML)
  get contacts(): FormArray{
    return this.personForm.get('contacts') as FormArray;
  }

  // ❌ Remove contact at a specific index
  removeContact(index: number): void {
    if (this.contacts.length > 1) {
      this.contacts.removeAt(index);
    }
  }

 // ➕ Add another contact input
 addContact(): void {
  if(this.contacts.length < 3){
    this.contacts.push(this.createContact());
  }
  
}

  // 🚀 Submit form (e.g., send to API)
  onSubmit(): void {
    console.log(this.personForm.value); // This contains contacts[] as array
  }
}

