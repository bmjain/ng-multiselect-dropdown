(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng-multiselect-dropdown', ['exports', '@angular/core', '@angular/forms', '@angular/common'], factory) :
    (factory((global['ng-multiselect-dropdown'] = {}),global.ng.core,global.ng.forms,global.ng.common));
}(this, (function (exports,core,forms,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ListItem = (function () {
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
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return MultiSelectComponent; }),
        multi: true
    };
    var /** @type {?} */ noop = function () { };
    var MultiSelectComponent = (function () {
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
            this.onFilterChange = new core.EventEmitter();
            this.onSelect = new core.EventEmitter();
            this.onDeSelect = new core.EventEmitter();
            this.onSelectAll = new core.EventEmitter();
            this.onDeSelectAll = new core.EventEmitter();
            this.onTouchedCallback = noop;
            this.onChangeCallback = noop;
        }
        Object.defineProperty(MultiSelectComponent.prototype, "placeholder", {
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
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
             */ function (value) {
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
             */ function (value) {
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
                        catch (e) {
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
            { type: core.Component, args: [{
                        selector: 'ng-multiselect-dropdown',
                        template: "<div tabindex=\"=0\" (blur)=\"onTouched()\" class=\"multiselect-dropdown\" (clickOutside)=\"closeDropdown()\">\n  <div [class.disabled]=\"disabled\">\n    <span tabindex=\"-1\" class=\"dropdown-btn\" (click)=\"toggleDropdown($event)\">\n      <span *ngIf=\"selectedItems.length == 0\">{{_placeholder}}</span>\n      <span class=\"selected-item\" *ngFor=\"let item of selectedItems;trackBy: trackByFn;let k = index\" [hidden]=\"k > _settings.itemsShowLimit-1\">\n        {{item.text}}\n        <a style=\"padding-top:2px;padding-left:2px;color:white\" (click)=\"onItemClick($event,item)\">x</a>\n      </span>\n      <span style=\"float:right !important;padding-right:4px\">\n        <span style=\"padding-right: 6px;\" *ngIf=\"itemShowRemaining()>0\">+{{itemShowRemaining()}}</span>\n        <span [ngClass]=\"isDropdownOpen ? 'dropdown-up' : 'dropdown-down'\"></span>\n      </span>\n    </span>\n  </div>\n  <div class=\"dropdown-list\" [hidden]=\"!isDropdownOpen\">\n    <ul class=\"item1\">\n      <li (click)=\"toggleSelectAll()\" *ngIf=\"_data.length > 0 && !_settings.singleSelection && _settings.enableCheckAll && _settings.limitSelection===-1\"\n        class=\"multiselect-item-checkbox\" style=\"border-bottom: 1px solid #ccc;padding:10px\">\n        <input type=\"checkbox\" [checked]=\"isAllItemsSelected()\" [disabled]=\"disabled || isLimitSelectionReached()\" />\n        <div>{{!isAllItemsSelected() ? _settings.selectAllText : _settings.unSelectAllText}}</div>\n      </li>\n      <li class=\"filter-textbox\" *ngIf=\"_data.length>0 && _settings.allowSearchFilter\">\n        <input type=\"text\" [readOnly]=\"disabled\" [placeholder]=\"_settings.searchPlaceholderText\" [(ngModel)]=\"filter.text\" (ngModelChange)=\"onFilterTextChange($event)\">\n      </li>\n    </ul>\n    <ul class=\"item2\" [style.maxHeight]=\"_settings.maxHeight+'px'\">\n      <li *ngFor=\"let item of _data | ng2ListFilter:filter; let i = index;\" (click)=\"onItemClick($event,item)\" class=\"multiselect-item-checkbox\">\n        <input type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"disabled || (isLimitSelectionReached() && !isSelected(item))\"\n        />\n        <div>{{item.text}}</div>\n      </li>\n      <li class='no-data' *ngIf=\"_data.length == 0\">\n        <h5>{{_settings.noDataAvailablePlaceholderText}}</h5>\n      </li>\n    </ul>\n  </div>\n</div>",
                        styles: [".multiselect-dropdown{position:relative;width:100%}.multiselect-dropdown .dropdown-btn{background-color:#3581f2;display:inline-block;border:1px solid #adadad;width:100%;padding:6px 12px;margin-bottom:0;font-size:14px;font-weight:400;line-height:1.52857143;text-align:left;vertical-align:middle;cursor:pointer;background-image:none;border-radius:4px}.multiselect-dropdown .dropdown-btn .selected-item{border:1px solid #337ab7;margin-right:4px;background:#337ab7;padding:0 5px;color:#fff;border-radius:2px;float:left}.multiselect-dropdown .dropdown-btn .selected-item a{text-decoration:none}.multiselect-dropdown .dropdown-btn .selected-item:hover{box-shadow:1px 1px #959595}.multiselect-dropdown .dropdown-btn .dropdown-down{display:inline-block;top:10px;width:0;height:0;border-top:10px solid #adadad;border-left:10px solid transparent;border-right:10px solid transparent}.multiselect-dropdown .dropdown-btn .dropdown-up{display:inline-block;width:0;height:0;border-bottom:10px solid #adadad;border-left:10px solid transparent;border-right:10px solid transparent}.multiselect-dropdown .disabled>span{background-color:#eceeef}.dropdown-list{position:absolute;padding-top:6px;top:52px;left:1px;width:100%;z-index:9999;border:1px solid #ccc;border-radius:3px;background:#fff;margin-top:0;box-shadow:0 1px 5px #959595}.dropdown-list ul{padding:0;list-style:none;overflow:auto;margin:0}.dropdown-list li{padding:6px 10px;cursor:pointer;text-align:left}.dropdown-list .filter-textbox{border-bottom:1px solid #ccc;position:relative;padding:10px}.dropdown-list .filter-textbox input{border:0;width:100%;padding:0 0 0 26px}.dropdown-list .filter-textbox input:focus{outline:0}.multiselect-item-checkbox input[type=checkbox]{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.multiselect-item-checkbox input[type=checkbox]:focus+div:before,.multiselect-item-checkbox input[type=checkbox]:hover+div:before{border-color:#337ab7;background-color:#f2f2f2}.multiselect-item-checkbox input[type=checkbox]:active+div:before{transition-duration:0s}.multiselect-item-checkbox input[type=checkbox]+div{position:relative;padding-left:2em;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;margin:0;color:#000}.multiselect-item-checkbox input[type=checkbox]+div:before{box-sizing:content-box;content:'';color:#337ab7;position:absolute;top:50%;left:0;width:14px;height:14px;margin-top:-9px;border:2px solid #337ab7;text-align:center;transition:.4s}.multiselect-item-checkbox input[type=checkbox]+div:after{box-sizing:content-box;content:'';position:absolute;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:50%;transform-origin:50%;transition:transform .2s ease-out,-webkit-transform .2s ease-out;background-color:transparent;top:50%;left:4px;width:8px;height:3px;margin-top:-4px;border-style:solid;border-color:#fff;border-width:0 0 3px 3px;-o-border-image:none;border-image:none;-webkit-transform:rotate(-45deg) scale(0);transform:rotate(-45deg) scale(0)}.multiselect-item-checkbox input[type=checkbox]:disabled+div:before{border-color:#ccc}.multiselect-item-checkbox input[type=checkbox]:disabled:focus+div:before .multiselect-item-checkbox input[type=checkbox]:disabled:hover+div:before{background-color:inherit}.multiselect-item-checkbox input[type=checkbox]:disabled:checked+div:before{background-color:#ccc}.multiselect-item-checkbox input[type=checkbox]:checked+div:after{content:'';transition:transform .2s ease-out,-webkit-transform .2s ease-out;-webkit-transform:rotate(-45deg) scale(1);transform:rotate(-45deg) scale(1)}.multiselect-item-checkbox input[type=checkbox]:checked+div:before{-webkit-animation:.2s ease-in borderscale;animation:.2s ease-in borderscale;background:#337ab7}@-webkit-keyframes borderscale{50%{box-shadow:0 0 0 2px #337ab7}}@keyframes borderscale{50%{box-shadow:0 0 0 2px #337ab7}}"],
                        providers: [DROPDOWN_CONTROL_VALUE_ACCESSOR],
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    },] },
        ];
        /** @nocollapse */
        MultiSelectComponent.ctorParameters = function () {
            return [
                { type: core.ChangeDetectorRef, },
            ];
        };
        MultiSelectComponent.propDecorators = {
            "placeholder": [{ type: core.Input },],
            "disabled": [{ type: core.Input },],
            "settings": [{ type: core.Input },],
            "data": [{ type: core.Input },],
            "onFilterChange": [{ type: core.Output, args: ['onFilterChange',] },],
            "onSelect": [{ type: core.Output, args: ['onSelect',] },],
            "onDeSelect": [{ type: core.Output, args: ['onDeSelect',] },],
            "onSelectAll": [{ type: core.Output, args: ['onSelectAll',] },],
            "onDeSelectAll": [{ type: core.Output, args: ['onDeSelectAll',] },],
            "onTouched": [{ type: core.HostListener, args: ['blur',] },],
        };
        return MultiSelectComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ClickOutsideDirective = (function () {
        function ClickOutsideDirective(_elementRef) {
            this._elementRef = _elementRef;
            this.clickOutside = new core.EventEmitter();
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
            { type: core.Directive, args: [{
                        selector: '[clickOutside]'
                    },] },
        ];
        /** @nocollapse */
        ClickOutsideDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef, },
            ];
        };
        ClickOutsideDirective.propDecorators = {
            "clickOutside": [{ type: core.Output },],
            "onClick": [{ type: core.HostListener, args: ['document:click', ['$event', '$event.target'],] },],
        };
        return ClickOutsideDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ListFilterPipe = (function () {
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
            { type: core.Pipe, args: [{
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
    var NgMultiSelectDropDownModule = (function () {
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
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, forms.FormsModule],
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

    exports.MultiSelectComponent = MultiSelectComponent;
    exports.NgMultiSelectDropDownModule = NgMultiSelectDropDownModule;
    exports.ɵb = ClickOutsideDirective;
    exports.ɵc = ListFilterPipe;
    exports.ɵa = DROPDOWN_CONTROL_VALUE_ACCESSOR;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbXVsdGlzZWxlY3QtZHJvcGRvd24udW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZy1tdWx0aXNlbGVjdC1kcm9wZG93bi9tdWx0aXNlbGVjdC5tb2RlbC50cyIsIm5nOi8vbmctbXVsdGlzZWxlY3QtZHJvcGRvd24vbXVsdGlzZWxlY3QuY29tcG9uZW50LnRzIiwibmc6Ly9uZy1tdWx0aXNlbGVjdC1kcm9wZG93bi9jbGljay1vdXRzaWRlLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmctbXVsdGlzZWxlY3QtZHJvcGRvd24vbGlzdC1maWx0ZXIucGlwZS50cyIsIm5nOi8vbmctbXVsdGlzZWxlY3QtZHJvcGRvd24vbmctbXVsdGlzZWxlY3QtZHJvcGRvd24ubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgSURyb3Bkb3duU2V0dGluZ3Mge1xuICBzaW5nbGVTZWxlY3Rpb24/OiBib29sZWFuO1xuICBpZEZpZWxkPzogc3RyaW5nO1xuICB0ZXh0RmllbGQ/OiBzdHJpbmc7XG4gIGVuYWJsZUNoZWNrQWxsPzogYm9vbGVhbjtcbiAgc2VsZWN0QWxsVGV4dD86IHN0cmluZztcbiAgdW5TZWxlY3RBbGxUZXh0Pzogc3RyaW5nO1xuICBhbGxvd1NlYXJjaEZpbHRlcj86IGJvb2xlYW47XG4gIGNsZWFyU2VhcmNoRmlsdGVyPzogYm9vbGVhbjtcbiAgbWF4SGVpZ2h0PzogbnVtYmVyO1xuICBpdGVtc1Nob3dMaW1pdD86IG51bWJlcjtcbiAgbGltaXRTZWxlY3Rpb24/OiBudW1iZXI7XG4gIHNlYXJjaFBsYWNlaG9sZGVyVGV4dD86IHN0cmluZztcbiAgbm9EYXRhQXZhaWxhYmxlUGxhY2Vob2xkZXJUZXh0Pzogc3RyaW5nO1xuICBjbG9zZURyb3BEb3duT25TZWxlY3Rpb24/OiBib29sZWFuO1xuICBzaG93U2VsZWN0ZWRJdGVtc0F0VG9wPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIExpc3RJdGVtIHtcbiAgaWQ6IFN0cmluZztcbiAgdGV4dDogU3RyaW5nO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihzb3VyY2U6IGFueSkge1xuICAgIGlmICh0eXBlb2Ygc291cmNlID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5pZCA9IHRoaXMudGV4dCA9IHNvdXJjZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgPT09ICdvYmplY3QnKSB7XG4gICAgICB0aGlzLmlkID0gc291cmNlLmlkO1xuICAgICAgdGhpcy50ZXh0ID0gc291cmNlLnRleHQ7XG4gICAgfVxuICB9XG59IiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBIb3N0TGlzdGVuZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTGlzdEl0ZW0sIElEcm9wZG93blNldHRpbmdzIH0gZnJvbSAnLi9tdWx0aXNlbGVjdC5tb2RlbCc7XG5cbmV4cG9ydCBjb25zdCBEUk9QRE9XTl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNdWx0aVNlbGVjdENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuY29uc3Qgbm9vcCA9ICgpID0+IHsgfTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctbXVsdGlzZWxlY3QtZHJvcGRvd24nLFxuICB0ZW1wbGF0ZTogYDxkaXYgdGFiaW5kZXg9XCI9MFwiIChibHVyKT1cIm9uVG91Y2hlZCgpXCIgY2xhc3M9XCJtdWx0aXNlbGVjdC1kcm9wZG93blwiIChjbGlja091dHNpZGUpPVwiY2xvc2VEcm9wZG93bigpXCI+XG4gIDxkaXYgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgPHNwYW4gdGFiaW5kZXg9XCItMVwiIGNsYXNzPVwiZHJvcGRvd24tYnRuXCIgKGNsaWNrKT1cInRvZ2dsZURyb3Bkb3duKCRldmVudClcIj5cbiAgICAgIDxzcGFuICpuZ0lmPVwic2VsZWN0ZWRJdGVtcy5sZW5ndGggPT0gMFwiPnt7X3BsYWNlaG9sZGVyfX08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cInNlbGVjdGVkLWl0ZW1cIiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBzZWxlY3RlZEl0ZW1zO3RyYWNrQnk6IHRyYWNrQnlGbjtsZXQgayA9IGluZGV4XCIgW2hpZGRlbl09XCJrID4gX3NldHRpbmdzLml0ZW1zU2hvd0xpbWl0LTFcIj5cbiAgICAgICAge3tpdGVtLnRleHR9fVxuICAgICAgICA8YSBzdHlsZT1cInBhZGRpbmctdG9wOjJweDtwYWRkaW5nLWxlZnQ6MnB4O2NvbG9yOndoaXRlXCIgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudCxpdGVtKVwiPng8L2E+XG4gICAgICA8L3NwYW4+XG4gICAgICA8c3BhbiBzdHlsZT1cImZsb2F0OnJpZ2h0ICFpbXBvcnRhbnQ7cGFkZGluZy1yaWdodDo0cHhcIj5cbiAgICAgICAgPHNwYW4gc3R5bGU9XCJwYWRkaW5nLXJpZ2h0OiA2cHg7XCIgKm5nSWY9XCJpdGVtU2hvd1JlbWFpbmluZygpPjBcIj4re3tpdGVtU2hvd1JlbWFpbmluZygpfX08L3NwYW4+XG4gICAgICAgIDxzcGFuIFtuZ0NsYXNzXT1cImlzRHJvcGRvd25PcGVuID8gJ2Ryb3Bkb3duLXVwJyA6ICdkcm9wZG93bi1kb3duJ1wiPjwvc3Bhbj5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L3NwYW4+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiZHJvcGRvd24tbGlzdFwiIFtoaWRkZW5dPVwiIWlzRHJvcGRvd25PcGVuXCI+XG4gICAgPHVsIGNsYXNzPVwiaXRlbTFcIj5cbiAgICAgIDxsaSAoY2xpY2spPVwidG9nZ2xlU2VsZWN0QWxsKClcIiAqbmdJZj1cIl9kYXRhLmxlbmd0aCA+IDAgJiYgIV9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24gJiYgX3NldHRpbmdzLmVuYWJsZUNoZWNrQWxsICYmIF9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbj09PS0xXCJcbiAgICAgICAgY2xhc3M9XCJtdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94XCIgc3R5bGU9XCJib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NjYztwYWRkaW5nOjEwcHhcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIFtjaGVja2VkXT1cImlzQWxsSXRlbXNTZWxlY3RlZCgpXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkIHx8IGlzTGltaXRTZWxlY3Rpb25SZWFjaGVkKClcIiAvPlxuICAgICAgICA8ZGl2Pnt7IWlzQWxsSXRlbXNTZWxlY3RlZCgpID8gX3NldHRpbmdzLnNlbGVjdEFsbFRleHQgOiBfc2V0dGluZ3MudW5TZWxlY3RBbGxUZXh0fX08L2Rpdj5cbiAgICAgIDwvbGk+XG4gICAgICA8bGkgY2xhc3M9XCJmaWx0ZXItdGV4dGJveFwiICpuZ0lmPVwiX2RhdGEubGVuZ3RoPjAgJiYgX3NldHRpbmdzLmFsbG93U2VhcmNoRmlsdGVyXCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIFtyZWFkT25seV09XCJkaXNhYmxlZFwiIFtwbGFjZWhvbGRlcl09XCJfc2V0dGluZ3Muc2VhcmNoUGxhY2Vob2xkZXJUZXh0XCIgWyhuZ01vZGVsKV09XCJmaWx0ZXIudGV4dFwiIChuZ01vZGVsQ2hhbmdlKT1cIm9uRmlsdGVyVGV4dENoYW5nZSgkZXZlbnQpXCI+XG4gICAgICA8L2xpPlxuICAgIDwvdWw+XG4gICAgPHVsIGNsYXNzPVwiaXRlbTJcIiBbc3R5bGUubWF4SGVpZ2h0XT1cIl9zZXR0aW5ncy5tYXhIZWlnaHQrJ3B4J1wiPlxuICAgICAgPGxpICpuZ0Zvcj1cImxldCBpdGVtIG9mIF9kYXRhIHwgbmcyTGlzdEZpbHRlcjpmaWx0ZXI7IGxldCBpID0gaW5kZXg7XCIgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudCxpdGVtKVwiIGNsYXNzPVwibXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveFwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgW2NoZWNrZWRdPVwiaXNTZWxlY3RlZChpdGVtKVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZCB8fCAoaXNMaW1pdFNlbGVjdGlvblJlYWNoZWQoKSAmJiAhaXNTZWxlY3RlZChpdGVtKSlcIlxuICAgICAgICAvPlxuICAgICAgICA8ZGl2Pnt7aXRlbS50ZXh0fX08L2Rpdj5cbiAgICAgIDwvbGk+XG4gICAgICA8bGkgY2xhc3M9J25vLWRhdGEnICpuZ0lmPVwiX2RhdGEubGVuZ3RoID09IDBcIj5cbiAgICAgICAgPGg1Pnt7X3NldHRpbmdzLm5vRGF0YUF2YWlsYWJsZVBsYWNlaG9sZGVyVGV4dH19PC9oNT5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgPC9kaXY+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgLm11bHRpc2VsZWN0LWRyb3Bkb3due3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMCV9Lm11bHRpc2VsZWN0LWRyb3Bkb3duIC5kcm9wZG93bi1idG57YmFja2dyb3VuZC1jb2xvcjojMzU4MWYyO2Rpc3BsYXk6aW5saW5lLWJsb2NrO2JvcmRlcjoxcHggc29saWQgI2FkYWRhZDt3aWR0aDoxMDAlO3BhZGRpbmc6NnB4IDEycHg7bWFyZ2luLWJvdHRvbTowO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjQwMDtsaW5lLWhlaWdodDoxLjUyODU3MTQzO3RleHQtYWxpZ246bGVmdDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7Y3Vyc29yOnBvaW50ZXI7YmFja2dyb3VuZC1pbWFnZTpub25lO2JvcmRlci1yYWRpdXM6NHB4fS5tdWx0aXNlbGVjdC1kcm9wZG93biAuZHJvcGRvd24tYnRuIC5zZWxlY3RlZC1pdGVte2JvcmRlcjoxcHggc29saWQgIzMzN2FiNzttYXJnaW4tcmlnaHQ6NHB4O2JhY2tncm91bmQ6IzMzN2FiNztwYWRkaW5nOjAgNXB4O2NvbG9yOiNmZmY7Ym9yZGVyLXJhZGl1czoycHg7ZmxvYXQ6bGVmdH0ubXVsdGlzZWxlY3QtZHJvcGRvd24gLmRyb3Bkb3duLWJ0biAuc2VsZWN0ZWQtaXRlbSBhe3RleHQtZGVjb3JhdGlvbjpub25lfS5tdWx0aXNlbGVjdC1kcm9wZG93biAuZHJvcGRvd24tYnRuIC5zZWxlY3RlZC1pdGVtOmhvdmVye2JveC1zaGFkb3c6MXB4IDFweCAjOTU5NTk1fS5tdWx0aXNlbGVjdC1kcm9wZG93biAuZHJvcGRvd24tYnRuIC5kcm9wZG93bi1kb3due2Rpc3BsYXk6aW5saW5lLWJsb2NrO3RvcDoxMHB4O3dpZHRoOjA7aGVpZ2h0OjA7Ym9yZGVyLXRvcDoxMHB4IHNvbGlkICNhZGFkYWQ7Ym9yZGVyLWxlZnQ6MTBweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItcmlnaHQ6MTBweCBzb2xpZCB0cmFuc3BhcmVudH0ubXVsdGlzZWxlY3QtZHJvcGRvd24gLmRyb3Bkb3duLWJ0biAuZHJvcGRvd24tdXB7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MDtoZWlnaHQ6MDtib3JkZXItYm90dG9tOjEwcHggc29saWQgI2FkYWRhZDtib3JkZXItbGVmdDoxMHB4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1yaWdodDoxMHB4IHNvbGlkIHRyYW5zcGFyZW50fS5tdWx0aXNlbGVjdC1kcm9wZG93biAuZGlzYWJsZWQ+c3BhbntiYWNrZ3JvdW5kLWNvbG9yOiNlY2VlZWZ9LmRyb3Bkb3duLWxpc3R7cG9zaXRpb246YWJzb2x1dGU7cGFkZGluZy10b3A6NnB4O3RvcDo1MnB4O2xlZnQ6MXB4O3dpZHRoOjEwMCU7ei1pbmRleDo5OTk5O2JvcmRlcjoxcHggc29saWQgI2NjYztib3JkZXItcmFkaXVzOjNweDtiYWNrZ3JvdW5kOiNmZmY7bWFyZ2luLXRvcDowO2JveC1zaGFkb3c6MCAxcHggNXB4ICM5NTk1OTV9LmRyb3Bkb3duLWxpc3QgdWx7cGFkZGluZzowO2xpc3Qtc3R5bGU6bm9uZTtvdmVyZmxvdzphdXRvO21hcmdpbjowfS5kcm9wZG93bi1saXN0IGxpe3BhZGRpbmc6NnB4IDEwcHg7Y3Vyc29yOnBvaW50ZXI7dGV4dC1hbGlnbjpsZWZ0fS5kcm9wZG93bi1saXN0IC5maWx0ZXItdGV4dGJveHtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjY2NjO3Bvc2l0aW9uOnJlbGF0aXZlO3BhZGRpbmc6MTBweH0uZHJvcGRvd24tbGlzdCAuZmlsdGVyLXRleHRib3ggaW5wdXR7Ym9yZGVyOjA7d2lkdGg6MTAwJTtwYWRkaW5nOjAgMCAwIDI2cHh9LmRyb3Bkb3duLWxpc3QgLmZpbHRlci10ZXh0Ym94IGlucHV0OmZvY3Vze291dGxpbmU6MH0ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XXtib3JkZXI6MDtjbGlwOnJlY3QoMCAwIDAgMCk7aGVpZ2h0OjFweDttYXJnaW46LTFweDtvdmVyZmxvdzpoaWRkZW47cGFkZGluZzowO3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjFweH0ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XTpmb2N1cytkaXY6YmVmb3JlLC5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdOmhvdmVyK2RpdjpiZWZvcmV7Ym9yZGVyLWNvbG9yOiMzMzdhYjc7YmFja2dyb3VuZC1jb2xvcjojZjJmMmYyfS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdOmFjdGl2ZStkaXY6YmVmb3Jle3RyYW5zaXRpb24tZHVyYXRpb246MHN9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF0rZGl2e3Bvc2l0aW9uOnJlbGF0aXZlO3BhZGRpbmctbGVmdDoyZW07dmVydGljYWwtYWxpZ246bWlkZGxlOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZTtjdXJzb3I6cG9pbnRlcjttYXJnaW46MDtjb2xvcjojMDAwfS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdK2RpdjpiZWZvcmV7Ym94LXNpemluZzpjb250ZW50LWJveDtjb250ZW50OicnO2NvbG9yOiMzMzdhYjc7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTtsZWZ0OjA7d2lkdGg6MTRweDtoZWlnaHQ6MTRweDttYXJnaW4tdG9wOi05cHg7Ym9yZGVyOjJweCBzb2xpZCAjMzM3YWI3O3RleHQtYWxpZ246Y2VudGVyO3RyYW5zaXRpb246LjRzfS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdK2RpdjphZnRlcntib3gtc2l6aW5nOmNvbnRlbnQtYm94O2NvbnRlbnQ6Jyc7cG9zaXRpb246YWJzb2x1dGU7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMCk7dHJhbnNmb3JtOnNjYWxlKDApOy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjo1MCU7dHJhbnNmb3JtLW9yaWdpbjo1MCU7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjJzIGVhc2Utb3V0LC13ZWJraXQtdHJhbnNmb3JtIC4ycyBlYXNlLW91dDtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O3RvcDo1MCU7bGVmdDo0cHg7d2lkdGg6OHB4O2hlaWdodDozcHg7bWFyZ2luLXRvcDotNHB4O2JvcmRlci1zdHlsZTpzb2xpZDtib3JkZXItY29sb3I6I2ZmZjtib3JkZXItd2lkdGg6MCAwIDNweCAzcHg7LW8tYm9yZGVyLWltYWdlOm5vbmU7Ym9yZGVyLWltYWdlOm5vbmU7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKC00NWRlZykgc2NhbGUoMCk7dHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpIHNjYWxlKDApfS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdOmRpc2FibGVkK2RpdjpiZWZvcmV7Ym9yZGVyLWNvbG9yOiNjY2N9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06ZGlzYWJsZWQ6Zm9jdXMrZGl2OmJlZm9yZSAubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XTpkaXNhYmxlZDpob3ZlcitkaXY6YmVmb3Jle2JhY2tncm91bmQtY29sb3I6aW5oZXJpdH0ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XTpkaXNhYmxlZDpjaGVja2VkK2RpdjpiZWZvcmV7YmFja2dyb3VuZC1jb2xvcjojY2NjfS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdOmNoZWNrZWQrZGl2OmFmdGVye2NvbnRlbnQ6Jyc7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjJzIGVhc2Utb3V0LC13ZWJraXQtdHJhbnNmb3JtIC4ycyBlYXNlLW91dDstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoLTQ1ZGVnKSBzY2FsZSgxKTt0cmFuc2Zvcm06cm90YXRlKC00NWRlZykgc2NhbGUoMSl9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06Y2hlY2tlZCtkaXY6YmVmb3Jley13ZWJraXQtYW5pbWF0aW9uOi4ycyBlYXNlLWluIGJvcmRlcnNjYWxlO2FuaW1hdGlvbjouMnMgZWFzZS1pbiBib3JkZXJzY2FsZTtiYWNrZ3JvdW5kOiMzMzdhYjd9QC13ZWJraXQta2V5ZnJhbWVzIGJvcmRlcnNjYWxlezUwJXtib3gtc2hhZG93OjAgMCAwIDJweCAjMzM3YWI3fX1Aa2V5ZnJhbWVzIGJvcmRlcnNjYWxlezUwJXtib3gtc2hhZG93OjAgMCAwIDJweCAjMzM3YWI3fX1gXSxcbiAgcHJvdmlkZXJzOiBbRFJPUERPV05fQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE11bHRpU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBwdWJsaWMgX3NldHRpbmdzOiBJRHJvcGRvd25TZXR0aW5ncztcbiAgcHVibGljIF9kYXRhOiBBcnJheTxMaXN0SXRlbT4gPSBbXTtcbiAgcHVibGljIHNlbGVjdGVkSXRlbXM6IEFycmF5PExpc3RJdGVtPiA9IFtdO1xuICBwdWJsaWMgaXNEcm9wZG93bk9wZW4gPSBmYWxzZTtcbiAgX3BsYWNlaG9sZGVyID0gJ1NlbGVjdCc7XG4gIGZpbHRlcjogTGlzdEl0ZW0gPSBuZXcgTGlzdEl0ZW0odGhpcy5kYXRhKTtcbiAgZGVmYXVsdFNldHRpbmdzOiBJRHJvcGRvd25TZXR0aW5ncyA9IHtcbiAgICBzaW5nbGVTZWxlY3Rpb246IGZhbHNlLFxuICAgIGlkRmllbGQ6ICdpZCcsXG4gICAgdGV4dEZpZWxkOiAndGV4dCcsXG4gICAgZW5hYmxlQ2hlY2tBbGw6IHRydWUsXG4gICAgc2VsZWN0QWxsVGV4dDogJ1NlbGVjdCBBbGwnLFxuICAgIHVuU2VsZWN0QWxsVGV4dDogJ1VuU2VsZWN0IEFsbCcsXG4gICAgYWxsb3dTZWFyY2hGaWx0ZXI6IGZhbHNlLFxuICAgIGxpbWl0U2VsZWN0aW9uOiAtMSxcbiAgICBjbGVhclNlYXJjaEZpbHRlcjogdHJ1ZSxcbiAgICBtYXhIZWlnaHQ6IDE5NyxcbiAgICBpdGVtc1Nob3dMaW1pdDogOTk5OTk5OTk5OTk5LFxuICAgIHNlYXJjaFBsYWNlaG9sZGVyVGV4dDogJ1NlYXJjaCcsXG4gICAgbm9EYXRhQXZhaWxhYmxlUGxhY2Vob2xkZXJUZXh0OiAnTm8gZGF0YSBhdmFpbGFibGUnLFxuICAgIGNsb3NlRHJvcERvd25PblNlbGVjdGlvbjogZmFsc2UsXG4gICAgc2hvd1NlbGVjdGVkSXRlbXNBdFRvcDogZmFsc2VcbiAgfTtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IHBsYWNlaG9sZGVyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gJ1NlbGVjdCc7XG4gICAgfVxuICB9XG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBzZXR0aW5ncyh2YWx1ZTogSURyb3Bkb3duU2V0dGluZ3MpIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuX3NldHRpbmdzID0gT2JqZWN0LmFzc2lnbih0aGlzLmRlZmF1bHRTZXR0aW5ncywgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24odGhpcy5kZWZhdWx0U2V0dGluZ3MpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgZGF0YSh2YWx1ZTogQXJyYXk8YW55Pikge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY29uc3QgX2l0ZW1zID0gdmFsdWUuZmlsdGVyKChpdGVtOiBhbnkpID0+IHtcbiAgICAgIC8vICAgaWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJyB8fCAodHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnICYmIGl0ZW0gJiYgaXRlbVt0aGlzLl9zZXR0aW5ncy5pZEZpZWxkXSAmJiBpdGVtW3RoaXMuX3NldHRpbmdzLnRleHRGaWVsZF0pKSB7XG4gICAgICAvLyAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH0pO1xuICAgICAgdGhpcy5fZGF0YSA9IHZhbHVlLm1hcChcbiAgICAgICAgKGl0ZW06IGFueSkgPT5cbiAgICAgICAgICB0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgID8gbmV3IExpc3RJdGVtKGl0ZW0pXG4gICAgICAgICAgICA6IG5ldyBMaXN0SXRlbSh7XG4gICAgICAgICAgICAgIGlkOiBpdGVtW3RoaXMuX3NldHRpbmdzLmlkRmllbGRdLFxuICAgICAgICAgICAgICB0ZXh0OiBpdGVtW3RoaXMuX3NldHRpbmdzLnRleHRGaWVsZF1cbiAgICAgICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoJ29uRmlsdGVyQ2hhbmdlJykgb25GaWx0ZXJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxMaXN0SXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCdvblNlbGVjdCcpIG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8TGlzdEl0ZW0+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgnb25EZVNlbGVjdCcpIG9uRGVTZWxlY3Q6IEV2ZW50RW1pdHRlcjxMaXN0SXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCdvblNlbGVjdEFsbCcpIG9uU2VsZWN0QWxsOiBFdmVudEVtaXR0ZXI8QXJyYXk8TGlzdEl0ZW0+PiA9IG5ldyBFdmVudEVtaXR0ZXI8QXJyYXk8YW55Pj4oKTtcblxuICBAT3V0cHV0KCdvbkRlU2VsZWN0QWxsJykgb25EZVNlbGVjdEFsbDogRXZlbnRFbWl0dGVyPEFycmF5PExpc3RJdGVtPj4gPSBuZXcgRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+KCk7XG5cbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgb25GaWx0ZXJUZXh0Q2hhbmdlKCRldmVudCkge1xuICAgIHRoaXMub25GaWx0ZXJDaGFuZ2UuZW1pdCgkZXZlbnQpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7IH1cblxuICBvbkl0ZW1DbGljaygkZXZlbnQ6IGFueSwgaXRlbTogTGlzdEl0ZW0pIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGZvdW5kID0gdGhpcy5pc1NlbGVjdGVkKGl0ZW0pO1xuICAgIGNvbnN0IGFsbG93QWRkID0gdGhpcy5fc2V0dGluZ3MubGltaXRTZWxlY3Rpb24gPT09IC0xIHx8ICh0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA+IDAgJiYgdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aCA8IHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uKTtcbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICBpZiAoYWxsb3dBZGQpIHtcbiAgICAgICAgdGhpcy5hZGRTZWxlY3RlZChpdGVtKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVTZWxlY3RlZChpdGVtKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3NldHRpbmdzLnNpbmdsZVNlbGVjdGlvbiAmJiB0aGlzLl9zZXR0aW5ncy5jbG9zZURyb3BEb3duT25TZWxlY3Rpb24pIHtcbiAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuICAgIH1cbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmICh0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0SXRlbSA9IHZhbHVlWzBdO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW1xuICAgICAgICAgICAgICB0eXBlb2YgZmlyc3RJdGVtID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgID8gbmV3IExpc3RJdGVtKGZpcnN0SXRlbSlcbiAgICAgICAgICAgICAgICA6IG5ldyBMaXN0SXRlbSh7XG4gICAgICAgICAgICAgICAgICBpZDogZmlyc3RJdGVtW3RoaXMuX3NldHRpbmdzLmlkRmllbGRdLFxuICAgICAgICAgICAgICAgICAgdGV4dDogZmlyc3RJdGVtW3RoaXMuX3NldHRpbmdzLnRleHRGaWVsZF1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKGUuYm9keS5tc2cpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBfZGF0YSA9IHZhbHVlLm1hcChcbiAgICAgICAgICAoaXRlbTogYW55KSA9PlxuICAgICAgICAgICAgdHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAgID8gbmV3IExpc3RJdGVtKGl0ZW0pXG4gICAgICAgICAgICAgIDogbmV3IExpc3RJdGVtKHtcbiAgICAgICAgICAgICAgICBpZDogaXRlbVt0aGlzLl9zZXR0aW5ncy5pZEZpZWxkXSxcbiAgICAgICAgICAgICAgICB0ZXh0OiBpdGVtW3RoaXMuX3NldHRpbmdzLnRleHRGaWVsZF1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uID4gMCkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IF9kYXRhLnNwbGljZSgwLCB0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gX2RhdGE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XG4gICAgfVxuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2YWx1ZSk7XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBTZXQgdG91Y2hlZCBvbiBibHVyXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICBwdWJsaWMgb25Ub3VjaGVkKCkge1xuICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgfVxuXG4gIHRyYWNrQnlGbihpbmRleCwgaXRlbSkge1xuICAgIHJldHVybiBpdGVtLmlkO1xuICB9XG5cbiAgaXNTZWxlY3RlZChjbGlja2VkSXRlbTogTGlzdEl0ZW0pIHtcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmIChjbGlja2VkSXRlbS5pZCA9PT0gaXRlbS5pZCkge1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZvdW5kO1xuICB9XG5cbiAgaXNMaW1pdFNlbGVjdGlvblJlYWNoZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uID09PSB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoO1xuICB9XG5cbiAgaXNBbGxJdGVtc1NlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kYXRhLmxlbmd0aCA9PT0gdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aDtcbiAgfVxuXG4gIHNob3dCdXR0b24oKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24pIHtcbiAgICAgIGlmICh0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA+IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gdGhpcy5fc2V0dGluZ3MuZW5hYmxlQ2hlY2tBbGwgPSB0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA9PT0gLTEgPyB0cnVlIDogZmFsc2U7XG4gICAgICByZXR1cm4gdHJ1ZTsgLy8gIXRoaXMuX3NldHRpbmdzLnNpbmdsZVNlbGVjdGlvbiAmJiB0aGlzLl9zZXR0aW5ncy5lbmFibGVDaGVja0FsbCAmJiB0aGlzLl9kYXRhLmxlbmd0aCA+IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHNob3VsZCBiZSBkaXNhYmxlZCBpbiBzaW5nbGUgc2VsZWN0aW9uIG1vZGVcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBpdGVtU2hvd1JlbWFpbmluZygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoIC0gdGhpcy5fc2V0dGluZ3MuaXRlbXNTaG93TGltaXQ7XG4gIH1cblxuICBhZGRTZWxlY3RlZChpdGVtOiBMaXN0SXRlbSkge1xuICAgIGlmICh0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24pIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5lbWl0dGVkVmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1zKSk7XG4gICAgdGhpcy5vblNlbGVjdC5lbWl0KHRoaXMuZW1pdHRlZFZhbHVlKGl0ZW0pKTtcbiAgfVxuXG4gIHJlbW92ZVNlbGVjdGVkKGl0ZW1TZWw6IExpc3RJdGVtKSB7XG4gICAgdGhpcy5zZWxlY3RlZEl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoaXRlbVNlbC5pZCA9PT0gaXRlbS5pZCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMuc3BsaWNlKHRoaXMuc2VsZWN0ZWRJdGVtcy5pbmRleE9mKGl0ZW0pLCAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5lbWl0dGVkVmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1zKSk7XG4gICAgdGhpcy5vbkRlU2VsZWN0LmVtaXQodGhpcy5lbWl0dGVkVmFsdWUoaXRlbVNlbCkpO1xuICB9XG5cbiAgZW1pdHRlZFZhbHVlKHZhbDogYW55KTogYW55IHtcbiAgICBjb25zdCBzZWxlY3RlZCA9IFtdO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgIHZhbC5tYXAoaXRlbSA9PiB7XG4gICAgICAgIGlmIChpdGVtLmlkID09PSBpdGVtLnRleHQpIHtcbiAgICAgICAgICBzZWxlY3RlZC5wdXNoKGl0ZW0udGV4dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VsZWN0ZWQucHVzaCh0aGlzLm9iamVjdGlmeShpdGVtKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodmFsKSB7XG4gICAgICAgIGlmICh2YWwuaWQgPT09IHZhbC50ZXh0KSB7XG4gICAgICAgICAgcmV0dXJuIHZhbC50ZXh0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLm9iamVjdGlmeSh2YWwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzZWxlY3RlZDtcbiAgfVxuXG4gIG9iamVjdGlmeSh2YWw6IExpc3RJdGVtKSB7XG4gICAgY29uc3Qgb2JqID0ge307XG4gICAgb2JqW3RoaXMuX3NldHRpbmdzLmlkRmllbGRdID0gdmFsLmlkO1xuICAgIG9ialt0aGlzLl9zZXR0aW5ncy50ZXh0RmllbGRdID0gdmFsLnRleHQ7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHRvZ2dsZURyb3Bkb3duKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICh0aGlzLmRpc2FibGVkICYmIHRoaXMuX3NldHRpbmdzLnNpbmdsZVNlbGVjdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmlzRHJvcGRvd25PcGVuID0gIXRoaXMuaXNEcm9wZG93bk9wZW47XG4gIH1cblxuICBjbG9zZURyb3Bkb3duKCkge1xuICAgIHRoaXMuaXNEcm9wZG93bk9wZW4gPSBmYWxzZTtcbiAgICAvLyBjbGVhciBzZWFyY2ggdGV4dFxuICAgIGlmICh0aGlzLl9zZXR0aW5ncy5jbGVhclNlYXJjaEZpbHRlcikge1xuICAgICAgdGhpcy5maWx0ZXIudGV4dCA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZVNlbGVjdEFsbCgpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNBbGxJdGVtc1NlbGVjdGVkKCkpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IHRoaXMuX2RhdGEuc2xpY2UoKTtcbiAgICAgIHRoaXMub25TZWxlY3RBbGwuZW1pdCh0aGlzLmVtaXR0ZWRWYWx1ZSh0aGlzLnNlbGVjdGVkSXRlbXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XG4gICAgICB0aGlzLm9uRGVTZWxlY3RBbGwuZW1pdCh0aGlzLmVtaXR0ZWRWYWx1ZSh0aGlzLnNlbGVjdGVkSXRlbXMpKTtcbiAgICB9XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuZW1pdHRlZFZhbHVlKHRoaXMuc2VsZWN0ZWRJdGVtcykpO1xuICB9XG59XG4iLCJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2NsaWNrT3V0c2lkZV0nXG59KVxuZXhwb3J0IGNsYXNzIENsaWNrT3V0c2lkZURpcmVjdGl2ZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIH1cblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBjbGlja091dHNpZGUgPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50JywgJyRldmVudC50YXJnZXQnXSlcbiAgICBwdWJsaWMgb25DbGljayhldmVudDogTW91c2VFdmVudCwgdGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0YXJnZXRFbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjbGlja2VkSW5zaWRlID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKHRhcmdldEVsZW1lbnQpO1xuICAgICAgICBpZiAoIWNsaWNrZWRJbnNpZGUpIHtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tPdXRzaWRlLmVtaXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBMaXN0SXRlbSB9IGZyb20gJy4vbXVsdGlzZWxlY3QubW9kZWwnO1xuXG5AUGlwZSh7XG4gICAgbmFtZTogJ25nMkxpc3RGaWx0ZXInLFxuICAgIHB1cmU6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIExpc3RGaWx0ZXJQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgdHJhbnNmb3JtKGl0ZW1zOiBMaXN0SXRlbVtdLCBmaWx0ZXI6IExpc3RJdGVtKTogTGlzdEl0ZW1bXSB7XG4gICAgICAgIGlmICghaXRlbXMgfHwgIWZpbHRlcikge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpdGVtcy5maWx0ZXIoKGl0ZW06IExpc3RJdGVtKSA9PiB0aGlzLmFwcGx5RmlsdGVyKGl0ZW0sIGZpbHRlcikpO1xuICAgIH1cblxuICAgIGFwcGx5RmlsdGVyKGl0ZW06IExpc3RJdGVtLCBmaWx0ZXI6IExpc3RJdGVtKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhKGZpbHRlci50ZXh0ICYmIGl0ZW0udGV4dCAmJiBpdGVtLnRleHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlci50ZXh0LnRvTG93ZXJDYXNlKCkpID09PSAtMSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE11bHRpU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9tdWx0aXNlbGVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2xpY2tPdXRzaWRlRGlyZWN0aXZlIH0gZnJvbSAnLi9jbGljay1vdXRzaWRlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBMaXN0RmlsdGVyUGlwZSB9IGZyb20gJy4vbGlzdC1maWx0ZXIucGlwZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTXVsdGlTZWxlY3RDb21wb25lbnQsIENsaWNrT3V0c2lkZURpcmVjdGl2ZSwgTGlzdEZpbHRlclBpcGVdLFxuICBleHBvcnRzOiBbTXVsdGlTZWxlY3RDb21wb25lbnRdXG59KVxuXG5leHBvcnQgY2xhc3MgTmdNdWx0aVNlbGVjdERyb3BEb3duTW9kdWxlIHtcbiAgICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5nTW9kdWxlOiBOZ011bHRpU2VsZWN0RHJvcERvd25Nb2R1bGVcbiAgICAgIH07XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbIk5HX1ZBTFVFX0FDQ0VTU09SIiwiZm9yd2FyZFJlZiIsIkV2ZW50RW1pdHRlciIsIkNvbXBvbmVudCIsIkNoYW5nZURldGVjdGlvblN0cmF0ZWd5IiwiQ2hhbmdlRGV0ZWN0b3JSZWYiLCJJbnB1dCIsIk91dHB1dCIsIkhvc3RMaXN0ZW5lciIsIkRpcmVjdGl2ZSIsIkVsZW1lbnRSZWYiLCJQaXBlIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJGb3Jtc01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQWtCQSxJQUFBOzBCQUlxQixNQUFXO1lBQzVCLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO2dCQUM5QixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO2FBQzlCO1lBQ0QsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ3pCOzt1QkE3Qkw7UUErQkMsQ0FBQTs7Ozs7O0FDL0JELHlCQWFhLCtCQUErQixHQUFRO1FBQ2xELE9BQU8sRUFBRUEsdUJBQWlCO1FBQzFCLFdBQVcsRUFBRUMsZUFBVSxDQUFDLGNBQU0sT0FBQSxvQkFBb0IsR0FBQSxDQUFDO1FBQ25ELEtBQUssRUFBRSxJQUFJ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