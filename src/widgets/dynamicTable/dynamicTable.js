// DynamicTable.js
(function(Sqor) {
    // Dependencies
    var HTML = Sqor.Services.HTML;
    var $ = Sqor.$;
    var _ = Sqor._;

    /**
     *  Our dynamic table subclasses our SimpleTable. It works
     *  in a pretty similar manner with the difference that it supports
     *  appending and prepending of new items without refreshing everything
     *
     *  Usage:
     *  --------------------
     ** var someObject = {
     *  getNumberOfCells: function(){ return 2; },
     *
     *  getCellAtIndex: function(index) {
     *      var cells = [
     *           $("<div> Cell One </div>"),
     *           $("<div> Cell Two </div>"),
     *      ];
     *
     *      return cells[index];
     *  };
     *
     * };
     * var options = {
     *  dataDelegate: someObject
     * };
     *
     * var table = new DynamicTable(options);
     * --------------------
     *
     ***************************
     *  Example: Dynamic Table of a dynamic size... "inifnite" on both ends.
     ***************************
     *  A bit more dynamic table that can dynamically adjust itself to
     *  grow as our Collection/Model changes. Supporting append and prepend
     ***************************
     *
     * +--------------------+
     * |                    |
     * |     ......         |
     * +--------------------+
     * |                    |
     * |     Cell 1         |
     * +--------------------+
     * |                    |
     * |     Cell 2         |
     * +--------------------+
     * |                    |
     * |     Cell 3         |
     * +--------------------+
     * |                    |
     * |     ......         |
     * +--------------------+
     *
     * // Event: dataChanged("append", 2);
     * // Transforms our table (without reloading)
     *
     * +--------------------+
     * |                    |
     * |     ......         |
     * +--------------------+
     * |                    |
     * |     Cell 1         |
     * +--------------------+
     * |                    |
     * |     Cell 2         |
     * +--------------------+
     * |                    |
     * |     Cell 3         |
     * +--------------------+
     * +--------------------+
     * |                    |
     * |     Cell 3         |
     * +--------------------+
     * |                    |
     * |     Cell 4         |
     * +--------------------+
     * |                    |
     * |     ......         |
     * +--------------------+
     *
     ***************************
     * Note: We will be able to be notified when datChanged, just
     * the same way we can with a SimpleTable, but this time we get notified
     * if this is a "append" or "prepend". We will not reload the entire
     * table and only add more tables to the head / tail of the existing rows.
     *
     * @constructor
     * @param {type} options,
     * @return {null}
     */
    var DynamicTable = function(options){
        // Subclass off super
        Sqor.Widgets.SimpleTable.call(this, options);
    };

    DynamicTable.prototype = new  Sqor.Widgets.SimpleTable();

    _.extend(DynamicTable.prototype, {
        /**
         * We are overwriting the original dataChanged method to
         * handle diffs in data changes.
         *
         * @param {string} type,
         * @param {number} count,
         * @return {null}
         */
        dataChanged: function(type, count){
            var self = this;
            // if we don't have a real type
            if(! _.isReal(type)) {
                Sqor.Widgets.SimpleTable.prototype.dataChanged.apply(this);
            } else if( type === "prepend"){
                // We need to add a few rorrws
                self.renderMoreTopRows(count);
            } else if (type === "append"){
                // TODO(Jason): if count > 0
                self.renderMoreBottomRows(count);
            }
        },

        /**
         * Does old school infinite scroll rendering
         * @param {type} count,
         * @return {null}
         */
        renderMoreTopRows: function(count){
            var self = this;
            var cellsContainer = self._el.find(".SQOR_cellsContainer");
            // Render each new cell by calling into our delegate
            for(var ii =  count - 1  ; ii  >=  0 ; ii--){
                var currentCellDOM = self._dataDelegate.getCellAtIndex(ii);
                cellsContainer.prepend(currentCellDOM);
            }
        },

        /**
         * Takes our dom structure and adds rows to the bottom
         * @param {type} count, number of rows to add
         * @return {null}
         */
        renderMoreBottomRows: function(count){
            var self = this;
            var cellsContainer = self._el.find(".SQOR_cellsContainer");
            var cellCount = self._dataDelegate.getNumberOfCells();
            // Render each new cell by calling into our delegate
            for(var ii =  cellCount - count; ii < cellCount; ii++){
                var currentCellDOM = self._dataDelegate.getCellAtIndex(ii);
                cellsContainer.append(currentCellDOM);
            }
        },

        // Workaround for annoying last comma rule.
        sdfsd3423452349249239493234: null
    });

    Sqor.Widgets.DynamicTable = DynamicTable;
})(Sqor);
