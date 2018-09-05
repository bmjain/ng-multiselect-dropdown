/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, HostListener, forwardRef, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ListItem } from './multiselect.model';
export const /** @type {?} */ DROPDOWN_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiSelectComponent),
    multi: true
};
const /** @type {?} */ noop = () => { };
const ɵ0 = noop;
export class MultiSelectComponent {
    /**
     * @param {?} cdr
     */
    constructor(cdr) {
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
    /**
     * @param {?} value
     * @return {?}
     */
    set placeholder(value) {
        if (value) {
            this._placeholder = value;
        }
        else {
            this._placeholder = 'Select';
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set settings(value) {
        if (value) {
            this._settings = Object.assign(this.defaultSettings, value);
        }
        else {
            this._settings = Object.assign(this.defaultSettings);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set data(value) {
        if (!value) {
            this._data = [];
        }
        else {
            // const _items = value.filter((item: any) => {
            //   if (typeof item === 'string' || (typeof item === 'object' && item && item[this._settings.idField] && item[this._settings.textField])) {
            //     return item;
            //   }
            // });
            this._data = value.map((item) => typeof item === 'string'
                ? new ListItem(item)
                : new ListItem({
                    id: item[this._settings.idField],
                    text: item[this._settings.textField]
                }));
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onFilterTextChange($event) {
        this.onFilterChange.emit($event);
    }
    /**
     * @param {?} $event
     * @param {?} item
     * @return {?}
     */
    onItemClick($event, item) {
        if (this.disabled) {
            return false;
        }
        const /** @type {?} */ found = this.isSelected(item);
        const /** @type {?} */ allowAdd = this._settings.limitSelection === -1 || (this._settings.limitSelection > 0 && this.selectedItems.length < this._settings.limitSelection);
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
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== undefined && value !== null && value.length > 0) {
            if (this._settings.singleSelection) {
                try {
                    if (value.length >= 1) {
                        const /** @type {?} */ firstItem = value[0];
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
                const /** @type {?} */ _data = value.map((item) => typeof item === 'string'
                    ? new ListItem(item)
                    : new ListItem({
                        id: item[this._settings.idField],
                        text: item[this._settings.textField]
                    }));
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
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @return {?}
     */
    onTouched() {
        this.closeDropdown();
        this.onTouchedCallback();
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackByFn(index, item) {
        return item.id;
    }
    /**
     * @param {?} clickedItem
     * @return {?}
     */
    isSelected(clickedItem) {
        let /** @type {?} */ found = false;
        this.selectedItems.forEach(item => {
            if (clickedItem.id === item.id) {
                found = true;
            }
        });
        return found;
    }
    /**
     * @return {?}
     */
    isLimitSelectionReached() {
        return this._settings.limitSelection === this.selectedItems.length;
    }
    /**
     * @return {?}
     */
    isAllItemsSelected() {
        return this._data.length === this.selectedItems.length;
    }
    /**
     * @return {?}
     */
    showButton() {
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
    }
    /**
     * @return {?}
     */
    itemShowRemaining() {
        return this.selectedItems.length - this._settings.itemsShowLimit;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    addSelected(item) {
        if (this._settings.singleSelection) {
            this.selectedItems = [];
            this.selectedItems.push(item);
        }
        else {
            this.selectedItems.push(item);
        }
        this.onChangeCallback(this.emittedValue(this.selectedItems));
        this.onSelect.emit(this.emittedValue(item));
    }
    /**
     * @param {?} itemSel
     * @return {?}
     */
    removeSelected(itemSel) {
        this.selectedItems.forEach(item => {
            if (itemSel.id === item.id) {
                this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
            }
        });
        this.onChangeCallback(this.emittedValue(this.selectedItems));
        this.onDeSelect.emit(this.emittedValue(itemSel));
    }
    /**
     * @param {?} val
     * @return {?}
     */
    emittedValue(val) {
        const /** @type {?} */ selected = [];
        if (Array.isArray(val)) {
            val.map(item => {
                if (item.id === item.text) {
                    selected.push(item.text);
                }
                else {
                    selected.push(this.objectify(item));
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
    }
    /**
     * @param {?} val
     * @return {?}
     */
    objectify(val) {
        const /** @type {?} */ obj = {};
        obj[this._settings.idField] = val.id;
        obj[this._settings.textField] = val.text;
        return obj;
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    toggleDropdown(evt) {
        evt.preventDefault();
        if (this.disabled && this._settings.singleSelection) {
            return;
        }
        this.isDropdownOpen = !this.isDropdownOpen;
    }
    /**
     * @return {?}
     */
    closeDropdown() {
        this.isDropdownOpen = false;
        // clear search text
        if (this._settings.clearSearchFilter) {
            this.filter.text = '';
        }
    }
    /**
     * @return {?}
     */
    toggleSelectAll() {
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
    }
}
MultiSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-multiselect-dropdown',
                template: `<div tabindex="=0" (blur)="onTouched()" class="multiselect-dropdown" (clickOutside)="closeDropdown()">
  <div [class.disabled]="disabled">
    <span tabindex="-1" class="dropdown-btn" (click)="toggleDropdown($event)">
      <span *ngIf="selectedItems.length == 0">{{_placeholder}}</span>
      <span class="selected-item" *ngFor="let item of selectedItems;trackBy: trackByFn;let k = index" [hidden]="k > _settings.itemsShowLimit-1">
        {{item.text}}
        <a style="padding-top:2px;padding-left:2px;color:white" (click)="onItemClick($event,item)">x</a>
      </span>
      <span style="float:right !important;padding-right:4px">
        <span style="padding-right: 6px;" *ngIf="itemShowRemaining()>0">+{{itemShowRemaining()}}</span>
        <span [ngClass]="isDropdownOpen ? 'dropdown-up' : 'dropdown-down'"></span>
      </span>
    </span>
  </div>
  <div class="dropdown-list" [hidden]="!isDropdownOpen">
    <ul class="item1">
      <li (click)="toggleSelectAll()" *ngIf="_data.length > 0 && !_settings.singleSelection && _settings.enableCheckAll && _settings.limitSelection===-1"
        class="multiselect-item-checkbox" style="border-bottom: 1px solid #ccc;padding:10px">
        <input type="checkbox" [checked]="isAllItemsSelected()" [disabled]="disabled || isLimitSelectionReached()" />
        <div>{{!isAllItemsSelected() ? _settings.selectAllText : _settings.unSelectAllText}}</div>
      </li>
      <li class="filter-textbox" *ngIf="_data.length>0 && _settings.allowSearchFilter">
        <input type="text" [readOnly]="disabled" [placeholder]="_settings.searchPlaceholderText" [(ngModel)]="filter.text" (ngModelChange)="onFilterTextChange($event)">
      </li>
    </ul>
    <ul class="item2" [style.maxHeight]="_settings.maxHeight+'px'">
      <li *ngFor="let item of _data | ng2ListFilter:filter; let i = index;" (click)="onItemClick($event,item)" class="multiselect-item-checkbox">
        <input type="checkbox" [checked]="isSelected(item)" [disabled]="disabled || (isLimitSelectionReached() && !isSelected(item))"
        />
        <div>{{item.text}}</div>
      </li>
      <li class='no-data' *ngIf="_data.length == 0">
        <h5>{{_settings.noDataAvailablePlaceholderText}}</h5>
      </li>
    </ul>
  </div>
</div>`,
                styles: [`.multiselect-dropdown{position:relative;width:100%}.multiselect-dropdown .dropdown-btn{background-color:#3581f2;display:inline-block;border:1px solid #adadad;width:100%;padding:6px 12px;margin-bottom:0;font-size:14px;font-weight:400;line-height:1.52857143;text-align:left;vertical-align:middle;cursor:pointer;background-image:none;border-radius:4px}.multiselect-dropdown .dropdown-btn .selected-item{border:1px solid #337ab7;margin-right:4px;background:#337ab7;padding:0 5px;color:#fff;border-radius:2px;float:left}.multiselect-dropdown .dropdown-btn .selected-item a{text-decoration:none}.multiselect-dropdown .dropdown-btn .selected-item:hover{box-shadow:1px 1px #959595}.multiselect-dropdown .dropdown-btn .dropdown-down{display:inline-block;top:10px;width:0;height:0;border-top:10px solid #adadad;border-left:10px solid transparent;border-right:10px solid transparent}.multiselect-dropdown .dropdown-btn .dropdown-up{display:inline-block;width:0;height:0;border-bottom:10px solid #adadad;border-left:10px solid transparent;border-right:10px solid transparent}.multiselect-dropdown .disabled>span{background-color:#eceeef}.dropdown-list{position:absolute;padding-top:6px;top:52px;left:1px;width:100%;z-index:9999;border:1px solid #ccc;border-radius:3px;background:#fff;margin-top:0;box-shadow:0 1px 5px #959595}.dropdown-list ul{padding:0;list-style:none;overflow:auto;margin:0}.dropdown-list li{padding:6px 10px;cursor:pointer;text-align:left}.dropdown-list .filter-textbox{border-bottom:1px solid #ccc;position:relative;padding:10px}.dropdown-list .filter-textbox input{border:0;width:100%;padding:0 0 0 26px}.dropdown-list .filter-textbox input:focus{outline:0}.multiselect-item-checkbox input[type=checkbox]{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.multiselect-item-checkbox input[type=checkbox]:focus+div:before,.multiselect-item-checkbox input[type=checkbox]:hover+div:before{border-color:#337ab7;background-color:#f2f2f2}.multiselect-item-checkbox input[type=checkbox]:active+div:before{transition-duration:0s}.multiselect-item-checkbox input[type=checkbox]+div{position:relative;padding-left:2em;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;margin:0;color:#000}.multiselect-item-checkbox input[type=checkbox]+div:before{box-sizing:content-box;content:'';color:#337ab7;position:absolute;top:50%;left:0;width:14px;height:14px;margin-top:-9px;border:2px solid #337ab7;text-align:center;transition:.4s}.multiselect-item-checkbox input[type=checkbox]+div:after{box-sizing:content-box;content:'';position:absolute;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:50%;transform-origin:50%;transition:transform .2s ease-out,-webkit-transform .2s ease-out;background-color:transparent;top:50%;left:4px;width:8px;height:3px;margin-top:-4px;border-style:solid;border-color:#fff;border-width:0 0 3px 3px;-o-border-image:none;border-image:none;-webkit-transform:rotate(-45deg) scale(0);transform:rotate(-45deg) scale(0)}.multiselect-item-checkbox input[type=checkbox]:disabled+div:before{border-color:#ccc}.multiselect-item-checkbox input[type=checkbox]:disabled:focus+div:before .multiselect-item-checkbox input[type=checkbox]:disabled:hover+div:before{background-color:inherit}.multiselect-item-checkbox input[type=checkbox]:disabled:checked+div:before{background-color:#ccc}.multiselect-item-checkbox input[type=checkbox]:checked+div:after{content:'';transition:transform .2s ease-out,-webkit-transform .2s ease-out;-webkit-transform:rotate(-45deg) scale(1);transform:rotate(-45deg) scale(1)}.multiselect-item-checkbox input[type=checkbox]:checked+div:before{-webkit-animation:.2s ease-in borderscale;animation:.2s ease-in borderscale;background:#337ab7}@-webkit-keyframes borderscale{50%{box-shadow:0 0 0 2px #337ab7}}@keyframes borderscale{50%{box-shadow:0 0 0 2px #337ab7}}`],
                providers: [DROPDOWN_CONTROL_VALUE_ACCESSOR],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
MultiSelectComponent.ctorParameters = () => [
    { type: ChangeDetectorRef, },
];
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
function MultiSelectComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MultiSelectComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MultiSelectComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MultiSelectComponent.propDecorators;
    /** @type {?} */
    MultiSelectComponent.prototype._settings;
    /** @type {?} */
    MultiSelectComponent.prototype._data;
    /** @type {?} */
    MultiSelectComponent.prototype.selectedItems;
    /** @type {?} */
    MultiSelectComponent.prototype.isDropdownOpen;
    /** @type {?} */
    MultiSelectComponent.prototype._placeholder;
    /** @type {?} */
    MultiSelectComponent.prototype.filter;
    /** @type {?} */
    MultiSelectComponent.prototype.defaultSettings;
    /** @type {?} */
    MultiSelectComponent.prototype.disabled;
    /** @type {?} */
    MultiSelectComponent.prototype.onFilterChange;
    /** @type {?} */
    MultiSelectComponent.prototype.onSelect;
    /** @type {?} */
    MultiSelectComponent.prototype.onDeSelect;
    /** @type {?} */
    MultiSelectComponent.prototype.onSelectAll;
    /** @type {?} */
    MultiSelectComponent.prototype.onDeSelectAll;
    /** @type {?} */
    MultiSelectComponent.prototype.onTouchedCallback;
    /** @type {?} */
    MultiSelectComponent.prototype.onChangeCallback;
    /** @type {?} */
    MultiSelectComponent.prototype.cdr;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlzZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctbXVsdGlzZWxlY3QtZHJvcGRvd24vIiwic291cmNlcyI6WyJtdWx0aXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsUUFBUSxFQUFxQixNQUFNLHFCQUFxQixDQUFDO0FBRWxFLE1BQU0sQ0FBQyx1QkFBTSwrQkFBK0IsR0FBUTtJQUNsRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUM7SUFDbkQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBQ0YsdUJBQU0sSUFBSSxHQUFHLEdBQUcsRUFBRSxJQUFJLENBQUM7O0FBNkN2QixNQUFNOzs7O0lBbUZKLFlBQW9CLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO3FCQWpGVixFQUFFOzZCQUNNLEVBQUU7OEJBQ2xCLEtBQUs7NEJBQ2QsUUFBUTtzQkFDSixJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOytCQUNMO1lBQ25DLGVBQWUsRUFBRSxLQUFLO1lBQ3RCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsU0FBUyxFQUFFLE1BQU07WUFDakIsY0FBYyxFQUFFLElBQUk7WUFDcEIsYUFBYSxFQUFFLFlBQVk7WUFDM0IsZUFBZSxFQUFFLGNBQWM7WUFDL0IsaUJBQWlCLEVBQUUsS0FBSztZQUN4QixjQUFjLEVBQUUsQ0FBQyxDQUFDO1lBQ2xCLGlCQUFpQixFQUFFLElBQUk7WUFD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Z0JBQzVDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7O1lBdERDLGlCQUFpQjs7OzRCQWdGaEIsS0FBSzt5QkFRTCxLQUFLO3lCQUVMLEtBQUs7cUJBU0wsS0FBSzsrQkFzQkwsTUFBTSxTQUFDLGdCQUFnQjt5QkFFdkIsTUFBTSxTQUFDLFVBQVU7MkJBRWpCLE1BQU0sU0FBQyxZQUFZOzRCQUVuQixNQUFNLFNBQUMsYUFBYTs4QkFFcEIsTUFBTSxTQUFDLGVBQWU7MEJBaUZ0QixZQUFZLFNBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSG9zdExpc3RlbmVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IExpc3RJdGVtLCBJRHJvcGRvd25TZXR0aW5ncyB9IGZyb20gJy4vbXVsdGlzZWxlY3QubW9kZWwnO1xuXG5leHBvcnQgY29uc3QgRFJPUERPV05fQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTXVsdGlTZWxlY3RDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcbmNvbnN0IG5vb3AgPSAoKSA9PiB7IH07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLW11bHRpc2VsZWN0LWRyb3Bkb3duJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IHRhYmluZGV4PVwiPTBcIiAoYmx1cik9XCJvblRvdWNoZWQoKVwiIGNsYXNzPVwibXVsdGlzZWxlY3QtZHJvcGRvd25cIiAoY2xpY2tPdXRzaWRlKT1cImNsb3NlRHJvcGRvd24oKVwiPlxuICA8ZGl2IFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuICAgIDxzcGFuIHRhYmluZGV4PVwiLTFcIiBjbGFzcz1cImRyb3Bkb3duLWJ0blwiIChjbGljayk9XCJ0b2dnbGVEcm9wZG93bigkZXZlbnQpXCI+XG4gICAgICA8c3BhbiAqbmdJZj1cInNlbGVjdGVkSXRlbXMubGVuZ3RoID09IDBcIj57e19wbGFjZWhvbGRlcn19PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJzZWxlY3RlZC1pdGVtXCIgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygc2VsZWN0ZWRJdGVtczt0cmFja0J5OiB0cmFja0J5Rm47bGV0IGsgPSBpbmRleFwiIFtoaWRkZW5dPVwiayA+IF9zZXR0aW5ncy5pdGVtc1Nob3dMaW1pdC0xXCI+XG4gICAgICAgIHt7aXRlbS50ZXh0fX1cbiAgICAgICAgPGEgc3R5bGU9XCJwYWRkaW5nLXRvcDoycHg7cGFkZGluZy1sZWZ0OjJweDtjb2xvcjp3aGl0ZVwiIChjbGljayk9XCJvbkl0ZW1DbGljaygkZXZlbnQsaXRlbSlcIj54PC9hPlxuICAgICAgPC9zcGFuPlxuICAgICAgPHNwYW4gc3R5bGU9XCJmbG9hdDpyaWdodCAhaW1wb3J0YW50O3BhZGRpbmctcmlnaHQ6NHB4XCI+XG4gICAgICAgIDxzcGFuIHN0eWxlPVwicGFkZGluZy1yaWdodDogNnB4O1wiICpuZ0lmPVwiaXRlbVNob3dSZW1haW5pbmcoKT4wXCI+K3t7aXRlbVNob3dSZW1haW5pbmcoKX19PC9zcGFuPlxuICAgICAgICA8c3BhbiBbbmdDbGFzc109XCJpc0Ryb3Bkb3duT3BlbiA/ICdkcm9wZG93bi11cCcgOiAnZHJvcGRvd24tZG93bidcIj48L3NwYW4+XG4gICAgICA8L3NwYW4+XG4gICAgPC9zcGFuPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImRyb3Bkb3duLWxpc3RcIiBbaGlkZGVuXT1cIiFpc0Ryb3Bkb3duT3BlblwiPlxuICAgIDx1bCBjbGFzcz1cIml0ZW0xXCI+XG4gICAgICA8bGkgKGNsaWNrKT1cInRvZ2dsZVNlbGVjdEFsbCgpXCIgKm5nSWY9XCJfZGF0YS5sZW5ndGggPiAwICYmICFfc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uICYmIF9zZXR0aW5ncy5lbmFibGVDaGVja0FsbCAmJiBfc2V0dGluZ3MubGltaXRTZWxlY3Rpb249PT0tMVwiXG4gICAgICAgIGNsYXNzPVwibXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveFwiIHN0eWxlPVwiYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2M7cGFkZGluZzoxMHB4XCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBbY2hlY2tlZF09XCJpc0FsbEl0ZW1zU2VsZWN0ZWQoKVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZCB8fCBpc0xpbWl0U2VsZWN0aW9uUmVhY2hlZCgpXCIgLz5cbiAgICAgICAgPGRpdj57eyFpc0FsbEl0ZW1zU2VsZWN0ZWQoKSA/IF9zZXR0aW5ncy5zZWxlY3RBbGxUZXh0IDogX3NldHRpbmdzLnVuU2VsZWN0QWxsVGV4dH19PC9kaXY+XG4gICAgICA8L2xpPlxuICAgICAgPGxpIGNsYXNzPVwiZmlsdGVyLXRleHRib3hcIiAqbmdJZj1cIl9kYXRhLmxlbmd0aD4wICYmIF9zZXR0aW5ncy5hbGxvd1NlYXJjaEZpbHRlclwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBbcmVhZE9ubHldPVwiZGlzYWJsZWRcIiBbcGxhY2Vob2xkZXJdPVwiX3NldHRpbmdzLnNlYXJjaFBsYWNlaG9sZGVyVGV4dFwiIFsobmdNb2RlbCldPVwiZmlsdGVyLnRleHRcIiAobmdNb2RlbENoYW5nZSk9XCJvbkZpbHRlclRleHRDaGFuZ2UoJGV2ZW50KVwiPlxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICAgIDx1bCBjbGFzcz1cIml0ZW0yXCIgW3N0eWxlLm1heEhlaWdodF09XCJfc2V0dGluZ3MubWF4SGVpZ2h0KydweCdcIj5cbiAgICAgIDxsaSAqbmdGb3I9XCJsZXQgaXRlbSBvZiBfZGF0YSB8IG5nMkxpc3RGaWx0ZXI6ZmlsdGVyOyBsZXQgaSA9IGluZGV4O1wiIChjbGljayk9XCJvbkl0ZW1DbGljaygkZXZlbnQsaXRlbSlcIiBjbGFzcz1cIm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3hcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIFtjaGVja2VkXT1cImlzU2VsZWN0ZWQoaXRlbSlcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWQgfHwgKGlzTGltaXRTZWxlY3Rpb25SZWFjaGVkKCkgJiYgIWlzU2VsZWN0ZWQoaXRlbSkpXCJcbiAgICAgICAgLz5cbiAgICAgICAgPGRpdj57e2l0ZW0udGV4dH19PC9kaXY+XG4gICAgICA8L2xpPlxuICAgICAgPGxpIGNsYXNzPSduby1kYXRhJyAqbmdJZj1cIl9kYXRhLmxlbmd0aCA9PSAwXCI+XG4gICAgICAgIDxoNT57e19zZXR0aW5ncy5ub0RhdGFBdmFpbGFibGVQbGFjZWhvbGRlclRleHR9fTwvaDU+XG4gICAgICA8L2xpPlxuICAgIDwvdWw+XG4gIDwvZGl2PlxuPC9kaXY+YCxcbiAgc3R5bGVzOiBbYC5tdWx0aXNlbGVjdC1kcm9wZG93bntwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDoxMDAlfS5tdWx0aXNlbGVjdC1kcm9wZG93biAuZHJvcGRvd24tYnRue2JhY2tncm91bmQtY29sb3I6IzM1ODFmMjtkaXNwbGF5OmlubGluZS1ibG9jaztib3JkZXI6MXB4IHNvbGlkICNhZGFkYWQ7d2lkdGg6MTAwJTtwYWRkaW5nOjZweCAxMnB4O21hcmdpbi1ib3R0b206MDtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo0MDA7bGluZS1oZWlnaHQ6MS41Mjg1NzE0Mzt0ZXh0LWFsaWduOmxlZnQ7dmVydGljYWwtYWxpZ246bWlkZGxlO2N1cnNvcjpwb2ludGVyO2JhY2tncm91bmQtaW1hZ2U6bm9uZTtib3JkZXItcmFkaXVzOjRweH0ubXVsdGlzZWxlY3QtZHJvcGRvd24gLmRyb3Bkb3duLWJ0biAuc2VsZWN0ZWQtaXRlbXtib3JkZXI6MXB4IHNvbGlkICMzMzdhYjc7bWFyZ2luLXJpZ2h0OjRweDtiYWNrZ3JvdW5kOiMzMzdhYjc7cGFkZGluZzowIDVweDtjb2xvcjojZmZmO2JvcmRlci1yYWRpdXM6MnB4O2Zsb2F0OmxlZnR9Lm11bHRpc2VsZWN0LWRyb3Bkb3duIC5kcm9wZG93bi1idG4gLnNlbGVjdGVkLWl0ZW0gYXt0ZXh0LWRlY29yYXRpb246bm9uZX0ubXVsdGlzZWxlY3QtZHJvcGRvd24gLmRyb3Bkb3duLWJ0biAuc2VsZWN0ZWQtaXRlbTpob3Zlcntib3gtc2hhZG93OjFweCAxcHggIzk1OTU5NX0ubXVsdGlzZWxlY3QtZHJvcGRvd24gLmRyb3Bkb3duLWJ0biAuZHJvcGRvd24tZG93bntkaXNwbGF5OmlubGluZS1ibG9jazt0b3A6MTBweDt3aWR0aDowO2hlaWdodDowO2JvcmRlci10b3A6MTBweCBzb2xpZCAjYWRhZGFkO2JvcmRlci1sZWZ0OjEwcHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLXJpZ2h0OjEwcHggc29saWQgdHJhbnNwYXJlbnR9Lm11bHRpc2VsZWN0LWRyb3Bkb3duIC5kcm9wZG93bi1idG4gLmRyb3Bkb3duLXVwe2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjA7aGVpZ2h0OjA7Ym9yZGVyLWJvdHRvbToxMHB4IHNvbGlkICNhZGFkYWQ7Ym9yZGVyLWxlZnQ6MTBweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItcmlnaHQ6MTBweCBzb2xpZCB0cmFuc3BhcmVudH0ubXVsdGlzZWxlY3QtZHJvcGRvd24gLmRpc2FibGVkPnNwYW57YmFja2dyb3VuZC1jb2xvcjojZWNlZWVmfS5kcm9wZG93bi1saXN0e3Bvc2l0aW9uOmFic29sdXRlO3BhZGRpbmctdG9wOjZweDt0b3A6NTJweDtsZWZ0OjFweDt3aWR0aDoxMDAlO3otaW5kZXg6OTk5OTtib3JkZXI6MXB4IHNvbGlkICNjY2M7Ym9yZGVyLXJhZGl1czozcHg7YmFja2dyb3VuZDojZmZmO21hcmdpbi10b3A6MDtib3gtc2hhZG93OjAgMXB4IDVweCAjOTU5NTk1fS5kcm9wZG93bi1saXN0IHVse3BhZGRpbmc6MDtsaXN0LXN0eWxlOm5vbmU7b3ZlcmZsb3c6YXV0bzttYXJnaW46MH0uZHJvcGRvd24tbGlzdCBsaXtwYWRkaW5nOjZweCAxMHB4O2N1cnNvcjpwb2ludGVyO3RleHQtYWxpZ246bGVmdH0uZHJvcGRvd24tbGlzdCAuZmlsdGVyLXRleHRib3h7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2NjYztwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nOjEwcHh9LmRyb3Bkb3duLWxpc3QgLmZpbHRlci10ZXh0Ym94IGlucHV0e2JvcmRlcjowO3dpZHRoOjEwMCU7cGFkZGluZzowIDAgMCAyNnB4fS5kcm9wZG93bi1saXN0IC5maWx0ZXItdGV4dGJveCBpbnB1dDpmb2N1c3tvdXRsaW5lOjB9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF17Ym9yZGVyOjA7Y2xpcDpyZWN0KDAgMCAwIDApO2hlaWdodDoxcHg7bWFyZ2luOi0xcHg7b3ZlcmZsb3c6aGlkZGVuO3BhZGRpbmc6MDtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxcHh9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06Zm9jdXMrZGl2OmJlZm9yZSwubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XTpob3ZlcitkaXY6YmVmb3Jle2JvcmRlci1jb2xvcjojMzM3YWI3O2JhY2tncm91bmQtY29sb3I6I2YyZjJmMn0ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XTphY3RpdmUrZGl2OmJlZm9yZXt0cmFuc2l0aW9uLWR1cmF0aW9uOjBzfS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdK2Rpdntwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nLWxlZnQ6MmVtO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7Y3Vyc29yOnBvaW50ZXI7bWFyZ2luOjA7Y29sb3I6IzAwMH0ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XStkaXY6YmVmb3Jle2JveC1zaXppbmc6Y29udGVudC1ib3g7Y29udGVudDonJztjb2xvcjojMzM3YWI3O3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bGVmdDowO3dpZHRoOjE0cHg7aGVpZ2h0OjE0cHg7bWFyZ2luLXRvcDotOXB4O2JvcmRlcjoycHggc29saWQgIzMzN2FiNzt0ZXh0LWFsaWduOmNlbnRlcjt0cmFuc2l0aW9uOi40c30ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XStkaXY6YWZ0ZXJ7Ym94LXNpemluZzpjb250ZW50LWJveDtjb250ZW50OicnO3Bvc2l0aW9uOmFic29sdXRlOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDApO3RyYW5zZm9ybTpzY2FsZSgwKTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46NTAlO3RyYW5zZm9ybS1vcmlnaW46NTAlO3RyYW5zaXRpb246dHJhbnNmb3JtIC4ycyBlYXNlLW91dCwtd2Via2l0LXRyYW5zZm9ybSAuMnMgZWFzZS1vdXQ7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDt0b3A6NTAlO2xlZnQ6NHB4O3dpZHRoOjhweDtoZWlnaHQ6M3B4O21hcmdpbi10b3A6LTRweDtib3JkZXItc3R5bGU6c29saWQ7Ym9yZGVyLWNvbG9yOiNmZmY7Ym9yZGVyLXdpZHRoOjAgMCAzcHggM3B4Oy1vLWJvcmRlci1pbWFnZTpub25lO2JvcmRlci1pbWFnZTpub25lOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpIHNjYWxlKDApO3RyYW5zZm9ybTpyb3RhdGUoLTQ1ZGVnKSBzY2FsZSgwKX0ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XTpkaXNhYmxlZCtkaXY6YmVmb3Jle2JvcmRlci1jb2xvcjojY2NjfS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdOmRpc2FibGVkOmZvY3VzK2RpdjpiZWZvcmUgLm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06ZGlzYWJsZWQ6aG92ZXIrZGl2OmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOmluaGVyaXR9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06ZGlzYWJsZWQ6Y2hlY2tlZCtkaXY6YmVmb3Jle2JhY2tncm91bmQtY29sb3I6I2NjY30ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XTpjaGVja2VkK2RpdjphZnRlcntjb250ZW50OicnO3RyYW5zaXRpb246dHJhbnNmb3JtIC4ycyBlYXNlLW91dCwtd2Via2l0LXRyYW5zZm9ybSAuMnMgZWFzZS1vdXQ7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKC00NWRlZykgc2NhbGUoMSk7dHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpIHNjYWxlKDEpfS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdOmNoZWNrZWQrZGl2OmJlZm9yZXstd2Via2l0LWFuaW1hdGlvbjouMnMgZWFzZS1pbiBib3JkZXJzY2FsZTthbmltYXRpb246LjJzIGVhc2UtaW4gYm9yZGVyc2NhbGU7YmFja2dyb3VuZDojMzM3YWI3fUAtd2Via2l0LWtleWZyYW1lcyBib3JkZXJzY2FsZXs1MCV7Ym94LXNoYWRvdzowIDAgMCAycHggIzMzN2FiN319QGtleWZyYW1lcyBib3JkZXJzY2FsZXs1MCV7Ym94LXNoYWRvdzowIDAgMCAycHggIzMzN2FiN319YF0sXG4gIHByb3ZpZGVyczogW0RST1BET1dOX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNdWx0aVNlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgcHVibGljIF9zZXR0aW5nczogSURyb3Bkb3duU2V0dGluZ3M7XG4gIHB1YmxpYyBfZGF0YTogQXJyYXk8TGlzdEl0ZW0+ID0gW107XG4gIHB1YmxpYyBzZWxlY3RlZEl0ZW1zOiBBcnJheTxMaXN0SXRlbT4gPSBbXTtcbiAgcHVibGljIGlzRHJvcGRvd25PcGVuID0gZmFsc2U7XG4gIF9wbGFjZWhvbGRlciA9ICdTZWxlY3QnO1xuICBmaWx0ZXI6IExpc3RJdGVtID0gbmV3IExpc3RJdGVtKHRoaXMuZGF0YSk7XG4gIGRlZmF1bHRTZXR0aW5nczogSURyb3Bkb3duU2V0dGluZ3MgPSB7XG4gICAgc2luZ2xlU2VsZWN0aW9uOiBmYWxzZSxcbiAgICBpZEZpZWxkOiAnaWQnLFxuICAgIHRleHRGaWVsZDogJ3RleHQnLFxuICAgIGVuYWJsZUNoZWNrQWxsOiB0cnVlLFxuICAgIHNlbGVjdEFsbFRleHQ6ICdTZWxlY3QgQWxsJyxcbiAgICB1blNlbGVjdEFsbFRleHQ6ICdVblNlbGVjdCBBbGwnLFxuICAgIGFsbG93U2VhcmNoRmlsdGVyOiBmYWxzZSxcbiAgICBsaW1pdFNlbGVjdGlvbjogLTEsXG4gICAgY2xlYXJTZWFyY2hGaWx0ZXI6IHRydWUsXG4gICAgbWF4SGVpZ2h0OiAxOTcsXG4gICAgaXRlbXNTaG93TGltaXQ6IDk5OTk5OTk5OTk5OSxcbiAgICBzZWFyY2hQbGFjZWhvbGRlclRleHQ6ICdTZWFyY2gnLFxuICAgIG5vRGF0YUF2YWlsYWJsZVBsYWNlaG9sZGVyVGV4dDogJ05vIGRhdGEgYXZhaWxhYmxlJyxcbiAgICBjbG9zZURyb3BEb3duT25TZWxlY3Rpb246IGZhbHNlLFxuICAgIHNob3dTZWxlY3RlZEl0ZW1zQXRUb3A6IGZhbHNlXG4gIH07XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBwbGFjZWhvbGRlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLl9wbGFjZWhvbGRlciA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9wbGFjZWhvbGRlciA9ICdTZWxlY3QnO1xuICAgIH1cbiAgfVxuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgc2V0dGluZ3ModmFsdWU6IElEcm9wZG93blNldHRpbmdzKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLl9zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24odGhpcy5kZWZhdWx0U2V0dGluZ3MsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHRoaXMuZGVmYXVsdFNldHRpbmdzKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IGRhdGEodmFsdWU6IEFycmF5PGFueT4pIHtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICB0aGlzLl9kYXRhID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGNvbnN0IF9pdGVtcyA9IHZhbHVlLmZpbHRlcigoaXRlbTogYW55KSA9PiB7XG4gICAgICAvLyAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycgfHwgKHR5cGVvZiBpdGVtID09PSAnb2JqZWN0JyAmJiBpdGVtICYmIGl0ZW1bdGhpcy5fc2V0dGluZ3MuaWRGaWVsZF0gJiYgaXRlbVt0aGlzLl9zZXR0aW5ncy50ZXh0RmllbGRdKSkge1xuICAgICAgLy8gICAgIHJldHVybiBpdGVtO1xuICAgICAgLy8gICB9XG4gICAgICAvLyB9KTtcbiAgICAgIHRoaXMuX2RhdGEgPSB2YWx1ZS5tYXAoXG4gICAgICAgIChpdGVtOiBhbnkpID0+XG4gICAgICAgICAgdHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnXG4gICAgICAgICAgICA/IG5ldyBMaXN0SXRlbShpdGVtKVxuICAgICAgICAgICAgOiBuZXcgTGlzdEl0ZW0oe1xuICAgICAgICAgICAgICBpZDogaXRlbVt0aGlzLl9zZXR0aW5ncy5pZEZpZWxkXSxcbiAgICAgICAgICAgICAgdGV4dDogaXRlbVt0aGlzLl9zZXR0aW5ncy50ZXh0RmllbGRdXG4gICAgICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCdvbkZpbHRlckNoYW5nZScpIG9uRmlsdGVyQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TGlzdEl0ZW0+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgnb25TZWxlY3QnKSBvblNlbGVjdDogRXZlbnRFbWl0dGVyPExpc3RJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoJ29uRGVTZWxlY3QnKSBvbkRlU2VsZWN0OiBFdmVudEVtaXR0ZXI8TGlzdEl0ZW0+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgnb25TZWxlY3RBbGwnKSBvblNlbGVjdEFsbDogRXZlbnRFbWl0dGVyPEFycmF5PExpc3RJdGVtPj4gPSBuZXcgRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+KCk7XG5cbiAgQE91dHB1dCgnb25EZVNlbGVjdEFsbCcpIG9uRGVTZWxlY3RBbGw6IEV2ZW50RW1pdHRlcjxBcnJheTxMaXN0SXRlbT4+ID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxhbnk+PigpO1xuXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIG9uRmlsdGVyVGV4dENoYW5nZSgkZXZlbnQpIHtcbiAgICB0aGlzLm9uRmlsdGVyQ2hhbmdlLmVtaXQoJGV2ZW50KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikgeyB9XG5cbiAgb25JdGVtQ2xpY2soJGV2ZW50OiBhbnksIGl0ZW06IExpc3RJdGVtKSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBmb3VuZCA9IHRoaXMuaXNTZWxlY3RlZChpdGVtKTtcbiAgICBjb25zdCBhbGxvd0FkZCA9IHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uID09PSAtMSB8fCAodGhpcy5fc2V0dGluZ3MubGltaXRTZWxlY3Rpb24gPiAwICYmIHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGggPCB0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbik7XG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgaWYgKGFsbG93QWRkKSB7XG4gICAgICAgIHRoaXMuYWRkU2VsZWN0ZWQoaXRlbSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVtb3ZlU2VsZWN0ZWQoaXRlbSk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24gJiYgdGhpcy5fc2V0dGluZ3MuY2xvc2VEcm9wRG93bk9uU2VsZWN0aW9uKSB7XG4gICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcbiAgICB9XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICBpZiAodGhpcy5fc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgICAgICBjb25zdCBmaXJzdEl0ZW0gPSB2YWx1ZVswXTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IFtcbiAgICAgICAgICAgICAgdHlwZW9mIGZpcnN0SXRlbSA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgICAgICA/IG5ldyBMaXN0SXRlbShmaXJzdEl0ZW0pXG4gICAgICAgICAgICAgICAgOiBuZXcgTGlzdEl0ZW0oe1xuICAgICAgICAgICAgICAgICAgaWQ6IGZpcnN0SXRlbVt0aGlzLl9zZXR0aW5ncy5pZEZpZWxkXSxcbiAgICAgICAgICAgICAgICAgIHRleHQ6IGZpcnN0SXRlbVt0aGlzLl9zZXR0aW5ncy50ZXh0RmllbGRdXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5lcnJvcihlLmJvZHkubXNnKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgX2RhdGEgPSB2YWx1ZS5tYXAoXG4gICAgICAgICAgKGl0ZW06IGFueSkgPT5cbiAgICAgICAgICAgIHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgICA/IG5ldyBMaXN0SXRlbShpdGVtKVxuICAgICAgICAgICAgICA6IG5ldyBMaXN0SXRlbSh7XG4gICAgICAgICAgICAgICAgaWQ6IGl0ZW1bdGhpcy5fc2V0dGluZ3MuaWRGaWVsZF0sXG4gICAgICAgICAgICAgICAgdGV4dDogaXRlbVt0aGlzLl9zZXR0aW5ncy50ZXh0RmllbGRdXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICAgIGlmICh0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA+IDApIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBfZGF0YS5zcGxpY2UoMCwgdGhpcy5fc2V0dGluZ3MubGltaXRTZWxlY3Rpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IF9kYXRhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICAgIH1cbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodmFsdWUpO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgLy8gU2V0IHRvdWNoZWQgb24gYmx1clxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgcHVibGljIG9uVG91Y2hlZCgpIHtcbiAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gIH1cblxuICB0cmFja0J5Rm4oaW5kZXgsIGl0ZW0pIHtcbiAgICByZXR1cm4gaXRlbS5pZDtcbiAgfVxuXG4gIGlzU2VsZWN0ZWQoY2xpY2tlZEl0ZW06IExpc3RJdGVtKSB7XG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgdGhpcy5zZWxlY3RlZEl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoY2xpY2tlZEl0ZW0uaWQgPT09IGl0ZW0uaWQpIHtcbiAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmb3VuZDtcbiAgfVxuXG4gIGlzTGltaXRTZWxlY3Rpb25SZWFjaGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA9PT0gdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aDtcbiAgfVxuXG4gIGlzQWxsSXRlbXNTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YS5sZW5ndGggPT09IHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7XG4gIH1cblxuICBzaG93QnV0dG9uKCk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5fc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uKSB7XG4gICAgICBpZiAodGhpcy5fc2V0dGluZ3MubGltaXRTZWxlY3Rpb24gPiAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIHRoaXMuX3NldHRpbmdzLmVuYWJsZUNoZWNrQWxsID0gdGhpcy5fc2V0dGluZ3MubGltaXRTZWxlY3Rpb24gPT09IC0xID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgcmV0dXJuIHRydWU7IC8vICF0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24gJiYgdGhpcy5fc2V0dGluZ3MuZW5hYmxlQ2hlY2tBbGwgJiYgdGhpcy5fZGF0YS5sZW5ndGggPiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzaG91bGQgYmUgZGlzYWJsZWQgaW4gc2luZ2xlIHNlbGVjdGlvbiBtb2RlXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgaXRlbVNob3dSZW1haW5pbmcoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aCAtIHRoaXMuX3NldHRpbmdzLml0ZW1zU2hvd0xpbWl0O1xuICB9XG5cbiAgYWRkU2VsZWN0ZWQoaXRlbTogTGlzdEl0ZW0pIHtcbiAgICBpZiAodGhpcy5fc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXTtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5wdXNoKGl0ZW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbXMucHVzaChpdGVtKTtcbiAgICB9XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuZW1pdHRlZFZhbHVlKHRoaXMuc2VsZWN0ZWRJdGVtcykpO1xuICAgIHRoaXMub25TZWxlY3QuZW1pdCh0aGlzLmVtaXR0ZWRWYWx1ZShpdGVtKSk7XG4gIH1cblxuICByZW1vdmVTZWxlY3RlZChpdGVtU2VsOiBMaXN0SXRlbSkge1xuICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaWYgKGl0ZW1TZWwuaWQgPT09IGl0ZW0uaWQpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLnNwbGljZSh0aGlzLnNlbGVjdGVkSXRlbXMuaW5kZXhPZihpdGVtKSwgMSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuZW1pdHRlZFZhbHVlKHRoaXMuc2VsZWN0ZWRJdGVtcykpO1xuICAgIHRoaXMub25EZVNlbGVjdC5lbWl0KHRoaXMuZW1pdHRlZFZhbHVlKGl0ZW1TZWwpKTtcbiAgfVxuXG4gIGVtaXR0ZWRWYWx1ZSh2YWw6IGFueSk6IGFueSB7XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSBbXTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICB2YWwubWFwKGl0ZW0gPT4ge1xuICAgICAgICBpZiAoaXRlbS5pZCA9PT0gaXRlbS50ZXh0KSB7XG4gICAgICAgICAgc2VsZWN0ZWQucHVzaChpdGVtLnRleHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGVjdGVkLnB1c2godGhpcy5vYmplY3RpZnkoaXRlbSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHZhbCkge1xuICAgICAgICBpZiAodmFsLmlkID09PSB2YWwudGV4dCkge1xuICAgICAgICAgIHJldHVybiB2YWwudGV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RpZnkodmFsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0ZWQ7XG4gIH1cblxuICBvYmplY3RpZnkodmFsOiBMaXN0SXRlbSkge1xuICAgIGNvbnN0IG9iaiA9IHt9O1xuICAgIG9ialt0aGlzLl9zZXR0aW5ncy5pZEZpZWxkXSA9IHZhbC5pZDtcbiAgICBvYmpbdGhpcy5fc2V0dGluZ3MudGV4dEZpZWxkXSA9IHZhbC50ZXh0O1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICB0b2dnbGVEcm9wZG93bihldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCAmJiB0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5pc0Ryb3Bkb3duT3BlbiA9ICF0aGlzLmlzRHJvcGRvd25PcGVuO1xuICB9XG5cbiAgY2xvc2VEcm9wZG93bigpIHtcbiAgICB0aGlzLmlzRHJvcGRvd25PcGVuID0gZmFsc2U7XG4gICAgLy8gY2xlYXIgc2VhcmNoIHRleHRcbiAgICBpZiAodGhpcy5fc2V0dGluZ3MuY2xlYXJTZWFyY2hGaWx0ZXIpIHtcbiAgICAgIHRoaXMuZmlsdGVyLnRleHQgPSAnJztcbiAgICB9XG4gIH1cblxuICB0b2dnbGVTZWxlY3RBbGwoKSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmlzQWxsSXRlbXNTZWxlY3RlZCgpKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSB0aGlzLl9kYXRhLnNsaWNlKCk7XG4gICAgICB0aGlzLm9uU2VsZWN0QWxsLmVtaXQodGhpcy5lbWl0dGVkVmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1zKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICAgICAgdGhpcy5vbkRlU2VsZWN0QWxsLmVtaXQodGhpcy5lbWl0dGVkVmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1zKSk7XG4gICAgfVxuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLmVtaXR0ZWRWYWx1ZSh0aGlzLnNlbGVjdGVkSXRlbXMpKTtcbiAgfVxufVxuIl19