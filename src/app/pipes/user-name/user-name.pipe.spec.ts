import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UserNamePipe } from './user-name.pipe';
import { User } from '../../models';

@Component({
  selector: 'app-test-component',
  standalone: true,
  imports: [UserNamePipe],
  template: `
    <div class="user-fullname">{{ user | fullname }}</div>
  `
})
class TestComponent {
  user: User = {
    id: 1,
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'Anystate',
      pinCode: '12345'
    }
  };
}

function getTextContentFromElementByClass(fixture: ComponentFixture<TestComponent>, className: string): string {
  return fixture.debugElement.query(By.css(`.${className}`))?.nativeElement.textContent;
}

describe('UserNamePipe', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let pipe: UserNamePipe;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, UserNamePipe]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    pipe = new UserNamePipe();
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should render full name in template', () => {
    const fullName = getTextContentFromElementByClass(fixture, 'user-fullname');

    expect(fullName).toBe('John Doe');
  });

  it('should update when user data changes', () => {
    component.user = {
      id: 2,
      firstname: 'Jane',
      lastname: 'Smith',
      email: 'jane.smith@example.com',
      address: {
        street: '456 Elm St',
        city: 'Othertown',
        state: 'Otherstate',
        pinCode: '67890'
      }
    };
    fixture.detectChanges();

    const fullnameElement = fixture.debugElement.query(By.css('.user-fullname'));
    expect(fullnameElement.nativeElement.textContent.trim()).toBe('Jane Smith');
  });
});
