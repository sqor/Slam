//runner.js

/**
 * We should call this function when jquery says we have done loading .
 *
 * TODO(Jason): strictly speaking, we can do some of this stuff before
 * we are done loading..
 * TODO(Jason): consider doing this on router.onReady
 * ... then we can have router be the one to trigger on ready when it
 * has bound everything
 * @return {Null}
 */
Sqor.onReady = function(Sqor){
    var Router = Sqor.Core.Router;
    console.log("ready..");

    // Need to add routes to router.... and handlers..
    Sqor.demoRoutes(Sqor);
    //TODO(Jason): this should be done in its own class.. Scheduler?
    var Scheduler = function(urlPath){
        // For now we just delete everything on our page
        // Sqor.$("body").empty();
    };
    Router.subscribe("onUrlPathChanged", Scheduler);
    Router.bindToHashChanges();
};

// Run our app once DOM is ready
$(document).ready(function(){
    Sqor.onReady(Sqor);
});

//XXX
window.Sqor = Sqor;
