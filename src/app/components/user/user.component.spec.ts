import { ComponentFixture, TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { UserComponent } from './user.component';
import { UserDataService } from '../../services';
import { User } from '../../models';
import { UserNamePipe } from '../../pipes';
import { UnserDataServiceFixtures } from '../../services/fixtures';
import { getElementByClass, getTextContentFromElementByClass } from '../../testing';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let mockUserDataService: UnserDataServiceFixtures;

  const mockUser: User = {
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
  };

  beforeEach(async () => {
    mockUserDataService = new UnserDataServiceFixtures();

    await TestBed.configureTestingModule({
      imports: [UserComponent, UserNamePipe],
      providers: [
        { provide: UserDataService, useValue: mockUserDataService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display anything if selected user is not set', async () => {
    const user = await firstValueFrom(component.user$);

    expect(user).toBeNull();
    const userElement = getElementByClass(fixture, 'user-name');
    expect(userElement).toBeFalsy();
  });

  it('should display user full name when a user is selected', async () => {
    mockUserDataService.selectedUser$.next(mockUser);
    fixture.detectChanges();

    await fixture.whenStable();

    const user = await firstValueFrom(component.user$);
    const userElement = getElementByClass(fixture, 'user-name');
    const userNameText = getTextContentFromElementByClass(fixture, 'user-name');

    expect(user).toEqual(mockUser);

    expect(userElement).toBeTruthy();
    expect(userNameText).toBe('Hello John Doe');
  });
});
