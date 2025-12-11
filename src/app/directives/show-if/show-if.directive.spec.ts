import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowIfDirective } from './show-if.directive';
import { getElementByClass } from '../../testing';

@Component({
  selector: 'app-test-component',
  standalone: true,
  imports: [ShowIfDirective],
  template: `
    <div *showIf="!!condition" class="test-content">
      <p class="test-text">Visible content</p>
    </div>
  `
})
class TestComponent {
  condition: boolean | undefined | null = false;
}


describe('ShowIfDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, ShowIfDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new ShowIfDirective(
      {} as any,
      {} as any
    );
    expect(directive).toBeTruthy();
  });

  it('should not display content when condition is false', () => {
    component.condition = false;
    fixture.detectChanges();

    const element = getElementByClass(fixture, 'test-content');
    expect(element).toBeFalsy();
  });

  it('should display content when condition is true', () => {
    component.condition = true;
    fixture.detectChanges();

    const element = getElementByClass(fixture, 'test-content');
    expect(element).toBeTruthy();
  });

  it('should hide content when toggled from true to false', () => {
    component.condition = true;
    fixture.detectChanges();
    expect(getElementByClass(fixture, 'test-content')).toBeTruthy();

    component.condition = false;
    fixture.detectChanges();
    expect(getElementByClass(fixture, 'test-content')).toBeFalsy();
  });

  it('should not show content if variable is undefined', () => {
    component.condition = undefined;
    fixture.detectChanges();

    const element = getElementByClass(fixture, 'test-content');
    expect(element).toBeFalsy();
  });

  it('should not show content if variable is null', () => {
    component.condition = null;
    fixture.detectChanges();

    const element = getElementByClass(fixture, 'test-content');
    expect(element).toBeFalsy();
  });
});
