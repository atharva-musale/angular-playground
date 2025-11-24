import { Address } from "./address";
import { Gender } from "./gender";

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  age?: number;
  gender?: Gender;
  address: Address;
}

export const mockUsers: User[] = [
  {
    id: 1,
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    age: 30,
    gender: 'male',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'Anystate',
      pinCode: '12345'
    }
  },
  {
    id: 2,
    firstname: 'Jane',
    lastname: 'Smith',
    email: 'jane.smith@example.com',
    age: 28,
    gender: 'female',
    address: {
      street: '456 Elm St',
      city: 'Othertown',
      state: 'Otherstate',
      pinCode: '67890'
    }
  },
  {
    id: 3,
    firstname: 'Alice',
    lastname: 'Johnson',
    email: 'alice.johnson@example.com',
    age: 25,
    gender: 'female',
    address: {
      street: '789 Oak St',
      city: 'Sometown',
      state: 'Somestate',
      pinCode: '11223'
    }
  },
  {
    id: 4,
    firstname: 'Bob',
    lastname: 'Brown',
    email: 'bob.brown@example.com',
    age: 40,
    gender: 'male',
    address: {
      street: '101 Pine St',
      city: 'Newtown',
      state: 'Newstate',
      pinCode: '33445'
    }
  },
  {
    id: 5,
    firstname: 'Eve',
    lastname: 'Davis',
    email: 'eve.davis@example.com',
    age: 35,
    gender: 'female',
    address: {
      street: '202 Maple St',
      city: 'Oldtown',
      state: 'Oldstate',
      pinCode: '55667'
    }
  }
];
