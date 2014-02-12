// bootstrap.js
/**
 * Simply initializes a few key holder objects.
 * @return {Object} a shell object for our library, Sqor
 */
var initialize = function(window, document){
    var Sqor = {};
    // We define aa few primary holders
    Sqor.Core = {};
    Sqor.Models= {};
    Sqor.Streams= {};
    Sqor.Widgets = {};
    Sqor.Modules = {};
    Sqor.Services = {};
    Sqor.Settings = {};
    Sqor.TP = {};
    // TODO(Jason): FIX THIS:
    Sqor.$ = $;
    Sqor._ = _;
    Sqor.Globals = {};
    Sqor.Globals.window = window;
    Sqor.Globals.document = document;
    return Sqor;
};

// settings.js
var setupSettings = function(Sqor){
    Sqor.CONSTANTS  = {};
    Sqor.Settings.Server = "http://dev.sqor.com";
    Sqor.Settings.RestAPI = "/rest";
    Sqor.Settings.FeedAPI = "/rest/feed/api";
};

var Sqor = initialize(window, document);
setupSettings(Sqor);

