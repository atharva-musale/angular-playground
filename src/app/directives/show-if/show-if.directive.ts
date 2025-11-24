import { Directive, Input, OnChanges, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
  selector: '[showIf]',
  standalone: true
})
export class ShowIfDirective implements OnChanges {
  @Input()
  public showIf = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}

  public ngOnChanges() {
    if (!this.showIf) {
      this.viewContainerRef.clear();
    } else {
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    }
  }
}
