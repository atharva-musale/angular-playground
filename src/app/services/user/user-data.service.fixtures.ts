import { BehaviorSubject } from "rxjs";
import { User } from "../../models";
import { UserDataService } from "./user-data.service";

export class UnserDataServiceFixtures implements Readonly<UserDataService> {
  public users$ = new BehaviorSubject<User[]>([]);
  public currentUserCount$ = new BehaviorSubject(0);
  public selectedUser$ = new BehaviorSubject<User | null>(null);

  public setSelectedUser = jasmine.createSpy('setSelectedUser');
  public addUser = jasmine.createSpy('addUser');
}
