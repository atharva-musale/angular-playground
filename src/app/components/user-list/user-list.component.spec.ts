import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { UserListComponent } from './user-list.component';
import { UserDataService } from '../../services';
import { UserNamePipe } from '../../pipes';
import { ShowIfDirective } from '../../directives';
import { UnserDataServiceFixtures } from '../../services/fixtures';
import { mockUsers } from '../../models';
import { clickElementByClass, getElementByClass, getNumberOfElementsByClass, getTextContentFromElementByClass } from '../../testing';
import { vi } from 'vitest';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userDataServiceFixture: UnserDataServiceFixtures;

  const mockRouter = { navigate: ([]: any[]) => {} };

  beforeEach(async () => {
    userDataServiceFixture = new UnserDataServiceFixtures();

    await TestBed.configureTestingModule({
      imports: [UserListComponent, UserNamePipe, ShowIfDirective],
      providers: [
        { provide: UserDataService, useValue: userDataServiceFixture },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    vi.spyOn(mockRouter, 'navigate');

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display page when users are not added, should show user not found instead', async () => {
    const userList = await firstValueFrom(component.users$);

    expect(userList.length).toBe(0);
    const page = getElementByClass(fixture, 'page-container');
    const userNotFoundText = getTextContentFromElementByClass(fixture, 'user-not-found-text');
    expect(page).toBeFalsy();
    expect(userNotFoundText).toBe('Please add users to see this page.');
  });

  it('should display list of users when users are present', async () => {
    userDataServiceFixture.users$.next(mockUsers);
    fixture.detectChanges();

    const userList = await firstValueFrom(component.users$);
    const page = getElementByClass(fixture, 'page-container');
    const userNotFoundText = getElementByClass(fixture, 'user-not-found-text');

    expect(userList.length).toBe(5);
    expect(getNumberOfElementsByClass(fixture, 'user-item')).toBe(5);
    expect(page).toBeTruthy();
    expect(userNotFoundText).toBeFalsy();
  });

  it('should navigate to user detail page when a user item is clicked', async () => {
    userDataServiceFixture.users$.next(mockUsers);
    fixture.detectChanges();

    clickElementByClass(fixture, 'user-item');
    fixture.detectChanges();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/users', 1]);
  });
});
