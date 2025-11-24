import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserDataService } from '../../services';
import { Observable } from 'rxjs';
import { User } from '../../models';
import { AsyncPipe } from '@angular/common';
import { ShowIfDirective } from '../../directives';
import { UserNamePipe } from '../../pipes';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

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
