import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../Shared/client.service';
import { CommonModule } from '@angular/common';
import { OwnerDisplay, CreateOwner } from '../../models/owner';
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
  Owners: OwnerDisplay[] =[];

  constructor(public service: ClientService) { }

  ngOnInit(): void {
    this.service.getOwner().subscribe({
      next: (res) => (this.Owners = res, console.log(res)),
      error: (err) => console.log(err),
    });
  }

// Handle the emitted event from the modal component
onOwnerCreated(newOwner: OwnerDisplay): void {
  this.Owners.push(newOwner); // Add the newly created owner to the list
}

}