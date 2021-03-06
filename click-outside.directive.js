import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';
var ClickOutsideDirective = (function () {
    function ClickOutsideDirective(_elementRef) {
        this._elementRef = _elementRef;
        this.clickOutside = new EventEmitter();
    }
    ClickOutsideDirective.prototype.onClick = function (event, targetElement) {
        if (!targetElement) {
            return;
        }
        var clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.clickOutside.emit(event);
        }
    };
    return ClickOutsideDirective;
}());
export { ClickOutsideDirective };
ClickOutsideDirective.decorators = [
    { type: Directive, args: [{
                selector: '[clickOutside]'
            },] },
];
/** @nocollapse */
ClickOutsideDirective.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
ClickOutsideDirective.propDecorators = {
    'clickOutside': [{ type: Output },],
    'onClick': [{ type: HostListener, args: ['document:click', ['$event', '$event.target'],] },],
};
//# sourceMappingURL=click-outside.directive.js.map