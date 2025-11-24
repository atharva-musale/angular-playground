import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HighlightTextDirective, ShowIfDirective } from '../../directives';

@Component({
  selector: 'app-home',
  imports: [HighlightTextDirective, AsyncPipe, ShowIfDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  /**
   * To keep state of whether to display or hide highlighted section
   */
  private toggleHighlightedSectionSubject$ = new BehaviorSubject(true);
  public showHighlightedSection$ = this.toggleHighlightedSectionSubject$.asObservable();

  constructor() {}

  public primaryButtonClicked() {
    this.toggleHighlightedSectionSubject$.next(true);
  }

  public secondaryButtonClicked() {
    this.toggleHighlightedSectionSubject$.next(false);
  }
}
