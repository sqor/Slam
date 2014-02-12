// AthleteList
(function(Sqor){
    var SmartTable = function(){
    };

    SmartTable.test = function(count, dataDelegate) {
        var addListener = function(elements) {
            var elementsUp = 0;
            var rearrangeElements= function(elementsArray, elementsUp) {
                    var displayAreaHeight = window.innerHeight;
                    var middleElement = elementsArray[Math.floor(elementsArray.length *  1/3)];
                    middleElementTop = middleElement.offset().top -
                        $(window).scrollTop();
                    var middleElementRealTop = (middleElementTop + middleElement.height() );
                    console.log('middleElementRealTop', middleElementRealTop);
                    console.log('displayAreaHeight/2', displayAreaHeight/2);
                    // TODO(Jason): This needs to be based on diff of scroll
                    // from last scroll ... and not on position of elements..
                    //  so if you scroll up a little.. you move some elements
                    //  if you scroll up a ton.. you rredraw
                    if ( middleElementRealTop  <= displayAreaHeight * 1/8) {
                        // Now we move one of our elements from the head to the
                        // tail
                        var head = elementsArray[0];
                        elementsArray = elementsArray.splice(1, elementsArray.length-1);
                        elementsArray.push(head);
                        elementsUp++;
                        console.log('shift..');
                    }
                    if (middleElementRealTop >= displayAreaHeight  * 7/8) {
                        var tail = elementsArray[elementsArray.length -1];
                        elementsArray = elementsArray.splice(0, elementsArray.length-1);
                        elementsArray.unshift(tail);
                        elementsUp--;
                        console.log('shift down..');
                    }
                return [elementsArray, elementsUp];
            };

            var domElements = elements;
            var lastScroll = $(document).scrollTop();
            $(document).scroll(function() {
                var ii = 0;
                _.each(domElements, function(domElement){
                    var top = domElement.offset().top;
                    var scrollFromTop = $(document).scrollTop();
                    var diffScrolled = lastScroll - scrollFromTop;
                    var elementHeight = domElement.height();
                    var newTop = (ii+elementsUp)*elementHeight - scrollFromTop;
                    domElement.css("top", newTop + "px");
                    lastScroll = scrollFromTop;
                    ii++;
                });

                var results = rearrangeElements(domElements, elementsUp);
                console.log('results', results[0]);
                console.log('eleementsUp', results[1]);
                domElements = results[0];
                elementsUp = results[1];
            });
        };
        var self = this;
        var parentEl = $("body");
        // First we add a fake super large element:
        var hugeEl = $("<div></div>");
        parentEl.append(hugeEl);
        hugeEl.css("height", 100 * 600 + "px");
        // Create a bunch of DOM
        var domElements = [];
        for(var ii = 0; ii < count; ii++) {
            var newEl = $("<div class='fixed'>" +
                          ii + "<span class='container'></span></div>");
            parentEl.append(newEl);
            domElements.push(newEl);
            var height = newEl.height();
            // TODO(Jason): start this at - 1/3 hidden away
            newEl.css("top", height * ii + "px");
        }
        addListener(domElements);
    };

    _.extend(SmartTable.prototype, {
        test: function(count){
        }
    });

    Sqor.Widgets.SmartTable = SmartTable;
})(Sqor);

