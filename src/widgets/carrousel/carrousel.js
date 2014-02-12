// carrousel.js
(function(Sqor) {
    // Dependencies
    var HTML = Sqor.Services.HTML;
    var $ = Sqor.$;
    var _ = Sqor._;

    /*
     * A simple Carrousel is just a bunch of divs next to each other
     * that can each be clicked on vertically like so:
     *
     * +-----------+------------+-----------+
     * |           |            |           |
     * |    ABC    |    ZXY     |    LOC    |
     * +-----------+------------+-----------+
     *
     * Usage:
     * ---------------------
     *  var options = {
     *      "carts": [
     *              {"key": "abc", value: "ABC"}
     *          ,   {"key": "zxy", value: "ZXY"}
     *          ,   {"key": "location", value: "LOC"}
     *      ]
     *  };
     *  var carrousel = new Sqor.Widgets.Carrousel(options);
     *
     * ---------------------
     * @constructor
     * @param {type} options,
     * @return {Null}
     */
    var Carrousel = function(options){
        var self = this;
        var defaults = {
            "carts":  []
        };
        var newOptions = _.extend({}, defaults, options);
        self._delegates = [];
        self._cardElements = [];
        self.create(newOptions);
    };

    Carrousel.prototype = new Sqor.Core.DelegatorBase();
    // Extending our widgets prototype to add basic functionality:
    _.extend(Carrousel.prototype, {

        /**
         * Creates the basic DOM element representing our Widget.
         * @param {Object} options,
         * @return {null}
         */
        create: function(options){
            var self = this;
            self._options = options;
            // Create the DOM element
            self._el = HTML.createSpinnerHolder();
            HTML.get("carrousel", self._options, function(domElement){
                self._el.empty();
                self._el.append(domElement);
                self._render();
            });
        },

        /**
         * Render a simple card, one at at time. Uses the data object
         * and appends the DOM element to our parentDom.
         * @param {type} parentDom, holding dom for the carts
         * @param {type} cartData, data representation of the cart
         * @return {Null}
         */
        _renderCart: function(parentDom, cartData) {
            var self = this;
            //TODO(Jason): get template
            var domString = "<span class='SQOR_card' style='margin:10px'>" +
                "</span>";
            var cardEl = $(domString);
            cardEl.text(cartData.value);
            parentDom.append(cardEl);
            cardEl.mouseover(function(ee){
                var options = [self, cartData, cardEl, ee];
                self._notifyDelegates("mouseoverCard", options);
            });
            cardEl.click(function(ee){
                var options = [self, cartData, cardEl, ee];
                self._notifyDelegates("mouseoverCard", options);
            });
            self._cardElements.push(cardEl);
        },

        markAsSelected: function(cardEl, ee, options){
            var self = this;
            var defaults = {
                    "unselectAll": true
                ,   "doneCallback": $.noop
            };
            var _options = _.extend({}, defaults, options);
            if(_options.unselectAll){
                self._unselectAllCarts();
            }
            cardEl.addClass("SQOR_carrousel_card_selected");
        },

        _unselectAllCarts: function(){
            var self = this;
            _.each(self._cardElements, function(cardEl){
                cardEl.removeClass("SQOR_carrousel_card_selected");
            });
        },

        /**
         * Simple rendering function for our carts
         * @return {Null}
         */
        _render: function(){
            var self = this;
            // Render each cart:
            _.each(self._options.carts, function(cartData){
                self._renderCart(self._el, cartData);
            });
        },

        /**
         * Returns the dom element associated with this widget
         * @return {Object}, DOM representation of widget.
         */
        getDomElement: function(){
            var self = this;
            return self._el;
        },

        // Workaround for annoying last comma rule.
        sdfsd3423452349249239493234: null
    });

    // Export our widget
    Sqor.Widgets.Carrousel = Carrousel;
})(Sqor);


