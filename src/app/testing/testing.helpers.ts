import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

export function getTextContentFromElementByClass<T>(fixture: ComponentFixture<T>, className: string): string {
  return fixture.debugElement.query(By.css(`.${className}`))?.nativeElement.textContent;
}

export function getElementByClass<T>(fixture: ComponentFixture<T>, className: string) {
  return fixture.debugElement.query(By.css(`.${className}`));
}

export function getNumberOfElementsByClass<T>(fixture: ComponentFixture<T>, className: string): number {
  return fixture.debugElement.queryAll(By.css(`.${className}`)).length;
}

export function clickElementByClass<T>(fixture: ComponentFixture<T>, className: string): void {
  const element = fixture.debugElement.query(By.css(`.${className}`));
  element?.nativeElement.click();
}

export function setInputElementValueByClass<T>(fixture: ComponentFixture<T>, className: string, value: string): void {
  const inputElement = fixture.debugElement.query(By.css(`.${className}`));
  if (inputElement) {
    inputElement.nativeElement.value = value;
    inputElement.nativeElement.dispatchEvent(new Event('input'));
  }
}
