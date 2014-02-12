// DisplayCard.js
(function(Sqor) {
    // Dependencies
    var HTML = Sqor.Services.HTML;
    var $ = Sqor.$;
    var _ = Sqor._;

    /**
     * DisplayCard is a very simple widget that takes in an image, a title,
     * a subtitle, and a set of links associated with each element in the form
     * of callbacks.
     *
     *   +---------------------------------------------------+
     *   |                                                   |
     *   | +-----------+                                     |
     *   | |           | Title: Some Sample Title            |
     *   | |           |                                     |
     *   | |    IMG    | Subtitle Label: Some Subtitle       |
     *   | |           |                                     |
     *   | +-----------+                                     |
     *   |                                                   |
     *   +---------------------------------------------------+
     *
     * Usage:
     * ----------
     *      var c = new Sqor.Widgets.DisplayCard({title: "Simple Name"});
     *      $('body').append(c.getDomElement());
     *      c.reloadData({"name": "NewName"});
     *
     * ----------
     *
     * @constructor
     * @param {object} options, simple ways to configure our DisplayCard
     * @return {object}, the display card itself
     */
    var DisplayCard = function(options) {
        // The default values this widget can take:
        var defaults = {
                    tltle: ""
                ,   titleLabel: ""
                ,   subtitle: ""
                ,   subtitleLabel: ""
                ,   imageURI: ""
                ,   styleClas: "none"
        };
        var newOptions = _.extend({}, defaults, options);
        this.create(newOptions);
        // TODO(Jason): we need to return a promise... somehow too..
        return this;
    };

    // Extending our widgets prototype to add basic functionality:
    _.extend(DisplayCard.prototype, {

        /**
         * Creates the basic DOM element representing our Display Card.
         * @param {Object} options,
         * @return {null}
         */
        create: function(options){
            var self = this;
            self._options = options;
            // Create the DOM element
            self._el = HTML.createSpinnerHolder();
            HTML.get("displayCard", self._options, function(domElement){
                self._el.empty();
                self._el.append(domElement);
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

        /**
         *  A quick and dirty way to reload data.
         * @param {object} data, data pertaining to how to render
         * @return {null}
         */
        reloadData: function(data){
            var self = this;
            self._data = data;
            // First we must indicate new data is being loaded:
            self._el.empty();
            self._el.append(HTML.getSpinner());
            // Actually load the new data:
            HTML.get("displayCard", self._data, function(domElement){
                self._el.empty();
                self._el.append(domElement);
            });
        },

        // Workaround for annoying last comma rule.
        sdfsd3423452349249239493234: null
    });

    // Export our widget
    Sqor.Widgets.DisplayCard = DisplayCard;
})(Sqor);
