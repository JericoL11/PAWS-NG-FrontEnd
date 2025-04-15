import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../Shared/client.service';
import { CommonModule } from '@angular/common';
import { OwnerDisplayDto } from '../../models/owner';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AddUpdateModalComponent } from "./add-update-modal/add-update-modal.component"; // Import FormsModule

@Component({
  selector: 'app-client',
  imports: [CommonModule, ReactiveFormsModule, AddUpdateModalComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {

  //instantiate List
  Owners: OwnerDisplayDto[] =[];
// Array to hold contact numbers
contactNumbers: string[] = [''];

personForm!: FormGroup;


  constructor(public service: ClientService) { }

  ngOnInit(): void {
    this.service.getOwner().subscribe({
      next: (data) => (this.Owners = data, console.log(data)),
      error: (err) => console.log(err),
    });
  }
}