// SimpleGrid.js
(function(Sqor) {
    // Dependencies
    var HTML = Sqor.Services.HTML;
    var $ = Sqor.$;
    var _ = Sqor._;

    // Constants for this specific class
    Sqor.CONSTANTS.SimpleGrid = {
            ROWS_FIRST: "rows_first"
        ,   COLUMNS_FIRST: "columns_first"
    };

    var CONSTANTS = Sqor.CONSTANTS.SimpleGrid;
    // TODO(Jason):  document usage
    // TODO(Jason): test edge cases for maxColumn: 0, 1,
    // TODO(Jason): what are valid default values?
    //   --- some type of error handling library would be super cool

    /**
     * A simple grid that can be used to display anything from a simple one
     * column table to a multi-dimensional.
     *
     ******************************************
     * Example: Simple One Column
     ******************************************
     *   Here is a verion where our displayDelegate returns max columns
     *   of one.
     *
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
     * |     Cell N         |
     * |                    |
     * +--------------------+
     *
     ******************************************
     *  Example:  Multi Column Example
     ******************************************
     *    Here is an exmaple where we set our displayDelegate to have
     *    3 columns and ordered with row first.
     *
     * +--------------------+--------------------+--------------------+
     * |                    |                    |                    |
     * |     Cell 1         |     Cell 2         |     Cell 3         |
     * +--------------------+--------------------+--------------------+
     * |                    |                    |                    |
     * |     Cell 4         |     Cell 5         |     Cell 6         |
     * +--------------------+--------------------+--------------------+
     * |                    |                    |                    |
     * |     Cell 7         |     Cell 8         |     Cell 9         |
     * +--------------------+--------------------+--------------------+
     * |                    |                    |                    |
     * |     Cell 10        |     Cell 11        |                    |
     * |                    |                    |                    |
     * +--------------------+--------------------+--------------------+
     *
     ********************************
     *
     * Note: since displayDelegate is a function, we can update the
     * layout of the table on the fly by telling this SimpleGrid to rerender
     * itself.
     *
     * Cell Rendering:
     *
     *   Each of these cells is delegated to be rendered by a dataDelegate
     *   which we will call into to ask for every cell. We are just a container
     *
     * @constructor
     * @param {object} options,
     * @return {null}
     */
    var SimpleGrid = function(options){
        var self = this;
        var defaults = {
                parentElement: null
            ,   renderedCallback: $.noop
            , displayDelegate: {
                     maxColumns: function(){ return 1;}
                ,   graphingMode: function(){ return CONSTANTS.ROWS_FIRST;}

            }
            , templateValues: {
                    "className": null
                }
            , dataDelegate: {
                "getNumberOfCells": function(){
                    return 0;
                },
                "getCellAtIndex": function(index){
                    return $("");
                }
            }
        };

        // TODO(Jason): add 'displayDelegate' ... and a fake one..
        // so we can do reload and display in this mode with these many
        // rows...
        self._delegates = [];
        self._options = _.extend({}, defaults, options);
        self._dataDelegate = self._options.dataDelegate;
        self.create(self._options);
    };

    _.extend(SimpleGrid.prototype, {

        /**
         * Creates a simple grid widget, which will allow us to create
         * simple tables side by side of same or similar sizes
         * @param {type} options,
         * @return {null}
         */
        create: function(options){
            var self = this;
            // Setup our  holder element:
            self._el = HTML.createSpinnerHolder();
            self._el.empty();
            self._el.append(HTML.getSpinner());
            HTML.get("simpleGrid", self._options.templateValues,
            function(domElement){
                self._el.empty();
                self._el.append(domElement);
                self._render();
                self._options.renderedCallback(self._el, domElement);
            });
        },

        _getNumberOfRows: function(){
            var self = this;
            var cellCount = self._dataDelegate.getNumberOfCells();
            var maxColumns = self._options.displayDelegate.maxColumns();
            var result =  Math.ceil(cellCount/maxColumns);
            return result;
        },

        _getMaxCellsPerRow: function(){
            var self = this;
            return self._getNumberOfColumns();
        },

        _getNumberOfColumns: function(){
            var self = this;
            return self._options.displayDelegate.maxColumns();
        },

        /**
         * Renders the table by loading each cell from the dataDelegate.
         * @return {null}
         */
        _render: function(){
            var self = this;
            var cellsContainer = self._el.find(".SQOR_cellsContainer");
            var cellCount = self._dataDelegate.getNumberOfCells();
            // Render each cell by calling into our delegate
            // TODO(Jason): do this with a Tempalte.. real one..
            var currentIndex = 0;
            var rowCount = self._getNumberOfRows();
            var columnCount = self._getNumberOfColumns();

            // TODO(Jason): if ROWS_FIRST CONSTANT
            // We loop over our rows, and create
            //  make into function
            for(var rr  = 0; rr < rowCount ; rr++){
                // Create our holder row
                // [ ----- row ----------]
                var rowDOM = $("<div></div>");
                // Now we loop over and insert each cell for a given column
                // at that row level:
                // [ ------- last row full ---]
                // [ [cell0 | cell1 ........  ]
                for(var cc = 0; cc < columnCount; cc++) {
                    // Make sure we haven't gone over
                    if (currentIndex < cellCount) {
                        var currentCellDOM =
                            self._dataDelegate.getCellAtIndex(currentIndex);
                        currentIndex++;
                        rowDOM.append(currentCellDOM);
                    } else {
                    }
                }
                cellsContainer.append(rowDOM);
            }
        },

        /**
         * Set's the current dataDelegate to specifcy cells, and count.
         * @param {object} delegate, dataDelegate containing key methods
         * @return {null}
         */
        setDataDelegate: function(delegate){
            var self = this;
            self._dataDelegate = delegate;
        },

        /**
         * Returns the jQuery dom element representing the SimpleTable
         * @return {object}, jQuery object
         */
        getDomElement: function(){
            var self = this;
            return self._el;
        },

       /**
        * A delegate method we expose as a way to be notified when we should
        * rerender.
        *
        * @return {null}
        */
       dataChanged: function(){
            var self = this;
            self.rerender();
        },

        /**
         * Helper function to rerender (after everything has already been
         * rendered).
         * @return {null}
         */
        rerender: function(){
            var self = this;
            var cellsContainer = self._el.find(".SQOR_cellsContainer");
            cellsContainer.empty();

            self._render();
        },

        // Workaround for annoying last comma rule.
        sdfsd3423452349249239493234: null
    });

    Sqor.Widgets.SimpleGrid = SimpleGrid;
})(Sqor);
