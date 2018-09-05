/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
export function IDropdownSettings() { }
function IDropdownSettings_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    IDropdownSettings.prototype.singleSelection;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.idField;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.textField;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.enableCheckAll;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.selectAllText;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.unSelectAllText;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.allowSearchFilter;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.clearSearchFilter;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.maxHeight;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.itemsShowLimit;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.limitSelection;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.searchPlaceholderText;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.noDataAvailablePlaceholderText;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.closeDropDownOnSelection;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.showSelectedItemsAtTop;
}
export class ListItem {
    /**
     * @param {?} source
     */
    constructor(source) {
        if (typeof source === 'string') {
            this.id = this.text = source;
        }
        if (typeof source === 'object') {
            this.id = source.id;
            this.text = source.text;
        }
    }
}
function ListItem_tsickle_Closure_declarations() {
    /** @type {?} */
    ListItem.prototype.id;
    /** @type {?} */
    ListItem.prototype.text;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlzZWxlY3QubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1tdWx0aXNlbGVjdC1kcm9wZG93bi8iLCJzb3VyY2VzIjpbIm11bHRpc2VsZWN0Lm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkEsTUFBTTs7OztnQkFJZSxNQUFXO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztTQUM5QjtRQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztTQUN6Qjs7Q0FFSiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgSURyb3Bkb3duU2V0dGluZ3Mge1xuICBzaW5nbGVTZWxlY3Rpb24/OiBib29sZWFuO1xuICBpZEZpZWxkPzogc3RyaW5nO1xuICB0ZXh0RmllbGQ/OiBzdHJpbmc7XG4gIGVuYWJsZUNoZWNrQWxsPzogYm9vbGVhbjtcbiAgc2VsZWN0QWxsVGV4dD86IHN0cmluZztcbiAgdW5TZWxlY3RBbGxUZXh0Pzogc3RyaW5nO1xuICBhbGxvd1NlYXJjaEZpbHRlcj86IGJvb2xlYW47XG4gIGNsZWFyU2VhcmNoRmlsdGVyPzogYm9vbGVhbjtcbiAgbWF4SGVpZ2h0PzogbnVtYmVyO1xuICBpdGVtc1Nob3dMaW1pdD86IG51bWJlcjtcbiAgbGltaXRTZWxlY3Rpb24/OiBudW1iZXI7XG4gIHNlYXJjaFBsYWNlaG9sZGVyVGV4dD86IHN0cmluZztcbiAgbm9EYXRhQXZhaWxhYmxlUGxhY2Vob2xkZXJUZXh0Pzogc3RyaW5nO1xuICBjbG9zZURyb3BEb3duT25TZWxlY3Rpb24/OiBib29sZWFuO1xuICBzaG93U2VsZWN0ZWRJdGVtc0F0VG9wPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIExpc3RJdGVtIHtcbiAgaWQ6IFN0cmluZztcbiAgdGV4dDogU3RyaW5nO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihzb3VyY2U6IGFueSkge1xuICAgIGlmICh0eXBlb2Ygc291cmNlID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5pZCA9IHRoaXMudGV4dCA9IHNvdXJjZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgPT09ICdvYmplY3QnKSB7XG4gICAgICB0aGlzLmlkID0gc291cmNlLmlkO1xuICAgICAgdGhpcy50ZXh0ID0gc291cmNlLnRleHQ7XG4gICAgfVxuICB9XG59Il19