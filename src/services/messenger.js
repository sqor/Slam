//Messenger.js
(function(Sqor){
    // Dependencies:
    var $ = Sqor.$;
    var _ = Sqor._;

    /**
     * Messenger class is a simple wrapper around simple networking calls.
     *
     * Usage:
     *  var data = {"id": "383"};
     *  var p = Sqor.Services.Messenger.request("get", "feeds",  data);
     *
     * @param {type} options,
     * @return {null}
     */
    var Messenger = function(options){
        var self = this;
        var defaults = {
                server: Sqor.Settings.Server
            ,   restAPI: Sqor.Settings.RestAPI // "/rest/api"
            ,   feedAPI: Sqor.Settings.FeedAPI
        };

        self._options = _.extend({}, defaults, options);
    };

    _.extend(Messenger.prototype, {
        /**
         * Converts a data object into a string of the following form:
         *
         *      key=Value&key2=Value2
         *
         * @param {object} data,
         * @return {string}
         */
        _serializeGetParams: function(data){
            var string = "";
            // Make into simple string
            _.each(data, function(value, key){
                string+= key + "=" + value + "&";
            });
            // Remove extra &, just to be clean
            string = string.substr(0, string.length-1);
            return encodeURI(string);
        },

        /**
         * Send request to REST API.
         * @param {string} type, GET, POST, PUT DELETE
         * @param {type} path,
         * @param {type} data,
         * @return {null}
         */
        requestRestAPI: function(type, path, data){
            var self = this;
            path = Sqor.Settings.RestAPI + path;
            return self.request(type, path, data);
        },

        /**
         * A wrapper around get / post /put /delete ajaxy calls.
         *
         * @param {string} type, GET, POST, PUT DELETE
         * @param {string} path, api path
         * @param {object} data, map of params
         * @return {object}, jquery promise
         */
        request: function(type, path, data){
            var self = this;
           var url = self._options.server + path;
           var handle = {};
           if (type === "GET") {
                var getParams = self._serializeGetParams(data);
                var urlWithGetParams = url + "?" +  getParams;
                handle = $.get(urlWithGetParams);
           } else {
               handle = $.ajax({
                   type: type
                ,    url: url
                ,   data: data
               });
           }
           return handle;
        },

        // Workaround for annoying last comma rule.
        sdfsd3423452349249239493234: null
    });
    Sqor.Services.Messenger = new Messenger();
})(Sqor);
