import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../Shared/client.service';
import { OwnerDisplay } from '../../../models/owner';
import { PagedResponse } from '../../../models/pagedResponse';
import { AddOwnerModalComponent } from "../add-owner-modal/add-owner-modal.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-home',
  imports: [CommonModule, ReactiveFormsModule, AddOwnerModalComponent,FormsModule, RouterModule],
  templateUrl: './client-home.component.html',
  styleUrl: './client-home.component.css'
})
export class ClientHomeComponent implements OnInit {

  searchText: string = '';
  pageSize: number = 5  ;
  pageNumber = 1;  // Default page number
 


  totalCount: number = 0; // <-- total number of owners coming from API

  //instantiate List
  Owners: OwnerDisplay[] = [];

  constructor(
    private router: Router,
    private service: ClientService
  ) { }

  ngOnInit(): void {
    this.loadOwners();
  }


  loadOwners(): void {
    this.service.getOwner(this.searchText, this.pageNumber, this.pageSize).subscribe({
      next: (res: PagedResponse<OwnerDisplay>) => {
        this.Owners = res.data;
        this.totalCount = res.totalCount;

        console.log(this.Owners);
      },
      error: (err) => console.log(err),
    });
  }
  
onSearch (): void {
  this.pageNumber = 1;  // Reset to first page when searching
  this.loadOwners();
}

viewProfile(ownerId : Number) : void {
    // Navigates to: /dashboard/client/profile/:id
    this.router.navigate(['dashboard', 'client', 'profile', ownerId]);
}

goToPreviousPage(): void {
  if (this.pageNumber > 1) {
    this.pageNumber--;
    this.loadOwners();
  }
}

goToNextPage(): void {
  this.pageNumber++;
  this.loadOwners();
}

changePageSize(event: Event): void {
  const value = (event.target as HTMLSelectElement).value;
  this.pageSize = Number(value);
  this.pageNumber = 1; // Reset to first page
  this.loadOwners();
}

// Helper property to check if there is a next page
get hasNextPage(): boolean {
  return this.pageNumber < this.totalPages;
}

// Helper property to check if there is a previous page
get hasPreviousPage(): boolean {
  return this.pageNumber > 1;
}

// Calculate total pages
get totalPages(): number {
  return Math.ceil(this.totalCount / this.pageSize);
}


// Handle the emitted event from the modal component
onOwnerCreated(newOwner: OwnerDisplay): void {
  this.Owners.push(newOwner); // Add the newly created owner to the list
}
}
