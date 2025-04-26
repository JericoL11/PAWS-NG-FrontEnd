import { ContactDisplay } from "./contact";
import { PersonCreate, PersonDisplay } from "./person";
import { PetCreate } from "./pet";


  export interface OwnerDisplay{
    id: Number;
    person: PersonDisplay,
  }
  
  //create
  export interface CreateOwner {
    person: PersonCreate,
    pets: PetCreate[]
  }
  
  //edit
  export interface SelectedOwner {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    address: string;
    email: string;
    contacts: ContactDisplay[];
    iPet: PetCreate[];
  }
  