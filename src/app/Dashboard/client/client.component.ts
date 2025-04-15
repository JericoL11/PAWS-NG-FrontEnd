import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../Shared/client.service';
import { CommonModule } from '@angular/common';
import { OwnerDisplayDto } from '../../models/owner';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-client',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {

  //instantiate List
  Owners: OwnerDisplayDto[] =[];
// Array to hold contact numbers
contactNumbers: string[] = [''];

personForm!: FormGroup;

  constructor(public service: ClientService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.personForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      middleName: [''],
      gender: [''],
      birthDate: [''],
      homeAddress: [''],
      emailAddress: ['', [Validators.email]],
      contacts: this.fb.array([this.createContactControl()]) // Initialize with one contact
    });
  }

  get contacts(): FormArray {
    return this.personForm.get('contacts') as FormArray;
  }

  createContactControl(): FormGroup {
    return this.fb.group({
      contactNo: ['', [Validators.required, Validators.maxLength(11)]]
    });
  }

  addContact(): void {
    this.contacts.push(this.createContactControl());
  }

  removeContact(index: number): void {
    if (this.contacts.length > 1) {
      this.contacts.removeAt(index);
    }
  }

  onSubmit(): void {
    console.log(this.personForm.value);
  }
}

  // Method to add additional contact input field
