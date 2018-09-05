import { Component, HostListener, forwardRef, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, Directive, ElementRef, Pipe, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ListItem = /** @class */ (function () {
    function ListItem(source) {
        if (typeof source === 'string') {
            this.id = this.text = source;
        }
        if (typeof source === 'object') {
            this.id = source.id;
            this.text = source.text;
        }
    }
    return ListItem;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ DROPDOWN_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MultiSelectComponent; }),
    multi: true
};
var /** @type {?} */ noop = function () { };
var MultiSelectComponent = /** @class */ (function () {
    function MultiSelectComponent(cdr) {
        this.cdr = cdr;
        this._data = [];
        this.selectedItems = [];
        this.isDropdownOpen = false;
        this._placeholder = 'Select';
        this.filter = new ListItem(this.data);
        this.defaultSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'text',
            enableCheckAll: true,
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            allowSearchFilter: false,
            limitSelection: -1,
            clearSearchFilter: true,
            maxHeight: 197,
            itemsShowLimit: 999999999999,
            searchPlaceholderText: 'Search',
            noDataAvailablePlaceholderText: 'No data available',
            closeDropDownOnSelection: false,
            showSelectedItemsAtTop: false
        };
        this.disabled = false;
        this.onFilterChange = new EventEmitter();
        this.onSelect = new EventEmitter();
        this.onDeSelect = new EventEmitter();
        this.onSelectAll = new EventEmitter();
        this.onDeSelectAll = new EventEmitter();
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    Object.defineProperty(MultiSelectComponent.prototype, "placeholder", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this._placeholder = value;
            }
            else {
                this._placeholder = 'Select';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "settings", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this._settings = Object.assign(this.defaultSettings, value);
            }
            else {
                this._settings = Object.assign(this.defaultSettings);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "data", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            if (!value) {
                this._data = [];
            }
            else {
                // const _items = value.filter((item: any) => {
                //   if (typeof item === 'string' || (typeof item === 'object' && item && item[this._settings.idField] && item[this._settings.textField])) {
                //     return item;
                //   }
                // });
                this._data = value.map(function (item) {
                    return typeof item === 'string'
                        ? new ListItem(item)
                        : new ListItem({
                            id: item[_this._settings.idField],
                            text: item[_this._settings.textField]
                        });
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} $event
     * @return {?}
     */
    MultiSelectComponent.prototype.onFilterTextChange = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.onFilterChange.emit($event);
    };
    /**
     * @param {?} $event
     * @param {?} item
     * @return {?}
     */
    MultiSelectComponent.prototype.onItemClick = /**
     * @param {?} $event
     * @param {?} item
     * @return {?}
     */
    function ($event, item) {
        if (this.disabled) {
            return false;
        }
        var /** @type {?} */ found = this.isSelected(item);
        var /** @type {?} */ allowAdd = this._settings.limitSelection === -1 || (this._settings.limitSelection > 0 && this.selectedItems.length < this._settings.limitSelection);
        if (!found) {
            if (allowAdd) {
                this.addSelected(item);
            }
        }
        else {
            this.removeSelected(item);
        }
        if (this._settings.singleSelection && this._settings.closeDropDownOnSelection) {
            this.closeDropdown();
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MultiSelectComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        if (value !== undefined && value !== null && value.length > 0) {
            if (this._settings.singleSelection) {
                try {
                    if (value.length >= 1) {
                        var /** @type {?} */ firstItem = value[0];
                        this.selectedItems = [
                            typeof firstItem === 'string'
                                ? new ListItem(firstItem)
                                : new ListItem({
                                    id: firstItem[this._settings.idField],
                                    text: firstItem[this._settings.textField]
                                })
                        ];
                    }
                }
                catch (/** @type {?} */ e) {
                    // console.error(e.body.msg);
                }
            }
            else {
                var /** @type {?} */ _data = value.map(function (item) {
                    return typeof item === 'string'
                        ? new ListItem(item)
                        : new ListItem({
                            id: item[_this._settings.idField],
                            text: item[_this._settings.textField]
                        });
                });
                if (this._settings.limitSelection > 0) {
                    this.selectedItems = _data.splice(0, this._settings.limitSelection);
                }
                else {
                    this.selectedItems = _data;
                }
            }
        }
        else {
            this.selectedItems = [];
        }
        this.onChangeCallback(value);
    };
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    MultiSelectComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    MultiSelectComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @return {?}
     */
    MultiSelectComponent.prototype.onTouched = /**
     * @return {?}
     */
    function () {
        this.closeDropdown();
        this.onTouchedCallback();
    };
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    MultiSelectComponent.prototype.trackByFn = /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    function (index, item) {
        return item.id;
    };
    /**
     * @param {?} clickedItem
     * @return {?}
     */
    MultiSelectComponent.prototype.isSelected = /**
     * @param {?} clickedItem
     * @return {?}
     */
    function (clickedItem) {
        var /** @type {?} */ found = false;
        this.selectedItems.forEach(function (item) {
            if (clickedItem.id === item.id) {
                found = true;
            }
        });
        return found;
    };
    /**
     * @return {?}
     */
    MultiSelectComponent.prototype.isLimitSelectionReached = /**
     * @return {?}
     */
    function () {
        return this._settings.limitSelection === this.selectedItems.length;
    };
    /**
     * @return {?}
     */
    MultiSelectComponent.prototype.isAllItemsSelected = /**
     * @return {?}
     */
    function () {
        return this._data.length === this.selectedItems.length;
    };
    /**
     * @return {?}
     */
    MultiSelectComponent.prototype.showButton = /**
     * @return {?}
     */
    function () {
        if (!this._settings.singleSelection) {
            if (this._settings.limitSelection > 0) {
                return false;
            }
            // this._settings.enableCheckAll = this._settings.limitSelection === -1 ? true : false;
            return true; // !this._settings.singleSelection && this._settings.enableCheckAll && this._data.length > 0;
        }
        else {
            // should be disabled in single selection mode
            return false;
        }
    };
    /**
     * @return {?}
     */
    MultiSelectComponent.prototype.itemShowRemaining = /**
     * @return {?}
     */
    function () {
        return this.selectedItems.length - this._settings.itemsShowLimit;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    MultiSelectComponent.prototype.addSelected = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (this._settings.singleSelection) {
            this.selectedItems = [];
            this.selectedItems.push(item);
        }
        else {
            this.selectedItems.push(item);
        }
        this.onChangeCallback(this.emittedValue(this.selectedItems));
        this.onSelect.emit(this.emittedValue(item));
    };
    /**
     * @param {?} itemSel
     * @return {?}
     */
    MultiSelectComponent.prototype.removeSelected = /**
     * @param {?} itemSel
     * @return {?}
     */
    function (itemSel) {
        var _this = this;
        this.selectedItems.forEach(function (item) {
            if (itemSel.id === item.id) {
                _this.selectedItems.splice(_this.selectedItems.indexOf(item), 1);
            }
        });
        this.onChangeCallback(this.emittedValue(this.selectedItems));
        this.onDeSelect.emit(this.emittedValue(itemSel));
    };
    /**
     * @param {?} val
     * @return {?}
     */
    MultiSelectComponent.prototype.emittedValue = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        var _this = this;
        var /** @type {?} */ selected = [];
        if (Array.isArray(val)) {
            val.map(function (item) {
                if (item.id === item.text) {
                    selected.push(item.text);
                }
                else {
                    selected.push(_this.objectify(item));
                }
            });
        }
        else {
            if (val) {
                if (val.id === val.text) {
                    return val.text;
                }
                else {
                    return this.objectify(val);
                }
            }
        }
        return selected;
    };
    /**
     * @param {?} val
     * @return {?}
     */
    MultiSelectComponent.prototype.objectify = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        var /** @type {?} */ obj = {};
        obj[this._settings.idField] = val.id;
        obj[this._settings.textField] = val.text;
        return obj;
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    MultiSelectComponent.prototype.toggleDropdown = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        evt.preventDefault();
        if (this.disabled && this._settings.singleSelection) {
            return;
        }
        this.isDropdownOpen = !this.isDropdownOpen;
    };
    /**
     * @return {?}
     */
    MultiSelectComponent.prototype.closeDropdown = /**
     * @return {?}
     */
    function () {
        this.isDropdownOpen = false;
        // clear search text
        if (this._settings.clearSearchFilter) {
            this.filter.text = '';
        }
    };
    /**
     * @return {?}
     */
    MultiSelectComponent.prototype.toggleSelectAll = /**
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return false;
        }
        if (!this.isAllItemsSelected()) {
            this.selectedItems = this._data.slice();
            this.onSelectAll.emit(this.emittedValue(this.selectedItems));
        }
        else {
            this.selectedItems = [];
            this.onDeSelectAll.emit(this.emittedValue(this.selectedItems));
        }
        this.onChangeCallback(this.emittedValue(this.selectedItems));
    };
    MultiSelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-multiselect-dropdown',
                    template: "<div tabindex=\"=0\" (blur)=\"onTouched()\" class=\"multiselect-dropdown\" (clickOutside)=\"closeDropdown()\">\n  <div [class.disabled]=\"disabled\">\n    <span tabindex=\"-1\" class=\"dropdown-btn\" (click)=\"toggleDropdown($event)\">\n      <span *ngIf=\"selectedItems.length == 0\">{{_placeholder}}</span>\n      <span class=\"selected-item\" *ngFor=\"let item of selectedItems;trackBy: trackByFn;let k = index\" [hidden]=\"k > _settings.itemsShowLimit-1\">\n        {{item.text}}\n        <a style=\"padding-top:2px;padding-left:2px;color:white\" (click)=\"onItemClick($event,item)\">x</a>\n      </span>\n      <span style=\"float:right !important;padding-right:4px\">\n        <span style=\"padding-right: 6px;\" *ngIf=\"itemShowRemaining()>0\">+{{itemShowRemaining()}}</span>\n        <span [ngClass]=\"isDropdownOpen ? 'dropdown-up' : 'dropdown-down'\"></span>\n      </span>\n    </span>\n  </div>\n  <div class=\"dropdown-list\" [hidden]=\"!isDropdownOpen\">\n    <ul class=\"item1\">\n      <li (click)=\"toggleSelectAll()\" *ngIf=\"_data.length > 0 && !_settings.singleSelection && _settings.enableCheckAll && _settings.limitSelection===-1\"\n        class=\"multiselect-item-checkbox\" style=\"border-bottom: 1px solid #ccc;padding:10px\">\n        <input type=\"checkbox\" [checked]=\"isAllItemsSelected()\" [disabled]=\"disabled || isLimitSelectionReached()\" />\n        <div>{{!isAllItemsSelected() ? _settings.selectAllText : _settings.unSelectAllText}}</div>\n      </li>\n      <li class=\"filter-textbox\" *ngIf=\"_data.length>0 && _settings.allowSearchFilter\">\n        <input type=\"text\" [readOnly]=\"disabled\" [placeholder]=\"_settings.searchPlaceholderText\" [(ngModel)]=\"filter.text\" (ngModelChange)=\"onFilterTextChange($event)\">\n      </li>\n    </ul>\n    <ul class=\"item2\" [style.maxHeight]=\"_settings.maxHeight+'px'\">\n      <li *ngFor=\"let item of _data | ng2ListFilter:filter; let i = index;\" (click)=\"onItemClick($event,item)\" class=\"multiselect-item-checkbox\">\n        <input type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"disabled || (isLimitSelectionReached() && !isSelected(item))\"\n        />\n        <div>{{item.text}}</div>\n      </li>\n      <li class='no-data' *ngIf=\"_data.length == 0\">\n        <h5>{{_settings.noDataAvailablePlaceholderText}}</h5>\n      </li>\n    </ul>\n  </div>\n</div>",
                    styles: [".multiselect-dropdown{position:relative;width:100%}.multiselect-dropdown .dropdown-btn{background-color:#3581f2;display:inline-block;border:1px solid #adadad;width:100%;padding:6px 12px;margin-bottom:0;font-size:14px;font-weight:400;line-height:1.52857143;text-align:left;vertical-align:middle;cursor:pointer;background-image:none;border-radius:4px}.multiselect-dropdown .dropdown-btn .selected-item{border:1px solid #337ab7;margin-right:4px;background:#337ab7;padding:0 5px;color:#fff;border-radius:2px;float:left}.multiselect-dropdown .dropdown-btn .selected-item a{text-decoration:none}.multiselect-dropdown .dropdown-btn .selected-item:hover{box-shadow:1px 1px #959595}.multiselect-dropdown .dropdown-btn .dropdown-down{display:inline-block;top:10px;width:0;height:0;border-top:10px solid #adadad;border-left:10px solid transparent;border-right:10px solid transparent}.multiselect-dropdown .dropdown-btn .dropdown-up{display:inline-block;width:0;height:0;border-bottom:10px solid #adadad;border-left:10px solid transparent;border-right:10px solid transparent}.multiselect-dropdown .disabled>span{background-color:#eceeef}.dropdown-list{position:absolute;padding-top:6px;top:52px;left:1px;width:100%;z-index:9999;border:1px solid #ccc;border-radius:3px;background:#fff;margin-top:0;box-shadow:0 1px 5px #959595}.dropdown-list ul{padding:0;list-style:none;overflow:auto;margin:0}.dropdown-list li{padding:6px 10px;cursor:pointer;text-align:left}.dropdown-list .filter-textbox{border-bottom:1px solid #ccc;position:relative;padding:10px}.dropdown-list .filter-textbox input{border:0;width:100%;padding:0 0 0 26px}.dropdown-list .filter-textbox input:focus{outline:0}.multiselect-item-checkbox input[type=checkbox]{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.multiselect-item-checkbox input[type=checkbox]:focus+div:before,.multiselect-item-checkbox input[type=checkbox]:hover+div:before{border-color:#337ab7;background-color:#f2f2f2}.multiselect-item-checkbox input[type=checkbox]:active+div:before{transition-duration:0s}.multiselect-item-checkbox input[type=checkbox]+div{position:relative;padding-left:2em;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;margin:0;color:#000}.multiselect-item-checkbox input[type=checkbox]+div:before{box-sizing:content-box;content:'';color:#337ab7;position:absolute;top:50%;left:0;width:14px;height:14px;margin-top:-9px;border:2px solid #337ab7;text-align:center;transition:.4s}.multiselect-item-checkbox input[type=checkbox]+div:after{box-sizing:content-box;content:'';position:absolute;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:50%;transform-origin:50%;transition:transform .2s ease-out,-webkit-transform .2s ease-out;background-color:transparent;top:50%;left:4px;width:8px;height:3px;margin-top:-4px;border-style:solid;border-color:#fff;border-width:0 0 3px 3px;-o-border-image:none;border-image:none;-webkit-transform:rotate(-45deg) scale(0);transform:rotate(-45deg) scale(0)}.multiselect-item-checkbox input[type=checkbox]:disabled+div:before{border-color:#ccc}.multiselect-item-checkbox input[type=checkbox]:disabled:focus+div:before .multiselect-item-checkbox input[type=checkbox]:disabled:hover+div:before{background-color:inherit}.multiselect-item-checkbox input[type=checkbox]:disabled:checked+div:before{background-color:#ccc}.multiselect-item-checkbox input[type=checkbox]:checked+div:after{content:'';transition:transform .2s ease-out,-webkit-transform .2s ease-out;-webkit-transform:rotate(-45deg) scale(1);transform:rotate(-45deg) scale(1)}.multiselect-item-checkbox input[type=checkbox]:checked+div:before{-webkit-animation:.2s ease-in borderscale;animation:.2s ease-in borderscale;background:#337ab7}@-webkit-keyframes borderscale{50%{box-shadow:0 0 0 2px #337ab7}}@keyframes borderscale{50%{box-shadow:0 0 0 2px #337ab7}}"],
                    providers: [DROPDOWN_CONTROL_VALUE_ACCESSOR],
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    MultiSelectComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
    ]; };
    MultiSelectComponent.propDecorators = {
        "placeholder": [{ type: Input },],
        "disabled": [{ type: Input },],
        "settings": [{ type: Input },],
        "data": [{ type: Input },],
        "onFilterChange": [{ type: Output, args: ['onFilterChange',] },],
        "onSelect": [{ type: Output, args: ['onSelect',] },],
        "onDeSelect": [{ type: Output, args: ['onDeSelect',] },],
        "onSelectAll": [{ type: Output, args: ['onSelectAll',] },],
        "onDeSelectAll": [{ type: Output, args: ['onDeSelectAll',] },],
        "onTouched": [{ type: HostListener, args: ['blur',] },],
    };
    return MultiSelectComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ClickOutsideDirective = /** @class */ (function () {
    function ClickOutsideDirective(_elementRef) {
        this._elementRef = _elementRef;
        this.clickOutside = new EventEmitter();
    }
    /**
     * @param {?} event
     * @param {?} targetElement
     * @return {?}
     */
    ClickOutsideDirective.prototype.onClick = /**
     * @param {?} event
     * @param {?} targetElement
     * @return {?}
     */
    function (event, targetElement) {
        if (!targetElement) {
            return;
        }
        var /** @type {?} */ clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.clickOutside.emit(event);
        }
    };
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
        "clickOutside": [{ type: Output },],
        "onClick": [{ type: HostListener, args: ['document:click', ['$event', '$event.target'],] },],
    };
    return ClickOutsideDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ListFilterPipe = /** @class */ (function () {
    function ListFilterPipe() {
    }
    /**
     * @param {?} items
     * @param {?} filter
     * @return {?}
     */
    ListFilterPipe.prototype.transform = /**
     * @param {?} items
     * @param {?} filter
     * @return {?}
     */
    function (items, filter) {
        var _this = this;
        if (!items || !filter) {
            return items;
        }
        return items.filter(function (item) { return _this.applyFilter(item, filter); });
    };
    /**
     * @param {?} item
     * @param {?} filter
     * @return {?}
     */
    ListFilterPipe.prototype.applyFilter = /**
     * @param {?} item
     * @param {?} filter
     * @return {?}
     */
    function (item, filter) {
        return !(filter.text && item.text && item.text.toLowerCase().indexOf(filter.text.toLowerCase()) === -1);
    };
    ListFilterPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'ng2ListFilter',
                    pure: false
                },] },
    ];
    return ListFilterPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgMultiSelectDropDownModule = /** @class */ (function () {
    function NgMultiSelectDropDownModule() {
    }
    /**
     * @return {?}
     */
    NgMultiSelectDropDownModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: NgMultiSelectDropDownModule
        };
    };
    NgMultiSelectDropDownModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: [MultiSelectComponent, ClickOutsideDirective, ListFilterPipe],
                    exports: [MultiSelectComponent]
                },] },
    ];
    return NgMultiSelectDropDownModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { MultiSelectComponent, NgMultiSelectDropDownModule, ClickOutsideDirective as ɵb, ListFilterPipe as ɵc, DROPDOWN_CONTROL_VALUE_ACCESSOR as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbXVsdGlzZWxlY3QtZHJvcGRvd24uanMubWFwIiwic291cmNlcyI6WyJuZzovL25nLW11bHRpc2VsZWN0LWRyb3Bkb3duL211bHRpc2VsZWN0Lm1vZGVsLnRzIiwibmc6Ly9uZy1tdWx0aXNlbGVjdC1kcm9wZG93bi9tdWx0aXNlbGVjdC5jb21wb25lbnQudHMiLCJuZzovL25nLW11bHRpc2VsZWN0LWRyb3Bkb3duL2NsaWNrLW91dHNpZGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1tdWx0aXNlbGVjdC1kcm9wZG93bi9saXN0LWZpbHRlci5waXBlLnRzIiwibmc6Ly9uZy1tdWx0aXNlbGVjdC1kcm9wZG93bi9uZy1tdWx0aXNlbGVjdC1kcm9wZG93bi5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBJRHJvcGRvd25TZXR0aW5ncyB7XG4gIHNpbmdsZVNlbGVjdGlvbj86IGJvb2xlYW47XG4gIGlkRmllbGQ/OiBzdHJpbmc7XG4gIHRleHRGaWVsZD86IHN0cmluZztcbiAgZW5hYmxlQ2hlY2tBbGw/OiBib29sZWFuO1xuICBzZWxlY3RBbGxUZXh0Pzogc3RyaW5nO1xuICB1blNlbGVjdEFsbFRleHQ/OiBzdHJpbmc7XG4gIGFsbG93U2VhcmNoRmlsdGVyPzogYm9vbGVhbjtcbiAgY2xlYXJTZWFyY2hGaWx0ZXI/OiBib29sZWFuO1xuICBtYXhIZWlnaHQ/OiBudW1iZXI7XG4gIGl0ZW1zU2hvd0xpbWl0PzogbnVtYmVyO1xuICBsaW1pdFNlbGVjdGlvbj86IG51bWJlcjtcbiAgc2VhcmNoUGxhY2Vob2xkZXJUZXh0Pzogc3RyaW5nO1xuICBub0RhdGFBdmFpbGFibGVQbGFjZWhvbGRlclRleHQ/OiBzdHJpbmc7XG4gIGNsb3NlRHJvcERvd25PblNlbGVjdGlvbj86IGJvb2xlYW47XG4gIHNob3dTZWxlY3RlZEl0ZW1zQXRUb3A/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgTGlzdEl0ZW0ge1xuICBpZDogU3RyaW5nO1xuICB0ZXh0OiBTdHJpbmc7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHNvdXJjZTogYW55KSB7XG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLmlkID0gdGhpcy50ZXh0ID0gc291cmNlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHNvdXJjZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHRoaXMuaWQgPSBzb3VyY2UuaWQ7XG4gICAgICB0aGlzLnRleHQgPSBzb3VyY2UudGV4dDtcbiAgICB9XG4gIH1cbn0iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEhvc3RMaXN0ZW5lcixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBMaXN0SXRlbSwgSURyb3Bkb3duU2V0dGluZ3MgfSBmcm9tICcuL211bHRpc2VsZWN0Lm1vZGVsJztcblxuZXhwb3J0IGNvbnN0IERST1BET1dOX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE11bHRpU2VsZWN0Q29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5jb25zdCBub29wID0gKCkgPT4geyB9O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1tdWx0aXNlbGVjdC1kcm9wZG93bicsXG4gIHRlbXBsYXRlOiBgPGRpdiB0YWJpbmRleD1cIj0wXCIgKGJsdXIpPVwib25Ub3VjaGVkKClcIiBjbGFzcz1cIm11bHRpc2VsZWN0LWRyb3Bkb3duXCIgKGNsaWNrT3V0c2lkZSk9XCJjbG9zZURyb3Bkb3duKClcIj5cbiAgPGRpdiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICA8c3BhbiB0YWJpbmRleD1cIi0xXCIgY2xhc3M9XCJkcm9wZG93bi1idG5cIiAoY2xpY2spPVwidG9nZ2xlRHJvcGRvd24oJGV2ZW50KVwiPlxuICAgICAgPHNwYW4gKm5nSWY9XCJzZWxlY3RlZEl0ZW1zLmxlbmd0aCA9PSAwXCI+e3tfcGxhY2Vob2xkZXJ9fTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwic2VsZWN0ZWQtaXRlbVwiICpuZ0Zvcj1cImxldCBpdGVtIG9mIHNlbGVjdGVkSXRlbXM7dHJhY2tCeTogdHJhY2tCeUZuO2xldCBrID0gaW5kZXhcIiBbaGlkZGVuXT1cImsgPiBfc2V0dGluZ3MuaXRlbXNTaG93TGltaXQtMVwiPlxuICAgICAgICB7e2l0ZW0udGV4dH19XG4gICAgICAgIDxhIHN0eWxlPVwicGFkZGluZy10b3A6MnB4O3BhZGRpbmctbGVmdDoycHg7Y29sb3I6d2hpdGVcIiAoY2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50LGl0ZW0pXCI+eDwvYT5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuIHN0eWxlPVwiZmxvYXQ6cmlnaHQgIWltcG9ydGFudDtwYWRkaW5nLXJpZ2h0OjRweFwiPlxuICAgICAgICA8c3BhbiBzdHlsZT1cInBhZGRpbmctcmlnaHQ6IDZweDtcIiAqbmdJZj1cIml0ZW1TaG93UmVtYWluaW5nKCk+MFwiPit7e2l0ZW1TaG93UmVtYWluaW5nKCl9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gW25nQ2xhc3NdPVwiaXNEcm9wZG93bk9wZW4gPyAnZHJvcGRvd24tdXAnIDogJ2Ryb3Bkb3duLWRvd24nXCI+PC9zcGFuPlxuICAgICAgPC9zcGFuPlxuICAgIDwvc3Bhbj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJkcm9wZG93bi1saXN0XCIgW2hpZGRlbl09XCIhaXNEcm9wZG93bk9wZW5cIj5cbiAgICA8dWwgY2xhc3M9XCJpdGVtMVwiPlxuICAgICAgPGxpIChjbGljayk9XCJ0b2dnbGVTZWxlY3RBbGwoKVwiICpuZ0lmPVwiX2RhdGEubGVuZ3RoID4gMCAmJiAhX3NldHRpbmdzLnNpbmdsZVNlbGVjdGlvbiAmJiBfc2V0dGluZ3MuZW5hYmxlQ2hlY2tBbGwgJiYgX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uPT09LTFcIlxuICAgICAgICBjbGFzcz1cIm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3hcIiBzdHlsZT1cImJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjO3BhZGRpbmc6MTBweFwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgW2NoZWNrZWRdPVwiaXNBbGxJdGVtc1NlbGVjdGVkKClcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWQgfHwgaXNMaW1pdFNlbGVjdGlvblJlYWNoZWQoKVwiIC8+XG4gICAgICAgIDxkaXY+e3shaXNBbGxJdGVtc1NlbGVjdGVkKCkgPyBfc2V0dGluZ3Muc2VsZWN0QWxsVGV4dCA6IF9zZXR0aW5ncy51blNlbGVjdEFsbFRleHR9fTwvZGl2PlxuICAgICAgPC9saT5cbiAgICAgIDxsaSBjbGFzcz1cImZpbHRlci10ZXh0Ym94XCIgKm5nSWY9XCJfZGF0YS5sZW5ndGg+MCAmJiBfc2V0dGluZ3MuYWxsb3dTZWFyY2hGaWx0ZXJcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgW3JlYWRPbmx5XT1cImRpc2FibGVkXCIgW3BsYWNlaG9sZGVyXT1cIl9zZXR0aW5ncy5zZWFyY2hQbGFjZWhvbGRlclRleHRcIiBbKG5nTW9kZWwpXT1cImZpbHRlci50ZXh0XCIgKG5nTW9kZWxDaGFuZ2UpPVwib25GaWx0ZXJUZXh0Q2hhbmdlKCRldmVudClcIj5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgICA8dWwgY2xhc3M9XCJpdGVtMlwiIFtzdHlsZS5tYXhIZWlnaHRdPVwiX3NldHRpbmdzLm1heEhlaWdodCsncHgnXCI+XG4gICAgICA8bGkgKm5nRm9yPVwibGV0IGl0ZW0gb2YgX2RhdGEgfCBuZzJMaXN0RmlsdGVyOmZpbHRlcjsgbGV0IGkgPSBpbmRleDtcIiAoY2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50LGl0ZW0pXCIgY2xhc3M9XCJtdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94XCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBbY2hlY2tlZF09XCJpc1NlbGVjdGVkKGl0ZW0pXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkIHx8IChpc0xpbWl0U2VsZWN0aW9uUmVhY2hlZCgpICYmICFpc1NlbGVjdGVkKGl0ZW0pKVwiXG4gICAgICAgIC8+XG4gICAgICAgIDxkaXY+e3tpdGVtLnRleHR9fTwvZGl2PlxuICAgICAgPC9saT5cbiAgICAgIDxsaSBjbGFzcz0nbm8tZGF0YScgKm5nSWY9XCJfZGF0YS5sZW5ndGggPT0gMFwiPlxuICAgICAgICA8aDU+e3tfc2V0dGluZ3Mubm9EYXRhQXZhaWxhYmxlUGxhY2Vob2xkZXJUZXh0fX08L2g1PlxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICA8L2Rpdj5cbjwvZGl2PmAsXG4gIHN0eWxlczogW2AubXVsdGlzZWxlY3QtZHJvcGRvd257cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MTAwJX0ubXVsdGlzZWxlY3QtZHJvcGRvd24gLmRyb3Bkb3duLWJ0bntiYWNrZ3JvdW5kLWNvbG9yOiMzNTgxZjI7ZGlzcGxheTppbmxpbmUtYmxvY2s7Ym9yZGVyOjFweCBzb2xpZCAjYWRhZGFkO3dpZHRoOjEwMCU7cGFkZGluZzo2cHggMTJweDttYXJnaW4tYm90dG9tOjA7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NDAwO2xpbmUtaGVpZ2h0OjEuNTI4NTcxNDM7dGV4dC1hbGlnbjpsZWZ0O3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtjdXJzb3I6cG9pbnRlcjtiYWNrZ3JvdW5kLWltYWdlOm5vbmU7Ym9yZGVyLXJhZGl1czo0cHh9Lm11bHRpc2VsZWN0LWRyb3Bkb3duIC5kcm9wZG93bi1idG4gLnNlbGVjdGVkLWl0ZW17Ym9yZGVyOjFweCBzb2xpZCAjMzM3YWI3O21hcmdpbi1yaWdodDo0cHg7YmFja2dyb3VuZDojMzM3YWI3O3BhZGRpbmc6MCA1cHg7Y29sb3I6I2ZmZjtib3JkZXItcmFkaXVzOjJweDtmbG9hdDpsZWZ0fS5tdWx0aXNlbGVjdC1kcm9wZG93biAuZHJvcGRvd24tYnRuIC5zZWxlY3RlZC1pdGVtIGF7dGV4dC1kZWNvcmF0aW9uOm5vbmV9Lm11bHRpc2VsZWN0LWRyb3Bkb3duIC5kcm9wZG93bi1idG4gLnNlbGVjdGVkLWl0ZW06aG92ZXJ7Ym94LXNoYWRvdzoxcHggMXB4ICM5NTk1OTV9Lm11bHRpc2VsZWN0LWRyb3Bkb3duIC5kcm9wZG93bi1idG4gLmRyb3Bkb3duLWRvd257ZGlzcGxheTppbmxpbmUtYmxvY2s7dG9wOjEwcHg7d2lkdGg6MDtoZWlnaHQ6MDtib3JkZXItdG9wOjEwcHggc29saWQgI2FkYWRhZDtib3JkZXItbGVmdDoxMHB4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1yaWdodDoxMHB4IHNvbGlkIHRyYW5zcGFyZW50fS5tdWx0aXNlbGVjdC1kcm9wZG93biAuZHJvcGRvd24tYnRuIC5kcm9wZG93bi11cHtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDowO2hlaWdodDowO2JvcmRlci1ib3R0b206MTBweCBzb2xpZCAjYWRhZGFkO2JvcmRlci1sZWZ0OjEwcHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLXJpZ2h0OjEwcHggc29saWQgdHJhbnNwYXJlbnR9Lm11bHRpc2VsZWN0LWRyb3Bkb3duIC5kaXNhYmxlZD5zcGFue2JhY2tncm91bmQtY29sb3I6I2VjZWVlZn0uZHJvcGRvd24tbGlzdHtwb3NpdGlvbjphYnNvbHV0ZTtwYWRkaW5nLXRvcDo2cHg7dG9wOjUycHg7bGVmdDoxcHg7d2lkdGg6MTAwJTt6LWluZGV4Ojk5OTk7Ym9yZGVyOjFweCBzb2xpZCAjY2NjO2JvcmRlci1yYWRpdXM6M3B4O2JhY2tncm91bmQ6I2ZmZjttYXJnaW4tdG9wOjA7Ym94LXNoYWRvdzowIDFweCA1cHggIzk1OTU5NX0uZHJvcGRvd24tbGlzdCB1bHtwYWRkaW5nOjA7bGlzdC1zdHlsZTpub25lO292ZXJmbG93OmF1dG87bWFyZ2luOjB9LmRyb3Bkb3duLWxpc3QgbGl7cGFkZGluZzo2cHggMTBweDtjdXJzb3I6cG9pbnRlcjt0ZXh0LWFsaWduOmxlZnR9LmRyb3Bkb3duLWxpc3QgLmZpbHRlci10ZXh0Ym94e2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNjY2M7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZzoxMHB4fS5kcm9wZG93bi1saXN0IC5maWx0ZXItdGV4dGJveCBpbnB1dHtib3JkZXI6MDt3aWR0aDoxMDAlO3BhZGRpbmc6MCAwIDAgMjZweH0uZHJvcGRvd24tbGlzdCAuZmlsdGVyLXRleHRib3ggaW5wdXQ6Zm9jdXN7b3V0bGluZTowfS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hde2JvcmRlcjowO2NsaXA6cmVjdCgwIDAgMCAwKTtoZWlnaHQ6MXB4O21hcmdpbjotMXB4O292ZXJmbG93OmhpZGRlbjtwYWRkaW5nOjA7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MXB4fS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdOmZvY3VzK2RpdjpiZWZvcmUsLm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06aG92ZXIrZGl2OmJlZm9yZXtib3JkZXItY29sb3I6IzMzN2FiNztiYWNrZ3JvdW5kLWNvbG9yOiNmMmYyZjJ9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06YWN0aXZlK2RpdjpiZWZvcmV7dHJhbnNpdGlvbi1kdXJhdGlvbjowc30ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XStkaXZ7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZy1sZWZ0OjJlbTt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lO2N1cnNvcjpwb2ludGVyO21hcmdpbjowO2NvbG9yOiMwMDB9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF0rZGl2OmJlZm9yZXtib3gtc2l6aW5nOmNvbnRlbnQtYm94O2NvbnRlbnQ6Jyc7Y29sb3I6IzMzN2FiNztwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO2xlZnQ6MDt3aWR0aDoxNHB4O2hlaWdodDoxNHB4O21hcmdpbi10b3A6LTlweDtib3JkZXI6MnB4IHNvbGlkICMzMzdhYjc7dGV4dC1hbGlnbjpjZW50ZXI7dHJhbnNpdGlvbjouNHN9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF0rZGl2OmFmdGVye2JveC1zaXppbmc6Y29udGVudC1ib3g7Y29udGVudDonJztwb3NpdGlvbjphYnNvbHV0ZTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgwKTt0cmFuc2Zvcm06c2NhbGUoMCk7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjUwJTt0cmFuc2Zvcm0tb3JpZ2luOjUwJTt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMnMgZWFzZS1vdXQsLXdlYmtpdC10cmFuc2Zvcm0gLjJzIGVhc2Utb3V0O2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7dG9wOjUwJTtsZWZ0OjRweDt3aWR0aDo4cHg7aGVpZ2h0OjNweDttYXJnaW4tdG9wOi00cHg7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci1jb2xvcjojZmZmO2JvcmRlci13aWR0aDowIDAgM3B4IDNweDstby1ib3JkZXItaW1hZ2U6bm9uZTtib3JkZXItaW1hZ2U6bm9uZTstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoLTQ1ZGVnKSBzY2FsZSgwKTt0cmFuc2Zvcm06cm90YXRlKC00NWRlZykgc2NhbGUoMCl9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06ZGlzYWJsZWQrZGl2OmJlZm9yZXtib3JkZXItY29sb3I6I2NjY30ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XTpkaXNhYmxlZDpmb2N1cytkaXY6YmVmb3JlIC5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdOmRpc2FibGVkOmhvdmVyK2RpdjpiZWZvcmV7YmFja2dyb3VuZC1jb2xvcjppbmhlcml0fS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdOmRpc2FibGVkOmNoZWNrZWQrZGl2OmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOiNjY2N9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06Y2hlY2tlZCtkaXY6YWZ0ZXJ7Y29udGVudDonJzt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMnMgZWFzZS1vdXQsLXdlYmtpdC10cmFuc2Zvcm0gLjJzIGVhc2Utb3V0Oy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpIHNjYWxlKDEpO3RyYW5zZm9ybTpyb3RhdGUoLTQ1ZGVnKSBzY2FsZSgxKX0ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XTpjaGVja2VkK2RpdjpiZWZvcmV7LXdlYmtpdC1hbmltYXRpb246LjJzIGVhc2UtaW4gYm9yZGVyc2NhbGU7YW5pbWF0aW9uOi4ycyBlYXNlLWluIGJvcmRlcnNjYWxlO2JhY2tncm91bmQ6IzMzN2FiN31ALXdlYmtpdC1rZXlmcmFtZXMgYm9yZGVyc2NhbGV7NTAle2JveC1zaGFkb3c6MCAwIDAgMnB4ICMzMzdhYjd9fUBrZXlmcmFtZXMgYm9yZGVyc2NhbGV7NTAle2JveC1zaGFkb3c6MCAwIDAgMnB4ICMzMzdhYjd9fWBdLFxuICBwcm92aWRlcnM6IFtEUk9QRE9XTl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTXVsdGlTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIHB1YmxpYyBfc2V0dGluZ3M6IElEcm9wZG93blNldHRpbmdzO1xuICBwdWJsaWMgX2RhdGE6IEFycmF5PExpc3RJdGVtPiA9IFtdO1xuICBwdWJsaWMgc2VsZWN0ZWRJdGVtczogQXJyYXk8TGlzdEl0ZW0+ID0gW107XG4gIHB1YmxpYyBpc0Ryb3Bkb3duT3BlbiA9IGZhbHNlO1xuICBfcGxhY2Vob2xkZXIgPSAnU2VsZWN0JztcbiAgZmlsdGVyOiBMaXN0SXRlbSA9IG5ldyBMaXN0SXRlbSh0aGlzLmRhdGEpO1xuICBkZWZhdWx0U2V0dGluZ3M6IElEcm9wZG93blNldHRpbmdzID0ge1xuICAgIHNpbmdsZVNlbGVjdGlvbjogZmFsc2UsXG4gICAgaWRGaWVsZDogJ2lkJyxcbiAgICB0ZXh0RmllbGQ6ICd0ZXh0JyxcbiAgICBlbmFibGVDaGVja0FsbDogdHJ1ZSxcbiAgICBzZWxlY3RBbGxUZXh0OiAnU2VsZWN0IEFsbCcsXG4gICAgdW5TZWxlY3RBbGxUZXh0OiAnVW5TZWxlY3QgQWxsJyxcbiAgICBhbGxvd1NlYXJjaEZpbHRlcjogZmFsc2UsXG4gICAgbGltaXRTZWxlY3Rpb246IC0xLFxuICAgIGNsZWFyU2VhcmNoRmlsdGVyOiB0cnVlLFxuICAgIG1heEhlaWdodDogMTk3LFxuICAgIGl0ZW1zU2hvd0xpbWl0OiA5OTk5OTk5OTk5OTksXG4gICAgc2VhcmNoUGxhY2Vob2xkZXJUZXh0OiAnU2VhcmNoJyxcbiAgICBub0RhdGFBdmFpbGFibGVQbGFjZWhvbGRlclRleHQ6ICdObyBkYXRhIGF2YWlsYWJsZScsXG4gICAgY2xvc2VEcm9wRG93bk9uU2VsZWN0aW9uOiBmYWxzZSxcbiAgICBzaG93U2VsZWN0ZWRJdGVtc0F0VG9wOiBmYWxzZVxuICB9O1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgcGxhY2Vob2xkZXIodmFsdWU6IHN0cmluZykge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5fcGxhY2Vob2xkZXIgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcGxhY2Vob2xkZXIgPSAnU2VsZWN0JztcbiAgICB9XG4gIH1cbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IHNldHRpbmdzKHZhbHVlOiBJRHJvcGRvd25TZXR0aW5ncykge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5fc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHRoaXMuZGVmYXVsdFNldHRpbmdzLCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NldHRpbmdzID0gT2JqZWN0LmFzc2lnbih0aGlzLmRlZmF1bHRTZXR0aW5ncyk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBkYXRhKHZhbHVlOiBBcnJheTxhbnk+KSB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgdGhpcy5fZGF0YSA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjb25zdCBfaXRlbXMgPSB2YWx1ZS5maWx0ZXIoKGl0ZW06IGFueSkgPT4ge1xuICAgICAgLy8gICBpZiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnIHx8ICh0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcgJiYgaXRlbSAmJiBpdGVtW3RoaXMuX3NldHRpbmdzLmlkRmllbGRdICYmIGl0ZW1bdGhpcy5fc2V0dGluZ3MudGV4dEZpZWxkXSkpIHtcbiAgICAgIC8vICAgICByZXR1cm4gaXRlbTtcbiAgICAgIC8vICAgfVxuICAgICAgLy8gfSk7XG4gICAgICB0aGlzLl9kYXRhID0gdmFsdWUubWFwKFxuICAgICAgICAoaXRlbTogYW55KSA9PlxuICAgICAgICAgIHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgPyBuZXcgTGlzdEl0ZW0oaXRlbSlcbiAgICAgICAgICAgIDogbmV3IExpc3RJdGVtKHtcbiAgICAgICAgICAgICAgaWQ6IGl0ZW1bdGhpcy5fc2V0dGluZ3MuaWRGaWVsZF0sXG4gICAgICAgICAgICAgIHRleHQ6IGl0ZW1bdGhpcy5fc2V0dGluZ3MudGV4dEZpZWxkXVxuICAgICAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnb25GaWx0ZXJDaGFuZ2UnKSBvbkZpbHRlckNoYW5nZTogRXZlbnRFbWl0dGVyPExpc3RJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoJ29uU2VsZWN0Jykgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxMaXN0SXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCdvbkRlU2VsZWN0Jykgb25EZVNlbGVjdDogRXZlbnRFbWl0dGVyPExpc3RJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoJ29uU2VsZWN0QWxsJykgb25TZWxlY3RBbGw6IEV2ZW50RW1pdHRlcjxBcnJheTxMaXN0SXRlbT4+ID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxhbnk+PigpO1xuXG4gIEBPdXRwdXQoJ29uRGVTZWxlY3RBbGwnKSBvbkRlU2VsZWN0QWxsOiBFdmVudEVtaXR0ZXI8QXJyYXk8TGlzdEl0ZW0+PiA9IG5ldyBFdmVudEVtaXR0ZXI8QXJyYXk8YW55Pj4oKTtcblxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBvbkZpbHRlclRleHRDaGFuZ2UoJGV2ZW50KSB7XG4gICAgdGhpcy5vbkZpbHRlckNoYW5nZS5lbWl0KCRldmVudCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHsgfVxuXG4gIG9uSXRlbUNsaWNrKCRldmVudDogYW55LCBpdGVtOiBMaXN0SXRlbSkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgZm91bmQgPSB0aGlzLmlzU2VsZWN0ZWQoaXRlbSk7XG4gICAgY29uc3QgYWxsb3dBZGQgPSB0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA9PT0gLTEgfHwgKHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uID4gMCAmJiB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoIDwgdGhpcy5fc2V0dGluZ3MubGltaXRTZWxlY3Rpb24pO1xuICAgIGlmICghZm91bmQpIHtcbiAgICAgIGlmIChhbGxvd0FkZCkge1xuICAgICAgICB0aGlzLmFkZFNlbGVjdGVkKGl0ZW0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZVNlbGVjdGVkKGl0ZW0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5fc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uICYmIHRoaXMuX3NldHRpbmdzLmNsb3NlRHJvcERvd25PblNlbGVjdGlvbikge1xuICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKHRoaXMuX3NldHRpbmdzLnNpbmdsZVNlbGVjdGlvbikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPj0gMSkge1xuICAgICAgICAgICAgY29uc3QgZmlyc3RJdGVtID0gdmFsdWVbMF07XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXG4gICAgICAgICAgICAgIHR5cGVvZiBmaXJzdEl0ZW0gPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgPyBuZXcgTGlzdEl0ZW0oZmlyc3RJdGVtKVxuICAgICAgICAgICAgICAgIDogbmV3IExpc3RJdGVtKHtcbiAgICAgICAgICAgICAgICAgIGlkOiBmaXJzdEl0ZW1bdGhpcy5fc2V0dGluZ3MuaWRGaWVsZF0sXG4gICAgICAgICAgICAgICAgICB0ZXh0OiBmaXJzdEl0ZW1bdGhpcy5fc2V0dGluZ3MudGV4dEZpZWxkXVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoZS5ib2R5Lm1zZyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IF9kYXRhID0gdmFsdWUubWFwKFxuICAgICAgICAgIChpdGVtOiBhbnkpID0+XG4gICAgICAgICAgICB0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgICAgPyBuZXcgTGlzdEl0ZW0oaXRlbSlcbiAgICAgICAgICAgICAgOiBuZXcgTGlzdEl0ZW0oe1xuICAgICAgICAgICAgICAgIGlkOiBpdGVtW3RoaXMuX3NldHRpbmdzLmlkRmllbGRdLFxuICAgICAgICAgICAgICAgIHRleHQ6IGl0ZW1bdGhpcy5fc2V0dGluZ3MudGV4dEZpZWxkXVxuICAgICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgICBpZiAodGhpcy5fc2V0dGluZ3MubGltaXRTZWxlY3Rpb24gPiAwKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gX2RhdGEuc3BsaWNlKDAsIHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBfZGF0YTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXTtcbiAgICB9XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHZhbHVlKTtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIFNldCB0b3VjaGVkIG9uIGJsdXJcbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIHB1YmxpYyBvblRvdWNoZWQoKSB7XG4gICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICB9XG5cbiAgdHJhY2tCeUZuKGluZGV4LCBpdGVtKSB7XG4gICAgcmV0dXJuIGl0ZW0uaWQ7XG4gIH1cblxuICBpc1NlbGVjdGVkKGNsaWNrZWRJdGVtOiBMaXN0SXRlbSkge1xuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaWYgKGNsaWNrZWRJdGVtLmlkID09PSBpdGVtLmlkKSB7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZm91bmQ7XG4gIH1cblxuICBpc0xpbWl0U2VsZWN0aW9uUmVhY2hlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3MubGltaXRTZWxlY3Rpb24gPT09IHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7XG4gIH1cblxuICBpc0FsbEl0ZW1zU2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGEubGVuZ3RoID09PSB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoO1xuICB9XG5cbiAgc2hvd0J1dHRvbigpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuX3NldHRpbmdzLnNpbmdsZVNlbGVjdGlvbikge1xuICAgICAgaWYgKHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uID4gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyB0aGlzLl9zZXR0aW5ncy5lbmFibGVDaGVja0FsbCA9IHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uID09PSAtMSA/IHRydWUgOiBmYWxzZTtcbiAgICAgIHJldHVybiB0cnVlOyAvLyAhdGhpcy5fc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uICYmIHRoaXMuX3NldHRpbmdzLmVuYWJsZUNoZWNrQWxsICYmIHRoaXMuX2RhdGEubGVuZ3RoID4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc2hvdWxkIGJlIGRpc2FibGVkIGluIHNpbmdsZSBzZWxlY3Rpb24gbW9kZVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGl0ZW1TaG93UmVtYWluaW5nKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGggLSB0aGlzLl9zZXR0aW5ncy5pdGVtc1Nob3dMaW1pdDtcbiAgfVxuXG4gIGFkZFNlbGVjdGVkKGl0ZW06IExpc3RJdGVtKSB7XG4gICAgaWYgKHRoaXMuX3NldHRpbmdzLnNpbmdsZVNlbGVjdGlvbikge1xuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbXMucHVzaChpdGVtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgfVxuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLmVtaXR0ZWRWYWx1ZSh0aGlzLnNlbGVjdGVkSXRlbXMpKTtcbiAgICB0aGlzLm9uU2VsZWN0LmVtaXQodGhpcy5lbWl0dGVkVmFsdWUoaXRlbSkpO1xuICB9XG5cbiAgcmVtb3ZlU2VsZWN0ZWQoaXRlbVNlbDogTGlzdEl0ZW0pIHtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmIChpdGVtU2VsLmlkID09PSBpdGVtLmlkKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5zcGxpY2UodGhpcy5zZWxlY3RlZEl0ZW1zLmluZGV4T2YoaXRlbSksIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLmVtaXR0ZWRWYWx1ZSh0aGlzLnNlbGVjdGVkSXRlbXMpKTtcbiAgICB0aGlzLm9uRGVTZWxlY3QuZW1pdCh0aGlzLmVtaXR0ZWRWYWx1ZShpdGVtU2VsKSk7XG4gIH1cblxuICBlbWl0dGVkVmFsdWUodmFsOiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IHNlbGVjdGVkID0gW107XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgICAgdmFsLm1hcChpdGVtID0+IHtcbiAgICAgICAgaWYgKGl0ZW0uaWQgPT09IGl0ZW0udGV4dCkge1xuICAgICAgICAgIHNlbGVjdGVkLnB1c2goaXRlbS50ZXh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWxlY3RlZC5wdXNoKHRoaXMub2JqZWN0aWZ5KGl0ZW0pKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgaWYgKHZhbC5pZCA9PT0gdmFsLnRleHQpIHtcbiAgICAgICAgICByZXR1cm4gdmFsLnRleHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0aWZ5KHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGVkO1xuICB9XG5cbiAgb2JqZWN0aWZ5KHZhbDogTGlzdEl0ZW0pIHtcbiAgICBjb25zdCBvYmogPSB7fTtcbiAgICBvYmpbdGhpcy5fc2V0dGluZ3MuaWRGaWVsZF0gPSB2YWwuaWQ7XG4gICAgb2JqW3RoaXMuX3NldHRpbmdzLnRleHRGaWVsZF0gPSB2YWwudGV4dDtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgdG9nZ2xlRHJvcGRvd24oZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQgJiYgdGhpcy5fc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuaXNEcm9wZG93bk9wZW4gPSAhdGhpcy5pc0Ryb3Bkb3duT3BlbjtcbiAgfVxuXG4gIGNsb3NlRHJvcGRvd24oKSB7XG4gICAgdGhpcy5pc0Ryb3Bkb3duT3BlbiA9IGZhbHNlO1xuICAgIC8vIGNsZWFyIHNlYXJjaCB0ZXh0XG4gICAgaWYgKHRoaXMuX3NldHRpbmdzLmNsZWFyU2VhcmNoRmlsdGVyKSB7XG4gICAgICB0aGlzLmZpbHRlci50ZXh0ID0gJyc7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlU2VsZWN0QWxsKCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghdGhpcy5pc0FsbEl0ZW1zU2VsZWN0ZWQoKSkge1xuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gdGhpcy5fZGF0YS5zbGljZSgpO1xuICAgICAgdGhpcy5vblNlbGVjdEFsbC5lbWl0KHRoaXMuZW1pdHRlZFZhbHVlKHRoaXMuc2VsZWN0ZWRJdGVtcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXTtcbiAgICAgIHRoaXMub25EZVNlbGVjdEFsbC5lbWl0KHRoaXMuZW1pdHRlZFZhbHVlKHRoaXMuc2VsZWN0ZWRJdGVtcykpO1xuICAgIH1cbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5lbWl0dGVkVmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1zKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbY2xpY2tPdXRzaWRlXSdcbn0pXG5leHBvcnQgY2xhc3MgQ2xpY2tPdXRzaWRlRGlyZWN0aXZlIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgfVxuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIGNsaWNrT3V0c2lkZSA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnLCAnJGV2ZW50LnRhcmdldCddKVxuICAgIHB1YmxpYyBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50LCB0YXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRhcmdldEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNsaWNrZWRJbnNpZGUgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnModGFyZ2V0RWxlbWVudCk7XG4gICAgICAgIGlmICghY2xpY2tlZEluc2lkZSkge1xuICAgICAgICAgICAgdGhpcy5jbGlja091dHNpZGUuZW1pdChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IExpc3RJdGVtIH0gZnJvbSAnLi9tdWx0aXNlbGVjdC5tb2RlbCc7XG5cbkBQaXBlKHtcbiAgICBuYW1lOiAnbmcyTGlzdEZpbHRlcicsXG4gICAgcHVyZTogZmFsc2Vcbn0pXG5leHBvcnQgY2xhc3MgTGlzdEZpbHRlclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0oaXRlbXM6IExpc3RJdGVtW10sIGZpbHRlcjogTGlzdEl0ZW0pOiBMaXN0SXRlbVtdIHtcbiAgICAgICAgaWYgKCFpdGVtcyB8fCAhZmlsdGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW1zLmZpbHRlcigoaXRlbTogTGlzdEl0ZW0pID0+IHRoaXMuYXBwbHlGaWx0ZXIoaXRlbSwgZmlsdGVyKSk7XG4gICAgfVxuXG4gICAgYXBwbHlGaWx0ZXIoaXRlbTogTGlzdEl0ZW0sIGZpbHRlcjogTGlzdEl0ZW0pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEoZmlsdGVyLnRleHQgJiYgaXRlbS50ZXh0ICYmIGl0ZW0udGV4dC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyLnRleHQudG9Mb3dlckNhc2UoKSkgPT09IC0xKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTXVsdGlTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuL211bHRpc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDbGlja091dHNpZGVEaXJlY3RpdmUgfSBmcm9tICcuL2NsaWNrLW91dHNpZGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IExpc3RGaWx0ZXJQaXBlIH0gZnJvbSAnLi9saXN0LWZpbHRlci5waXBlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtNdWx0aVNlbGVjdENvbXBvbmVudCwgQ2xpY2tPdXRzaWRlRGlyZWN0aXZlLCBMaXN0RmlsdGVyUGlwZV0sXG4gIGV4cG9ydHM6IFtNdWx0aVNlbGVjdENvbXBvbmVudF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBOZ011bHRpU2VsZWN0RHJvcERvd25Nb2R1bGUge1xuICAgIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmdNb2R1bGU6IE5nTXVsdGlTZWxlY3REcm9wRG93bk1vZHVsZVxuICAgICAgfTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFrQkEsSUFBQTtzQkFJcUIsTUFBVztRQUM1QixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUM5QixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDOUIsSUFBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztTQUN6Qjs7bUJBN0JMO0lBK0JDLENBQUE7Ozs7OztBQy9CRCxxQkFhYSwrQkFBK0IsR0FBUTtJQUNsRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLG9CQUFvQixHQUFBLENBQUM7SUFDbkQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBQ0YscUJBQU0sSUFBSSxHQUFHLGVBQVMsQ0FBQzs7SUFnSXJCLDhCQUFvQixHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtxQkFqRlYsRUFBRTs2QkFDTSxFQUFFOzhCQUNsQixLQUFLOzRCQUNkLFFBQVE7c0JBQ0osSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzsrQkFDTDtZQUNuQyxlQUFlLEVBQUUsS0FBSztZQUN0QixPQUFPLEVBQUUs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