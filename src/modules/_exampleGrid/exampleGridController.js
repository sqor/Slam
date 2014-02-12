// ExampleGridController.js
(function(Sqor){
    // Dependencies
    var HTML = Sqor.Services.HTML;
    var $ = Sqor.$;
    var _ = Sqor._;
    var SimpleCollection = Sqor.Core.SimpleCollection;

    /**
     *  A base example for how to create a siple grid and all the boiler
     *  plate that goes with it.
     *
     *  Should subclass and overwrite getCellAtIndex.
     *
     * @controller
     * @param {type} options,
     * @return {Null}
     */
    var ExampleGridController = function(options){
        if (!_.isReal(options._subclass)){
            var self = this;
            self.create(options);
        }
    };

    _.extend(ExampleGridController.prototype, {

        /**
         * Siple create function to setup model and view along with delegates.
         * @return {null}
         */
        create: function(options){
            var self = this;
            var defaultModelOptions= {
                    path: "/sports/teams"
                ,   fetchAll: true
                ,   urlParams: {
                        sport: "nba"
                    ,   limit: 100
                    ,   offset: 0
                }
            };

            var modelOptions = _.extend({}
                , defaultModelOptions
                , options.modelOptions);

            self._models = new Sqor.Core.SimpleCollection(modelOptions);
            var gridViewOptions = {
                    dataDelegate: self
                // , displayDelegate: self
            };

            self._gridView = new Sqor.Widgets.SimpleGrid(gridViewOptions);
            self._models.addDelegate(self._gridView);

            self._prerender();
        },

        /**
         * A simple rendering function that attaches our grid to our main
         * holding element
         * @return {Null}
         */
        _prerender: function(){
            var self = this;
            // TODO(Jason): fix this, use actual template:
            self._el = $("<div></div");
            self._el.append(self._gridView.getDomElement());
        },

        /**
         * A simple way to return the DOM element representing this controller
         * @return {object} jquery DOM element
         */
        getDomElement: function(){
            var self = this;
            return self._el;
        },

        /**********************************************************************
         *  Delegate API Methods Implemented
         *********************************************************************/

        /**
         * Simple function to return a DOM element for a given cell position.
         * @param {number} index,
         * @return {Object} jquery Object
         */
        getCellAtIndex: function(index) {
            var self = this;
            var model = self._models.getItem(index);
            // var displayCard = self._getWidgeForType(model);
            // return displayCard.getDomElement();
            var options = {
                title: model.name
                , subtitle: model.first_name + " " + model.last_name
                , author: ""
                , imageURI: ""
                , externalURI: ""
            };

            var displayCard  = new Sqor.Widgets.DisplayCard(options);
            return displayCard.getDomElement();
        },

        /**
         * Returns number of cells by calling on model:
         * @return {number} size of table
         */
        getNumberOfCells: function(){
            var self = this;
            return self._models.length();
        },

        // Workaround for annoying last comma rule.
        sdfsd3423452349249239493234: null
    });
    Sqor.Modules.ExampleGridController = ExampleGridController;
})(Sqor);
