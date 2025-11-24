import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { ShowIfDirective } from '../../directives';

function getElementWithTestId(fixture: ComponentFixture<HomeComponent>, testAttribute: string) {
  return fixture.debugElement.query(By.css(`[data-test-id="${testAttribute}"]`))?.nativeElement;
}

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
    const hSec = getElementWithTestId(fixture, 'purple-highlight');

    expect(hSec).toBeTruthy();
  })

  it('should hide highlight section when hide button is clicked', async () => {
    const hideBtn = getElementWithTestId(fixture, 'hideButton');
    hideBtn.click();
    fixture.detectChanges();
    const show = await firstValueFrom(component.showHighlightedSection$)

    expect(show).toBeFalse();
  })
});
