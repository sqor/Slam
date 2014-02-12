// FeedListModel.js
(function(Sqor){
    // Dependencies
    var HTML = Sqor.Services.HTML;
    var $ = Sqor.$;
    var _ = Sqor._;

    /**
     * Initializes a simple model to represetn the state of the list module.
     * @return {null}
     */
    var  FeedListModel = function(){
        var self = this;
        self._delegates = [];
        self._offset= 0;
        self._step = 10;
        self._items = [];
    };

    _.extend(FeedListModel.prototype, {

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
         * Calls all delegates listening for dataChanges
         * @return {null}
         */
        _notifyDelegates: function(type, count, methodName){
            var self = this;
            var args = arguments;
            _.each(self._delegates, function(delegate) {
                if (_.isReal(delegate[methodName])) {
                    delegate[methodName].apply(delegate, args);
                }
            });
        },

        /**
         * Pushes items into our local array of entries
         *
         * @param {object} data,
         * @return {null}
         */
        _loadItems: function(data){
            var self = this;
            var results = data.results;
            _.each(results, function(result){
                self._items.push(result);
            });

            self._offset += self._step;
            self.appendItems(results.length);
        },

        /**
         * Make request to load data from network/server.
         * @return {null}
         */
        loadBottomItems: function(){
            var self = this;
            var requestURL= "http://feedtools-dev.sqor.com/content?q=type:instagram&offset=" +
                self._offset + "&limit=" + self._step;
            // q=*
            // q=type:instragram
            var promise =  $.get(requestURL);
            promise.done(function(data){
                self._loadItems(data);
            });
        },

        /**
         * New rows / items were added to the beginning
         * @param {type} count,
         * @return {null}
         */
        prependItems: function(count) {
            var self = this;
            self._notifyDelegates("prepend", count, "dataChanged");
        },

        /**
         * Old rows /items were loaded into memory:
         * @param {type} count,
         * @return {null}
         */
        appendItems: function(count) {
            var self = this;
            self._notifyDelegates("append", count, "dataChanged");
        },

        /**
         * Returns the size of the list / table
         * @return {number} size of list
         */
        size: function() {
            var self = this;
            return self._items.length;
        },

        // Workaround for annoying last comma rule.
        sdfsd3423452349249239493234: null
    });

    Sqor.Modules.FeedListModel = FeedListModel;
})(Sqor);

