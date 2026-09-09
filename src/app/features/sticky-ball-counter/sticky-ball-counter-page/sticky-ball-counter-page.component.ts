import { Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { BallCounterComponent } from '../ball-counter/ball-counter.component';

@Component({
  selector: 'app-sticky-ball-counter-page',
  imports: [],
  standalone: true,
  templateUrl: './sticky-ball-counter-page.component.html',
  styleUrl: './sticky-ball-counter-page.component.css',
})
export class StickyBallCounterPageComponent {
  @ViewChild('canvas', { read: ElementRef })
  public canvas?: ElementRef<HTMLDivElement>;

  @ViewChild('ballCounterContainer', { read: ViewContainerRef })
  public ballCounterContainer?: ViewContainerRef;

  public onCanvasClick(event: MouseEvent) {
    if (!this.canvas || !this.ballCounterContainer) {
      return;
    }

    const canvasRect = this.canvas.nativeElement.getBoundingClientRect();
    const clickPositionX = event.clientX - canvasRect.left;
    const clickPositionY = event.clientY - canvasRect.top;
    const ballCounterRef = this.ballCounterContainer.createComponent(BallCounterComponent);
    const ballCounterElement = ballCounterRef.location.nativeElement as HTMLElement;

    ballCounterElement.style.position = 'absolute';
    ballCounterElement.style.left = `${clickPositionX}px`;
    ballCounterElement.style.top = `${clickPositionY}px`;
  }
}
