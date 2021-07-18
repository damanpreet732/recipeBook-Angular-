import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[appDirective]',
})
export class PlaceholderDirective{
    constructor(public ViewContainerRef : ViewContainerRef){}
}