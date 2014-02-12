(function(Sqor){
    // Dependencies:
    var $ = Sqor.$;
    var _ = Sqor._;
    var Messenger =  Sqor.Services.Messenger;

    /**
     * A static logging class that will hit our REST loggin endpoint .
     *
     * Usage
     * ----------------------
     *  var o = {"eventName": "testEvent", action: "loadedSimpleGrid"};
     *  Sqor.Services.Logger.log(o);t
     * ----------------------
     *
     * @constructor
     * @param {type} options,
     * @return {Null}
     */
    var Logger = function(options){
        var self = this;
        var defaults = {
            loggingEndpoint:  "/rest/log/"
        };

        self._options = _.extend({}, defaults, options);
    };

    _.extend(Logger.prototype, {
        // Workaround for annoying last comma rule.
        log: function(eventName, options){
            var self  = this;
            // TODO(Jason): stringify options??
            //  we need to flatten this options object
            Messenger.request("POST"
                , self._options.loggingEndpoint
                , options);
        },
        sdfsd3423452349249239493234: null
    });

    Sqor.Services.Logger = new Logger();
})(Sqor);
