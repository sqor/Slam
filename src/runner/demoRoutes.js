
// demoRoutes.js
Sqor.demoRoutes = function(Sqor){
    var Router = Sqor.Core.Router;
    var $ = Sqor.$;
    // Subscribe to a few routes to see what we can do

    // TODO(Jason): each module should subscribe itself to these

    /**
     * Quickwa to call our experimental smart dynamic table
     * @return {null}
     */
    var runComplexTable  = function() {
        var dataDelegate = function(count) {
            var self = this;
            this._count = count;
        };

        dataDelegate.prototype.cellCount = function() {
            var self = this;
            return self._count;
        };

        /**
         * A simple dummy delegate method used to test our table.
         * @param {type} index,
         * @return {null}
         */
        dataDelegate.prototype.cellAtIndex = function(index){
            return $("<div><h2>" + index + "</h2></div>");
        };
        Sqor.Widgets.SmartTable.test(50);
    };

    /**
     * Helper function to load our dynamic table module.
     * It basically auto loads more  models to do infinite scroll
     * @return {null}
     */
    var runSimpleDynamicTableModule =  function() {
        var c = new Sqor.Modules.FeedListController();
        $("body").append(c.getDomElement());
        //append to Model
        // c._model.appendItems(10);
        // c._model.prepend(10);
        window._c = c;
    };

    var runSimpleGrid = function(count) {

        var dataDelegate = {
            getNumberOfCells: function() {
                return count;
            },

            getCellAtIndex:  function(index){
                return $("<span class='SQOR_fakeCell'>" + index + "</span>");
            }
        };

        /**
         * A simple dummy delegate method used to test our table.
         * @param {type} index,
         * @return {null}
         */
        var options = {
            dataDelegate: dataDelegate
        };
        var grid = new Sqor.Widgets.SimpleGrid(options);
        $("body").append(grid.getDomElement());
    };

    var runDataGrid = function(teamId, clickHandler,  showTeams){
        var playerModelOptions = {
                    path: "/sports/players"
                ,   fetchAll: true
                ,   urlParams: {
                        team_id: teamId //32043
                    ,   limit: 30000
                }
        };
        if (showTeams) {
            playerModelOptions = {};
         }

        var c = new Sqor.Modules.AthleteRosterControler({modelOptions: playerModelOptions, clickHandler: clickHandler});
        $("body").append(c.getDomElement());
        //append to Model
        // c._model.appendItems(10);
        // c._model.prepend(10);
        window._c = c;
        return c;
    };

    // Now we bind to our router...
    Router.addRoutes([
                { "key": "runDataGrid", "pattern": "#!/runDataGrid"}
            ,   { "key": "runSimpleDynamicTableModule", "pattern": "#!/runSimpleDynamicTableModule"}
            ,   { "key": "runComplexTable", "pattern": "#!/runComplexTable"}
    ]);

    Router.subscribe("runDataGrid", function(){
        console.log("runDataGrid");
        Sqor.$("body").empty();
        runDataGrid(32048 );
    });
    Router.subscribe("runComplexTable", function(){
        console.log("runComplexTable");
        Sqor.$("body").empty();
        runComplexTable();
    });

    Router.subscribe("runSimpleDynamicTableModule", function(){
        console.log("runSimpleDynamicTableModule");
        Sqor.$("body").empty();
        runSimpleDynamicTableModule();
    });


    // XXX:
    Sqor.runDataGrid = runDataGrid;
};
