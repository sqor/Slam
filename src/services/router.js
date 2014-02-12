
//Router.js
(function(Sqor){
    var $ = Sqor.$;
    var _ = Sqor._;
    var Eventer = Sqor.Core.Eventer;
    var window = Sqor.Globals.window;
    var document = Sqor.Globals.document;

    var Router = function(){
        var self = this;
        self._routes = []; // TODO(Jason): {}
        self._routesMap = {};
        //self._bindToHashChanges();
    };

     /**
      * Router is a static class that will be available as one instance
      * (singleton) that takes care of notifying anyone that cares about events
      * that just happened.
      *
      * @constructor
      * @return {null}
      */
     Router.prototype = new Eventer();
    _.extend(Router.prototype, {

        /**
         * The router binds itself to events on changes of the url path.
         * A first time load is considered a "change".
         * @return {Null}
         */
        bindToHashChanges: function(){
            var self = this;
            // We must bind to our
            $(document).ready(function(){
                var urlPath =
                    self._cleanUpUrlPath(window.location.hash);
                self._triggerRouteForPath(urlPath);

                $(window).on("hashchange", function(){
                    // TODO: on first load?
                    var urlPath =
                        self._cleanUpUrlPath(window.location.hash);
                    self._triggerRouteForPath(urlPath);
                });
            });
        },

        /**
         * Helper method to clean up our url path, particularly removing
         * the # character.
         * @param {string} urlPath, dirty version of the path
         * @return {string}, cleaned version of the path
         */
        _cleanUpUrlPath: function(urlPath){
            var self = this;
            // WARNING: this assumes no # are allowed anywhere else on the
            // url path
            return urlPath.replace("#!", "");
        },

        /**
         * Quick and easy way to add a few routes all at once.
         * These routes will create an easy way to make subscriptions.
         *
         * Usage:
         *
         *  var routes = [
         *          { key: "someKey", pattern: "/path/one"}
         *      ,   { key: "someKeyX", pattern: "/path/X"}
         *      ,   { key: "someKeyY", pattern: "/path/Y"}
         *  ];
         *
         * Router.addRoutes(routes);
         * -------------------------
         * @param {array} routes, array of
         * @return {null}
         */
        addRoutes: function(routes){
            var self = this;
            _.each(routes, function(route){
                self.addRoute(route.key, route.pattern);
            });
        },

        /**
         * Add a single route pattern to our set of routes.
         *
         * Usage:
         *
         * router.addRoute("someKey", "somePattern");
         * -------------------------
         * @param {type} key,
         * @param {type} routePathPattern,
         * @return {Null}
         */
        addRoute: function(key, routePathPattern){
            var self = this;
            // Lowercase all:
            routePathPattern =  self._cleanUpUrlPath(routePathPattern);
            self._routes.push({
                    "key": key
                ,   "pathPattern": routePathPattern
            });
        },

        _getSubArray: function(arrs) {
            arrs = arrs.reverse();
            arrs.pop();
            return arrs;
        },

        _addRouteHelper: function(mapHolder, key, pathArray){
            var self = this;
            var currentMap = mapHolder.map;
            if (pathArray.length === 0){
                 // TODO(Jason): throw error
                throw "router ended without adding route";
            }

            // Real edge case
            var firstEntry = pathArray[0];
            var existingMap = currentMap[firstEntry];
            if(!_.isReal(existingMap)){
                currentMap[firstEntry]  = {};
                existingMap = self._routesMap[firstEntry];
            }
            if (pathArray.length === 1) {
                existingMap["!key!"] = key;
                return;
            } else {
                return self._addRouteHelper({map: existingMap}
                        , key
                        , self._getSubArray(pathArray));
            }
        },

        _getCleanPathParts: function(routePathPattern){
            var self = this;
            // We clean up our path and conver to array
            routePathPattern =  self._cleanUpUrlPath(routePathPattern);
            // TODO(Jason): create trim(str, charToTrim);
            // Removing first /
            if (routePathPattern === "/") {
                routePathPattern = routePathPattern.substr(1);
            }

            // Get our last char
            var lastChar = routePathPattern.substr(
                       routePathPattern.length  - 1
                    ,   routePathPattern.length - 1
            );

            // Removing the trailing
            if ( lastChar === "/"){
                routePathPattern = routePathPattern.substr(0,
                        routePathPattern.length -1);
            }

            var pathParts = routePathPattern.split("/");
            // Remove the first entry if it's empty
            return pathParts;
        },

        _extractKeyFromMap: function(mapHolder, pathParts, valueAndKeyMap){
            //TODO(Jason): consider backtracing and using dfs /bfs
            var map = mapHolder.map;
            //TODO(Jason): isReal for map and innerMap
            var innerMap = map[pathParts[0]];

            // We check if we didn't find an EXACT MATCH (even case)
            // TODO(Jason): lowercase everything on INPUT and OUTPUT
            if (!_.isReal(innerMap)){
                // Iterate over map and see if any is a : or *
                var matchVariable = null;
                _.each(map, function(value, key) {
                    if(key[0] === ":"){
                        matchVariable = key;
                    }
                });
                if (_.isReal(matchVariable)){
                    innerMap = map[matchVariable];
                    // Saving our little map variables
                    valueAndKeyMap[key] = pathParts[0];
                } else {
                    //matchVariable =

                }
            }
            // We should have it:
            if (pathParts.length === 1){

            }

        },
        _triggerRouteForPath2: function(urlPath) {
            var self = this;
            var pathParts = self._getCleanPathParts(routePathPattern);
            var matchInfo = {};
            var key = self._extractKeyFromMap({map: self._routesMap}
                    , pathParts
                    , matchInfo
                );

            self.trigger(key, matchInfo);
            self.trigger("onUrlPathChanged");

        },

        _addRoute: function(key, routePathPattern){
            var self = this;
            var pathParts = self._getCleanPathParts(routePathPattern);
            self._addRouteHelper({map: self._routesMap}, key, pathParts);
        },

        /**
         * Given a url path, we try to match against our set of routes and
         * triger an even when this happens.
         *
         * Ussage:
         *
         *  router._triggerRouteForPath("path/one");
         * -------------------------
         * @param {type} urlPath,
         * @return {null}
         */
        _triggerRouteForPath: function(urlPath) {
            var self = this;
            _.each(self._routes, function(route){
                // TODO(Jason): make this cleaner
                if( route.pathPattern === urlPath){
                    var matchInfo= {
                            requestedURLPath: urlPath
                        ,   matchedPattern: route.pathPattern
                    };
                    self.trigger(route.key, matchInfo);
                    self.trigger("onUrlPathChanged");
                }
            });
        },

        // TODO(Jason): onReady... notify all who depend on us
        // Workaround for annoying last comma rule.
        sdfsd3423452349249239493234: null
    });

    Sqor.Core.Router = new Router();

})(Sqor);
