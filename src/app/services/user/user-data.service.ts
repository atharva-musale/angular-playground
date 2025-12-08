import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { mockUsers, User } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private usersSubject$ = new BehaviorSubject(mockUsers);
  /**
   * Observable stream of users list
   */
  public users$ = this.usersSubject$.asObservable();

  /**
   * Observable stream of current user count
   */
  public currentUserCount$: Observable<number>;

  private selectedUserSubject$ = new BehaviorSubject<User | null>(null);

  /**
   * Observable stream of selected user
   */
  public selectedUser$ = this.selectedUserSubject$.asObservable();

  constructor() {
    this.currentUserCount$ = this.users$.pipe(
      map(users => users.length)
    );
  }

  /**
   * Sets the selected user
   *
   * @param user user info
   */
  public setSelectedUser(user: User) {
    const currentListOfUsers = this.usersSubject$.getValue();
    if (currentListOfUsers.map(u => u.id).includes(user.id)) {
      this.selectedUserSubject$.next(user);
    }
  }

  /**
   * Adds a new user to the list of users.
   *
   * @param user user info
   */
  public addUser(userData: Omit<User, 'id'>) {
    const newUser = this.createNewUser(userData);
    const currentUsers = this.usersSubject$.getValue();
    this.usersSubject$.next([...currentUsers, newUser]);
  }

  private createNewUser(userData: Omit<User, 'id'>): User {
    const newUserId = this.usersSubject$.getValue().length + 1;
    return {
      ...userData,
      id: newUserId
    };
  }
}
