import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { UserDataService } from '../../../services';
import { User } from '../../../models';
import { UserNamePipe } from '../../../pipes';

@Component({
  selector: 'app-user',
  imports: [UserNamePipe, AsyncPipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  /** Observable of the currently selected user */
  public user$: Observable<User | null>;

  constructor(private userService: UserDataService) {
    this.user$ = this.userService.selectedUser$;
  }
}
