// delegatorBase.js
(function(Sqor){
    // Dependencies
    var $ = Sqor.$;
    var _ = Sqor._;

    /**
     * A simple base class to implement simple functions for the delegate
     * pattern.
     *
     * Usage:
     * ------------------
     *
     *  var b = new Sqor.Core.Debugger();
     *  var d = {
     *      dataChanged: function(diff){
     *          console.log("do something here");
     *      }
     *  };
     *
     *  var d2 = {
     *      dataChanged: function(diff){
     *          console.log("do something else here: d2");
     *      }
     *  };
     *  b.addDelegate(d);
     *  b.addDelegate(d2);
     *
     *  // Some more stuff happens here, eventually we call  a delegate:
     *  b._notifyDelegates("dataChanged", {"diff": "some diff" });
     *
     * ------------------
     *
     * @constructor
     * @return {Null}
     */
    var DelegatorBase = function(){
        var self = this;
        self._delegates = [];
    };
    _.extend(DelegatorBase.prototype, {
        /**
         * Adds a delegate to our list of delegates
         * @param {object} delegate, a simple object that implements a few
         *   delegate methods.
         * @return {null}
         */
        addDelegate: function(delegate){
            var self = this;
            self._delegates.push(delegate);
        },

        /**
         * Calls all delegates listening for a given method
         * @return {null}
         */
        _notifyDelegates: function(methodName, _arguments){
            var self = this;
            var args = _arguments;
            _.each(self._delegates, function(delegate) {
                if (_.isReal(delegate[methodName])) {
                    delegate[methodName].apply(delegate, args);
                }
            });
        },

        // Workaround for annoying last comma rule.
        sdfsd3423452349249239493234: null
    });

    // Exporting Class
    Sqor.Core.DelegatorBase = DelegatorBase;
})(Sqor);
