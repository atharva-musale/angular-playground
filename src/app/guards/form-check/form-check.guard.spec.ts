import { TestBed } from '@angular/core/testing';
import { FormCheckGuard } from './form-check.guard';
import { FormValidator } from '../../models';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mock-form-component',
  standalone: true,
  template: ``
})
class MockFormComponent implements FormValidator {
  public valid = true;

  isValid(): boolean {
    return this.valid;
  }
}

describe('FormCheckGuard', () => {
  let guard: FormCheckGuard;
  let mockComponent: MockFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormCheckGuard,
        MockFormComponent
      ]
    });

    guard = TestBed.inject(FormCheckGuard);
    mockComponent = TestBed.inject(MockFormComponent);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canDeactivate', () => {
    it('should return true when form is valid', () => {
      const result = guard.canDeactivate(mockComponent);

      expect(result).toBe(true);
    });

    it('should return false when form is invalid', () => {
      mockComponent.valid = false;
      const result = guard.canDeactivate(mockComponent);

      expect(result).toBe(false);
    });
  });
});
