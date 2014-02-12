// SimpleCollection.js
(function(Sqor) {
    'use strict';
    // Dependencies:
    var $ = Sqor.$;
    var _ = Sqor._;
    var Messenger = Sqor.Services.Messenger;
    var Eventer = Sqor.Core.Eventer;
    var Model = Sqor.Core.Model;

    var SimpleCollection = function(options){
        var self = this;
        var defaults = {
                model: Sqor.Core.Model
            ,   path: "/"
            ,   urlParams: {}
            ,   successHandler: $.noop
            ,   delegates: []
            ,   fetchAll: false
            ,  sortOnKey: "id"
        };

        self._options = _.extend({}, defaults, options);
        self._delegates = self._options.delegates;
        self._rawData = [];
        self._sortedData = [];
        self.create();
    };

    SimpleCollection.prototype = new Eventer();

    _.extend(SimpleCollection.prototype, {
        create: function(){
            var self = this;
            self._itemsInCollection = 0;

            if (self._options.fetchAll) {
                self.fetchAll(self._options.successHandler);
            }
        },

        fetchAll: function(successHandler){
            var self = this;
            var params = self._options.urlParams;
            // TODO(Jason): fix and make recurisve
            var request = Messenger.requestRestAPI("GET", self._options.path, params);
            request.done(function(response){
                self._handleFetch(response, successHandler, params);
            });
        },

        _handleFetch: function(response, successHandler, params){
            var self = this;
            var rows = response.rows;
            self._rawData = self._rawData.concat(rows);
            self._sortedData = self._rawData.concat([]);
            successHandler(self._rawData);
            self._notifyDelegates("dataChanged");
        },

        /**
         * Calls all delegates listening for dataChanges
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

        getItem: function(index){
            var self = this;
            return self._sortedData[index];
        },

        length: function(){
            var self = this;
            return self._rawData.length;
        },

        /**
         * Adds a delegate to our list of delegates
         * @param {object} delegate,
         * @return {null}
         */
        addDelegate: function(delegate){
            var self = this;
            self._delegates.push(delegate);
        },

        /**
         * Publc  method to resort and notify delegates.
         * @param {type} key,
         * @return {Null}
         */
        sortBy: function(key, isReverse, isNumber){
            var self = this;
            self._resort(key, isReverse, isNumber);
            self._notifyDelegates("dataChanged");
        },

        _resort: function(keyToSortOn, isReverse, isNumber){
            var self = this;
            self._sortedData = _.sortBy(self._rawData, function(item){
                var value = item[keyToSortOn];
                if (isNumber){
                   value = Number(value);
                }
                return  value;
            });

            // Reverse in case we have a reverse flag.
            if (isReverse){
                self._sortedData = self._sortedData.reverse();
            }
        },

        getSorted: function(keyToSortOn, dontTriggerDataChange){
            var self = this;
            self._resort(keyToSortOn);
            if (!dontTriggerDataChange){
                self._notifyDelegates("dataChanged");
            }
            return self._sortedData;
        },

        // Workaround for annoying last comma rule.
        sdfsd3423452349249239493234: null
    });

    Sqor.Core.SimpleCollection = SimpleCollection;
})(Sqor);

