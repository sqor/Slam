// SimpleTable.js
(function(Sqor){
    // Dependencies
    var HTML = Sqor.Services.HTML;
    var $ = Sqor.$;
    var _ = Sqor._;

    /**
     * A simple table that renders cells in a list form.
     *
     * Usage:
     * -------------
     * var someObject = {
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
     * var table = new SimpleTable(options);
     *
     * -------------
     *
     ***************************
     *  Example: Simple Table of a Fixed size N
     ***************************
     *  An extremely simple table of fixed size N.
     ***************************
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
     ***************************
     * Hopefully it is clear that the rendering of the actual cells is done
     * by a delegate. This means that this is just a container.
     *
     * @consructor
     * @param {type} options,
     * @return {null}
     */
    var SimpleTable = function(options){
        var self = this;
        var defaults = {
                parentElement: null
            ,   renderedCallback: $.noop
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
        self._delegates = [];
        self._options = _.extend({}, defaults, options);
        self._dataDelegate = self._options.dataDelegate;
        self.create(self._options);
    };

    _.extend(SimpleTable.prototype, {
        /**
         * Creates a simple table by loading the HTML template
         * @param {object} options, used to configure the widget
         * @return {null}
         */
        create: function(options) {
            var self = this;
            // Setup our  holder element:
            self._el = HTML.createSpinnerHolder();
            self._el.empty();
            self._el.append(HTML.getSpinner());
            HTML.get("simpleTable", self._options.templateValues,
            function(domElement){
                self._el.empty();
                self._el.append(domElement);
                self._render();
                self._options.renderedCallback(self._el, domElement);
            });
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
            for(var ii = 0; ii < cellCount; ii++){
                var currentCellDOM = self._dataDelegate.getCellAtIndex(ii);
                cellsContainer.append(currentCellDOM);
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

    // Export our widget
    Sqor.Widgets.SimpleTable = SimpleTable;
})(Sqor);

