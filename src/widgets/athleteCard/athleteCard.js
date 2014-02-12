// athleteCard.js
(function(Sqor) {
    // Dependencies
    var HTML = Sqor.Services.HTML;
    var $ = Sqor.$;
    var _ = Sqor._;
    var WidgetBase = Sqor.Core.WidgetBase;

    /**
     * Athlete card is super simple, it is just a a way to show
     * an individual athlete inside of something like a roster view.
     *
     * @constructor
     * @param {type} options,
     * @return {Null}
     */
    var AthleteCard = function(options){
        var self = this;
        self._templateName = "athleteCard";
        var defaults = {
                "athleteNumber": "0"
            ,   "athleteFirstName": "Sample "
            ,   "athleteLastName": "Name"
            ,   "athletePosition": "Sample Position"
            ,   "clickHandler": $.noop
            ,   "mouseoverHandler": $.noop
            ,   "mouseoutHandler": $.noop
            ,   "mouseoverClass": "SQOR_athleteCard_mouseover"
        };
        self.create(options, defaults);
    };

    /** We ineherit from WidgetBase. **/
    AthleteCard.prototype = new WidgetBase();

    _.extend(AthleteCard.prototype, {
    });

    // Export our widget
    Sqor.Widgets.AthleteCard = AthleteCard;
})(Sqor);
