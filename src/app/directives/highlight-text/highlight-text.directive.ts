import { Directive, Input } from "@angular/core";

@Directive({
  selector: '[highlightText]',
  host: {
    '[class.highlight-text]': 'highlightText'
  }
})
export class HighlightTextDirective {
  @Input({
    required: false
  })
  public highlightText? = true;
}
