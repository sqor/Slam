// Collection.js
(function(Sqor) {
    // Dependencies:
    var $ = Sqor.$;
    var _ = Sqor._;

    /*
     * create -> POST
     * read -> GET
     * update -> PUT
     * delete -> DELETE
     */

    /**
     *
     * @constructor
     * @param {type} options,
     * @return {null}
     */
    var Collection = function(options){
        var self = this;
        var defaults = {
                model: null
            ,   mode: "probe"
            ,   appendHandler: $.noop
            ,   prependHandler: $.noop
            ,   insertHandler: $.noop
            ,   allChanges: $.noop
            ,   firstLoad: $.noop
            ,   iterSize: 25
        };
        newOptions = _.extend({}, defaults, options);
        self._options = newOptions;
        self.create();
    };

    Collection.prototype = new Sqor.Core.Eventer();
    _.extend(Collection.prototype, {
        create: function(){
            self._models = [];
            self._rawList = [];
            self._originalCount= false;
            self._tailFetches= 0;
            self._noneTailFetches= 0;
            self._headFetches= 0;
            self._iterPosition = 0;
        },

        // TODO(Jason): implement iterator
        next: function(){
            var self = this;
            if ( self._models.length > self._originalCount ) {
            }
            return [];
        },

        // Workaround for annoying last comma rule.
        sdfsd3423452349249239493234: null
    });

})(Sqor);
