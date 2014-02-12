
// FeedListController.js
(function(Sqor){
    // Dependencies
    var HTML = Sqor.Services.HTML;
    var $ = Sqor.$;
    var _ = Sqor._;

    /**
     * A simple module to render a list of cells.
     *
     * Usage:
     *
     *  var c = new Sqor.Modules.FeedListController();
     *  $("body").append(c.getDomElement());
     *
     * @param {object} options,
     * @return {null}
     */
    var FeedListController = function(options){
        var defaults = {};
        var self = this;
        self.create();
    };

    _.extend(FeedListController.prototype, {

        /**
         * Siple create function to setup model and view along with delegates.
         * @return {null}
         */
        create: function(){
            var self = this;
            self._model = new Sqor.Modules.FeedListModel();
            var tableViewOptions = {
                dataDelegate: self
            };

            self._modelCount = 0;
            self._model.addDelegate(self);
            self._tableView = new Sqor.Widgets.DynamicTable(tableViewOptions);
            self._footerView = new Sqor.Widgets.FeedFooter();
            self._model.addDelegate(self._tableView);

            // TODO(Jason): fix this, use actual template:
            self._el = $("<div></div");
            self._el.append(self._tableView.getDomElement());
            self._el.append(self._footerView.getDomElement());
            self._bindScroll();
            self._lastLoadedReturned = true;
            self._loadMoreDataIfNeeded();
        },

        /**
         * Helper function to return if a certain element is in the "viewport"
         * of the browser at this time
         * @param {type} elem,
         * @return {null}
         */
        _isScrolledIntoView: function(elem){
            var offscreenTop =  $(document.body).scrollTop();
            var displayAreaSize = window.innerHeight;

            var elemTop = $(elem).offset().top;

            var totalScrolled = offscreenTop + displayAreaSize;
            var isVisible =  elemTop <= totalScrolled;
            // return isVisible; /
            return isVisible;
        },

        /**
         * A delegate method to be called by the model when the feed changes.
         * @param {object} data,
         * @return {null}
         */
        dataChanged: function(data){
            var self = this;
            // Make sure we are up to date in terms of data:
            self._lastLoadedReturned = true;
            // We might just be finishing up loading our stuff...
            setTimeout(function(){
                self._loadMoreDataIfNeeded();
            }, 100); // TODO(Jason): fix this... this is done so we don't double
            // hit the loading spinner..
            //
            // NOTE: this is a function of the loader being
            // stuck while we load more since we don't append items fast
            // enough... race donition type of thing. Don't wanna dobule
            // load
        },

        /**
         * A hacky way to do infinite scroll by loading more data
         * @return {null}
         */
        _loadMoreDataIfNeeded: function(){
            // TODO(Jason): set our view to reflect state of data!
            // ---> or set it's little model... DATA DRIVEN
            var self = this;
            var documentHeight = $(document).height();
            var scrollTop = $(document).scrollTop();
            if (self._isScrolledIntoView(self._footerView.getDomElement())){
                if (self._modelCount <=  self._model.size()  &&
                    self._lastLoadedReturned) {
                        self._lastLoadedReturned = false;
                        self._tryToLoadMore();
                        self._modelCount = self._model.size();
                }
            }
        },

        /**
         * We create a binding to scroll event so that we can load more
         * items when we reach a certain point
         *
         * @return {null}
         */
        _bindScroll: function(){
            var self = this;
            self._modelCount = self._model.size();
            self._lastLoadedReturned = true ;
            $(document).scroll(function(){
                self._loadMoreDataIfNeeded();
            });
        },

        /**
         * We go to the server / model  and try to load more  items
         * worry about that.
         *
         * @return {null}
         */
        _tryToLoadMore: function(){
            var self = this;
            // TODO(Jason):  remove this timeout:
            // set on timer to emulate delay in ajax...
            self._model.loadBottomItems();
        },

        /**
         * A simple way to return the DOM element representing this controller
         * @return {object} jquery DOM element
         */
        getDomElement: function(){
            var self = this;
            return self._el;
        },

        /**********************************************************************
         *  Delegate API Methods Implemented
         *********************************************************************/

        /**
         * Simple function to return a DOM element for a given cell position.
         * @param {number} index,
         * @return {Object} jquery Object
         */
        getCellAtIndex: function(index) {
            var self = this;
            var model = self._model._items[index].doc;
            var displayCard = self._getWidgeForType(model);
            return displayCard.getDomElement();
        },

        /**
         * Returns the correct type of widget for the given model
         * @param {object} model,
         * @return {object}, widget for model
         */
        _getWidgeForType: function(model){
            // TODO(Jason): replace this with a widget per type:
            var self = this;
            var options = {
                title:""
                , subtitle: ""
                , author: ""
                , imageURI: ""
                , externalURI: ""
            };
            options.externalURI = model.link;
            var imageURI = "";
            try{
                imageURI = model.media_ig[0].url;
            } catch(e){
            }
            options.imageURI = imageURI;

            // TODO(Jason): awful, remove
            if (model.type === "twitter"){
                options.title = model.author;
                options.subtitle = model.summary;
            } else if (model.type === "instagram") {
                options.subtitle = model.content;
            } else if (model.type === "rss") {
                options.title = model.title;
                options.summary= model.summary;
            } else if (model.type === "getty_images") {
                options.title = model.title;
            } else if (model.type === "espn_api") {
                options.title = model.title;
                options.summary= model.summary;
            } else if (model.type === "sqor") {
                options.title = model.author;
                options.summary= model.content;
            } else {
                console.log(model.type);
                // TODO(Jason): implement generic widget
            }
            var displayCard  = new Sqor.Widgets.DisplayCard(options);
            return displayCard;
        },

        /**
         * Returns number of cells by calling on model:
         * @return {number} size of table
         */
        getNumberOfCells: function(){
            var self = this;
            return self._model.size();
        },

        // Workaround for annoying last comma rule.
        sdfsd3423452349249239493234: null
    });

    Sqor.Modules.FeedListController = FeedListController;
})(Sqor);
