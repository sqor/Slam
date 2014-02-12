// HTML.js
(function(Sqor) {
    // Dependencies:
    var $ = Sqor.$;
    var _ = Sqor._;

    // Creating our HTML Service to process tempaltes
    /**
     * A static object that holds a few key functions to fetch our templates.
     * Internally using underscore templating engine. This service takes
     * care of fetching everything from the server and provides a simple
     * interface.
     *
     *  Usage:
     *   var onRender = function(domElement) {
     *      // NOTE: domElement is actually a jquery object
     *      domElement.find(".someClass");
     *   }
     *   HTML.get('exampleTempalte', {'fieldOne': 'fieldValue'}, onRender);
     *
     */
    var HTML = {};
    HTML._cached = {};
    HTML._randomToken = ("" + Math.random()).replace(".", "");

    /**
     * Serves our template given  a template string
     * @param {string} templateString,
     * @param {object} options,
     * @param {function} callback,
     * @return {Null}
     */
    HTML._serveTemplate = function(templateString, options, callback) {
        var compiledTemplate = _.template(templateString)(options);
        var domElement =  $(compiledTemplate);
        callback(domElement);
    };

    /**
     * Returns a jQuery dom element for the template with options applied
     * to the corresponding fields in the template.
     *
     * @param {string} templateName, name of template to fetch
     * @param {object} options, fields to substitute inside template
     * @param {function} callback, handler for when DOM element is ready
     * @return {null}
     */
    HTML.get = function(templateName,  options, callback){
        // We want to prevent multiple requests for the same template:
        var cachedTemplate =  HTML._cached[templateName];
        if (_.isReal(cachedTemplate)) {
            HTML._serveTemplate(cachedTemplate, options, callback);
        } else {
            // TODO(Jason): maybe still fetch to refresh?
            var urlString = "/html/" +  templateName +
                ".html?randomToken=" + HTML._randomToken;
            $.get(urlString , function(htmlString) {
                // We cache the template:
                HTML._cached[templateName] = htmlString;
                HTML._serveTemplate(htmlString, options, callback);
            });
        }
    };

    /**
     * Returns a holder object with a spinner inside
     * @return {Object}, DOM holder
     */
    HTML.createSpinnerHolder = function(){
        var domElement = $("<span></span>");
        domElement.append(HTML.getSpinner());
        return domElement;
    };

    /**
     * A very simple spinner to indicate there is loading goign on.
     * @return {Object} DOM element
     */
    HTML.getSpinner = function() {
        var domElement  = $("<span> <img src='images/spinner.gif'/></span>");
        return domElement;
    };

    Sqor.Services.HTML = HTML;
})(Sqor);
