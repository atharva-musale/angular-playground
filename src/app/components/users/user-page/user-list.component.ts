import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ShowIfDirective } from '../../../directives';
import { User } from '../../../models';
import { UserNamePipe } from '../../../pipes';
import { UserDataService } from '../../../services';

@Component({
  selector: 'app-user-list',
  imports: [AsyncPipe, ShowIfDirective, UserNamePipe, RouterOutlet, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  /**
   * List of users
   */
  public users$: Observable<User[]>;

  constructor (
    private userService: UserDataService,
    private router: Router
  ) {
    this.users$ = this.userService.users$;
  }

  /**
   * Navigates to the user page
   *
   * @param user user info
   */
  public goToUserPage(user: User): void {
    console.log('Navigating to user page for:', user);
    this.userService.setSelectedUser(user);
    this.router.navigate(['/users', user.id]);
  }
}
