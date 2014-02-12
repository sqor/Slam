//feedFooter.js
(function(Sqor) {
    // Dependencies
    var HTML = Sqor.Services.HTML;
    var $ = Sqor.$;
    var _ = Sqor._;

    /**
     * This widget will reflect the state of the feed list. Similar to how
     * Facebook and a few big sites do it.
     *
     ***************************
     *  Example: A very basic spinner iamge
     ***************************
     * TODO(Jason):
     *  For now it's just a spinner image, but it should be able to
     *  rerender itself based on a delegate
     *
     * +-----------------------------+
     * |                             |
     * |     Spinner Image           |
     * |                             |
     * +-----------------------------+
     *
     ***************************
     *
     * @param {type} options,
     * @return {null}
     */
    var FeedFooter = function(options){
        var self = this;
        var defaults = {
                templateValues: {}
            ,   renderedCallback: $.noop
        };
        self._delegates = [];
        self._options = _.extend({}, defaults, options);
        self.create(self._options);
    };

    _.extend(FeedFooter.prototype, {
        // TODO(Jason): MAKE ALL WIDGETS inherit from BASEWIDGET .. .and remove this
        // code????
        create: function(){
            var self = this;
            // Setup our  holder element:
            self._el = HTML.createSpinnerHolder();
            self._el.empty();
            self._el.append(HTML.getSpinner());
            HTML.get("feedFooterxx", self._options.templateValues,
            function(domElement){
                self._el.empty();
                self._el.append(domElement);
                self._render();
                self._options.renderedCallback(self._el, domElement);
            });
        },

        /**
         * Renders our widget for the first time.
         * @return {null}
         */
        _render: function(){
        },

        /**
         * Returns the jQuery dom element representing our widget
         * @return {object}, jQuery object
         */
        getDomElement: function(){
            var self = this;
            return self._el;
        },

        // Workaround for annoying last comma rule.
        sdfsd3423452349249239493234: null
    });

    Sqor.Widgets.FeedFooter = FeedFooter;
})(Sqor);
