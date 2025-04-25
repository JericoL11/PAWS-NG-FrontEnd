import { ContactDisplay ,ContactCreate } from "./contact"
import { PetCreate } from "./pet"

export interface PersonDisplay{
    fullName: string
    firstName: string,
    lastName: string,
    middleName: string,
    email: string,
    homeAddress: string,
    iContacts: ContactDisplay[]
}

export interface PersonCreate{
    firstName: string,
    lastName: string,
    middleName: string,
    gender: number,
    birthDate: Date,
    email: string,
    homeAddress: string,
    contacts: ContactCreate[],
}
