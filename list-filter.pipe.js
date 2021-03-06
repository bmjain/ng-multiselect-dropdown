import { Pipe } from '@angular/core';
var ListFilterPipe = (function () {
    function ListFilterPipe() {
    }
    ListFilterPipe.prototype.transform = function (items, filter) {
        var _this = this;
        if (!items || !filter) {
            return items;
        }
        return items.filter(function (item) { return _this.applyFilter(item, filter); });
    };
    ListFilterPipe.prototype.applyFilter = function (item, filter) {
        return !(filter.text && item.text && item.text.toLowerCase().indexOf(filter.text.toLowerCase()) === -1);
    };
    return ListFilterPipe;
}());
export { ListFilterPipe };
ListFilterPipe.decorators = [
    { type: Pipe, args: [{
                name: 'ng2ListFilter',
                pure: false
            },] },
];
/** @nocollapse */
ListFilterPipe.ctorParameters = function () { return []; };
//# sourceMappingURL=list-filter.pipe.js.map