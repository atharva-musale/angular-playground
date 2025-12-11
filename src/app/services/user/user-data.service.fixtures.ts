import { BehaviorSubject } from "rxjs";
import { User } from "../../models";
import { UserDataService } from "./user-data.service";
import { vi } from "vitest";

export class UnserDataServiceFixtures implements Readonly<UserDataService> {
  public users$ = new BehaviorSubject<User[]>([]);
  public currentUserCount$ = new BehaviorSubject(0);
  public selectedUser$ = new BehaviorSubject<User | null>(null);

  public setSelectedUser = vi.fn();
  public addUser = vi.fn();
}
