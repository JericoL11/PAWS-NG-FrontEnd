import { Component, OnInit } from '@angular/core';
import { OwnerProfile } from '../../../models/owner';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../Shared/client.service';
import { CommonModule } from '@angular/common';
import { GenderPipe } from '../../../Shared/pipes/gender.pipe';
import { SpeciePipe } from '../../../Shared/pipes/specie.pipe';

@Component({
  selector: 'app-client-profile',
  imports: [CommonModule, GenderPipe, SpeciePipe],
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.css'
})
export class ClientProfileComponent implements OnInit {

  ownerId!: number;
  owner: OwnerProfile | null= null; // Non-null assertion, but use with caution

constructor(
  private route : ActivatedRoute,
  private ClientService: ClientService
) {}

ngOnInit(): void {
    this.ownerId = +this.route.snapshot.paramMap.get('id')!;  //This '+' converts the string "5" to the number 5.
    this.loadClientProfile();
}


loadClientProfile(): void {
  this.ClientService.getClientById(this.ownerId).subscribe({
    next: (res) => {
      this.owner = res,
      console.log(res)
    },
    error:(err) => console.error('failed to load owner', err)
    
  });
}

get contactNumbers(): string {
  return this.owner?.person?.iContacts?.map(c => c.phoneNumber).join(' | ') || '';
}

}
