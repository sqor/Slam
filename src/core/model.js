

// Model.js
(function(Sqor) {
    // Dependencies:
    var $ = Sqor.$;
    var _ = Sqor._;
    var Messenger = Sqor.Services.Messenger;
    var Eventer = Sqor.Core.Eventer;
    // TODO(Jason): switch away from static model
    /**
     * @constructor
     * @param {type} options,
     * @return {null}
     */
    var Model = function(options){
        var self = this;
        var defaults = {
                path: "/"
            , connectionType: "REST"
            , isLocalOnly: true
            , atuosave: true
            , data: {}
        };

        self._options = _.extend({}, defaults, options);
        self.create();
    };

    // We subclass off our eventer class
    Model.prototype = new Eventer();

    _.extend(Model.prototype, {
        // TODO(Jason):
        // get("key", "defaultValue");
        // var title = model.get("title", "");

        create: function() {
            var self = this;
            // Load our data
            self._loadData(self._options.data);
        },

        save: function(newProperties){
            // TODO(Jason): implement
        },

        // TODO(Jason): overwrite subscribe to accept things like:
        //  set:PropertyName   delete:PropertyName


        /**
         * Whenever there is a set on a given property, we notify even
         * if they are the same value. We also save by default.
         * @param {type} propertyName,
         * @param {type} value,
         * @return {null}
         */
        set: function(propertyName, value /*, notifyOnlyIfDifferent*/) {
            var self = this;
            self._rawData[propertyName] =  value;
            if (!self._options.isLocalOnly) {
                self.save();
            }
            self.trigger(propertyName, {data: self._rawData, newValue: value});
        },

        /**
         * Simple function to help load our data into local varible
         * @param {type} data,
         * @param {type} shouldNotify,
         * @return {null}
         */
        _loadData: function(data, shouldNotify){
            var self = this;
            self._rawData = data;
            if (shouldNotify) {
            }
        },

        // Workaround for annoying last comma rule.
        sdfsd3423452349249239493234: null
    });

    _.extend(Model, {
    });
    Sqor.Core.Model = Model;
})(Sqor);
