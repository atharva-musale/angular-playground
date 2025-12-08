import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { firstValueFrom } from 'rxjs';
import { ShowIfDirective } from '../../directives';
import { clickElementByClass, getElementByClass } from '../../testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, ShowIfDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display purple highlight section when component loads', () => {
    const hSec = getElementByClass(fixture, 'purple-highlight');

    expect(hSec).toBeTruthy();
  })

  it('should hide highlight section when hide button is clicked', async () => {
    clickElementByClass(fixture, 'hide-button');
    fixture.detectChanges();
    const show = await firstValueFrom(component.showHighlightedSection$)
    const highlightSection = getElementByClass(fixture, 'purple-highlight');

    expect(show).toBeFalse();
    expect(highlightSection).toBeFalsy();
  });

  it('should show highlight section when show button is clicked', async () => {
    // First hide the section
    clickElementByClass(fixture, 'hide-button');
    fixture.detectChanges();

    expect(getElementByClass(fixture, 'purple-highlight')).toBeFalsy();

    // Then show it again
    clickElementByClass(fixture, 'show-button');
    fixture.detectChanges();
    const highlightSection = getElementByClass(fixture, 'purple-highlight');
    const show = await firstValueFrom(component.showHighlightedSection$);

    expect(show).toBeTrue();
    expect(highlightSection).toBeTruthy();
  });
});
