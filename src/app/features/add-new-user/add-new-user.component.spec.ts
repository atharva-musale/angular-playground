import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewUserComponent } from './add-new-user.component';
import { UserDataService } from '../../services';
import { UnserDataServiceFixtures } from '../../services/fixtures';
import { ReactiveFormsModule } from '@angular/forms';
import { clickElementByClass, getElementByClass, getTextContentFromElementByClass } from '../../testing';

describe('AddNewUserComponent', () => {
  let component: AddNewUserComponent;
  let fixture: ComponentFixture<AddNewUserComponent>;
  let userDataServiceFixture: UnserDataServiceFixtures;

  beforeEach(async () => {
    userDataServiceFixture = new UnserDataServiceFixtures();

    await TestBed.configureTestingModule({
      imports: [AddNewUserComponent, ReactiveFormsModule],
      providers: [
        { provide: UserDataService, useValue: userDataServiceFixture }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form properly', async () => {
    const formValue = component.userForm.value;
    const firstnameInputContainer = getElementByClass(fixture, 'firstname-input-container');
    const lastnameInputContainer = getElementByClass(fixture, 'lastname-input-container');
    const emailInputContainer = getElementByClass(fixture, 'email-input-container');
    const ageInputContainer = getElementByClass(fixture, 'age-input-container');
    const genderInputContainer = getElementByClass(fixture, 'gender-input-container');
    const addressFormContainer = getElementByClass(fixture, 'address-form-container');
    const streetInputContainer = getElementByClass(fixture, 'street-input-container');
    const cityInputContainer = getElementByClass(fixture, 'city-input-container');
    const stateInputContainer = getElementByClass(fixture, 'state-input-container');
    const pincodeInputContainer = getElementByClass(fixture, 'pincode-input-container');

    expect(component.userForm).toBeDefined();
    expect(formValue.firstname).toBe('');
    expect(formValue.lastname).toBe('');
    expect(formValue.email).toBe('');
    expect(formValue.address.street).toBe('');
    expect(formValue.address.city).toBe('');
    expect(formValue.address.state).toBe('');
    expect(formValue.address.pincode).toBe('');

    expect(firstnameInputContainer).toBeTruthy();
    expect(lastnameInputContainer).toBeTruthy();
    expect(emailInputContainer).toBeTruthy();
    expect(ageInputContainer).toBeTruthy();
    expect(genderInputContainer).toBeTruthy();
    expect(addressFormContainer).toBeTruthy();
    expect(streetInputContainer).toBeTruthy();
    expect(cityInputContainer).toBeTruthy();
    expect(stateInputContainer).toBeTruthy();
    expect(pincodeInputContainer).toBeTruthy();
  });

  it('should have error if required fields are empty', () => {
    component.userForm.markAllAsTouched();
    fixture.detectChanges();

    const firstnameError = getTextContentFromElementByClass(fixture, 'firstname-error');
    const lastnameError = getTextContentFromElementByClass(fixture, 'lastname-error');
    const emailError = getTextContentFromElementByClass(fixture, 'email-error');
    const streetError = getTextContentFromElementByClass(fixture, 'street-error');
    const cityError = getTextContentFromElementByClass(fixture, 'city-error');
    const stateError = getTextContentFromElementByClass(fixture, 'state-error');
    const pincodeError = getTextContentFromElementByClass(fixture, 'pincode-error');

    expect(firstnameError).toBe('Please enter a valid firstname');
    expect(lastnameError).toBe('Please enter a valid lastname');
    expect(emailError).toBe('Please enter a valid email');
    expect(streetError).toBe('Please enter a valid street');
    expect(cityError).toBe('Please enter a valid city');
    expect(stateError).toBe('Please enter a valid state');
    expect(pincodeError).toBe('Please enter a valid pin code');
  });

  it('should submit the form with mock data if fillMockData is called and form is submitted', () => {
    clickElementByClass(fixture, 'fill-mock-data-button');
    fixture.detectChanges();
    clickElementByClass(fixture, 'submit-button');
    fixture.detectChanges();

    expect(userDataServiceFixture.addUser).toHaveBeenCalledWith(component.userForm.value);
  });
});
