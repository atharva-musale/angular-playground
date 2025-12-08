import { TestBed } from '@angular/core/testing';

import { UserDataService } from './user-data.service';
import { firstValueFrom } from 'rxjs';
import { mockUsers, User } from '../../models';

const mockNewUser: Omit<User, 'id'> = {
  firstname: 'Test',
  lastname: 'User',
  email: 'test.user@example.com',
  age: 35,
  gender: 'male',
  address: {
    street: '789 Test St',
    city: 'Testtown',
    state: 'Teststate',
    pinCode: '11111'
  }
};

describe('UserDataService', () => {
  let service: UserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the list of users and set the length properly', async () => {
    const users = await firstValueFrom(service.users$);
    const count = await firstValueFrom(service.currentUserCount$);

    expect(count).toBe(5);
    expect(users.length).toBe(5);
  });

  it('should upadte the user list and count when a new user is added', async () => {
    service.addUser(mockNewUser);
    const users = await firstValueFrom(service.users$);
    const count = await firstValueFrom(service.currentUserCount$);

    expect(count).toBe(6);
    expect(users.length).toBe(6);
    expect(users[5].firstname).toBe('Test');
    expect(users[5].id).toBe(6);
  });

  it('should set the selected user properly', async () => {
    const users = await firstValueFrom(service.users$);
    const userToSelect = users[2];

    service.setSelectedUser(userToSelect);
    const selectedUser = await firstValueFrom(service.selectedUser$);

    expect(selectedUser).toEqual(userToSelect);
  });

  it('should not set the selected user if the user does not exist in the list', async () => {
    service.setSelectedUser({
      id: 999,
      firstname: 'Non',
      lastname: 'Existent',
      email: 'non.existent@example.com',
      age: 40,
      gender: 'female',
      address: {
        street: '000 Nowhere St',
        city: 'Nowhere',
        state: 'Nostate',
        pinCode: '00000'
      }
    });
    const selectedUser = await firstValueFrom(service.selectedUser$);

    expect(selectedUser).toBeNull();
  });

  it('should set the selected user properly after adding a new user', async () => {
    service.setSelectedUser(mockUsers[2]);
    const selectedUser = await firstValueFrom(service.selectedUser$);

    expect(selectedUser).toEqual(mockUsers[2]);
  });
});
