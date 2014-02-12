_.mixin({

  // Makes sure that arg is anything but null/undefined
  isReal: function(arg) {
    return !_.isNotReal(arg);
  },

  /**
   * A simple utility function to avoid having  to check if each step is
   * really defined.
   *
   *  Usually we do something like:
   *    if (b && b.m && b.m.x && b.m.x.y && b.m.x.y.z) {
   *      b.x.z("example");
   *    }
   *
   *  So the object we pass is b like this:
   *
   *  var result = _.isReachable(b, "m.x.y.z");
   *  if (_.isReal(result.value)) {
   *    result.value("example");
   *  }
   *
   *
   * @param  {Object} base, a hash
   * @param  {String} _string a string that represents what should be called
   * @return {Object}  returns an object of the form:
   *    {value: "value", failedStep: ""}
   */
  isReachable: function(base, _string) {
    var list = _string.split(".");
    var listLength = list.length;
    var returnValue = {
      value: null,
      failedStep: null
    };
    var currBase = base;
    for (var ii = 0; ii < listLength; ii++) {
      var currEntry = list[ii];
      if (_.isReal(currBase[currEntry])) {
        returnValue.value = currBase[currEntry];
      } else {
        return {
          value: null,
          failedStep: currEntry
        };
      }
      currBase = currBase[currEntry];
    }
    // Could call the function:
    return returnValue;
  },

  // Returns true if arg euqlas null/undefined
  isNotReal: function(arg) {
    return arg == null;
  },

  // Makes sure this value is a number. Shorthand.
  isNumeric: function(n) {
    return !isNaN(parseFloat(n));
  },

  // if x is defined as null, it is still considered defined
  isDefined: function(arg) {
    return !_.isUndefined(arg);
  },

  // Shorcut to not being null
  isNotNull: function(arg) {
    return !_.isNull(arg);
  }
});