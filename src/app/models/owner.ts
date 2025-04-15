export interface ContactDto {
    id: number;
    contactNo: string;
  }
  
  export interface OwnerDisplayDto {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    address: string;
    email: string;
    contacts: ContactDto[];
  }
