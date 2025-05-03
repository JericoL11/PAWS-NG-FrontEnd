import { PersonCreate, PersonDisplay } from "./person";
import { PetCreate, PetDisplay } from "./pet";


  export interface OwnerDisplay{
    id: Number;
    person: PersonDisplay,
  }
  
  //create
  export interface CreateOwner {
    person: PersonCreate,
    pets: PetCreate[]
  }
  
  
  export interface OwnerProfile {
    ownerId: number;
    person: PersonDisplay;
    pets: PetDisplay[];
  }
  