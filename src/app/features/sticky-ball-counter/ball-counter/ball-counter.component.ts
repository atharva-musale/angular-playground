import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { interval, map, of, startWith } from 'rxjs';

@Component({
  selector: 'app-ball-counter',
  imports: [AsyncPipe],
  templateUrl: './ball-counter.component.html',
  styleUrl: './ball-counter.component.css',
})
export class BallCounterComponent {
  @Input()
  public startingCount = 0;

  public currentCount$ = of(0);

  public ngOnInit() {
    this.currentCount$ = interval(1000).pipe(
      startWith(this.startingCount),
      map((count) => count + 1)
    );
  }
}
