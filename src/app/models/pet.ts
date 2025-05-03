import { Gender, Specie } from "./enums";

export interface PetCreate {
    name: string;
    breed: string;
    birthDate: Date;
    gender: Gender;
    specie: Specie;
    //owner Id must be inserted in backend
  }



  export interface PetDisplay{
    petId: number,
    name: string,
    breed: string,
    birthDate: Date,
    gender: Gender,
    specie: Specie,
    ownerId: number
  }