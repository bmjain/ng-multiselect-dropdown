import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiSelectComponent } from './multiselect.component';
import { ClickOutsideDirective } from './click-outside.directive';
import { ListFilterPipe } from './list-filter.pipe';
var NgMultiSelectDropDownModule = (function () {
    function NgMultiSelectDropDownModule() {
    }
    NgMultiSelectDropDownModule.forRoot = function () {
        return {
            ngModule: NgMultiSelectDropDownModule
        };
    };
    return NgMultiSelectDropDownModule;
}());
export { NgMultiSelectDropDownModule };
NgMultiSelectDropDownModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule],
                declarations: [MultiSelectComponent, ClickOutsideDirective, ListFilterPipe],
                exports: [MultiSelectComponent]
            },] },
];
/** @nocollapse */
NgMultiSelectDropDownModule.ctorParameters = function () { return []; };
//# sourceMappingURL=ng-multiselect-dropdown.module.js.map