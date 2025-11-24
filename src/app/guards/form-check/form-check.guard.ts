import { CanDeactivate, MaybeAsync, GuardResult } from "@angular/router";
import { FormValidator } from "../../models";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FormCheckGuard implements CanDeactivate<FormValidator> {
  public canDeactivate(component: FormValidator): MaybeAsync<GuardResult> {
    // Only allow navigation if the form is valid
    if (component.isValid()) {
      console.log("Form is valid, navigation allowed.");
    } else {
      console.log("Form is invalid, navigation blocked.");
    }
    return component.isValid();
  }
}
