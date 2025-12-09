import { CanDeactivate, MaybeAsync, GuardResult } from "@angular/router";
import { FormValidator } from "../../models";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FormCheckGuard implements CanDeactivate<FormValidator> {
  public canDeactivate(component: FormValidator): MaybeAsync<GuardResult> {
    console.log(
      component.isValid()
      ? "Form is valid, navigation allowed."
      : "Form is invalid, navigation blocked."
    );
    // Only allow navigation if the form is valid
    return component.isValid();
  }
}
