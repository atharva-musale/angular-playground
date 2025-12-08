import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormValidator } from '../../models';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { UserDataService } from '../../services';

@Component({
  selector: 'app-add-new-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-new-user.component.html',
  styleUrl: './add-new-user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewUserComponent implements FormValidator {
  /**
   * Form to be used in template
   */
  public userForm: UntypedFormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserDataService
  ) {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      age: [''],
      gender: [''],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        pincode: ['', Validators.required]
      })
    });
  }

  /** Checks if a form control is invalid and touched */
  public checkIfInvalidAndTouched(controlName: string, fromAddress = false) {
    const control = fromAddress ? this.userForm.get('address')?.get(controlName) : this.userForm.get(controlName);
    return control?.invalid && control?.touched;
  }

  /** Checks if the entire form is valid */
  public isValid(): boolean {
    return this.userForm.valid;
  }

  /** Submits the form data */
  public submit() {
    this.userService.addUser(this.userForm.value);
  }

  /** Fills the form with mock data for testing */
  public fillMockData() {
    this.userForm.patchValue({
      firstname: 'Mark',
      lastname: 'Twain',
      email: 'mark.twain@example.com',
      phone: '1234567890',
      age: 45,
      gender: 'male',
      address: {
        street: '123 Main St',
        city: 'Hannibal',
        state: 'MO',
        pincode: '63401'
      }
    })
  }
}
