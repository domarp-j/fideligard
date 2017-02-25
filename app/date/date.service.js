FG.factory('dateService',

  [

  function() {

    // Note - other services depend on this service
    // It should always be loaded first in index.html

    // Set date object
    var _date = {
      start: new Date('2016-10-01'),
      end: new Date('2016-12-31'),
      current: new Date('2016-10-01'),
      changeTracker: '2016-10-01'
    }

    // Due to time zones, days actually show up as one day earlier than specified
    // This code accounts for this offset
    var _fixDateOffset = function() {
      _date.start.setDate(_date.start.getDate() + 1);
      _date.end.setDate(_date.end.getDate() + 1);
    }
    _fixDateOffset();

    // Given date object, return date as string in format YYYY-MM-DD
    var toString = function(date) {
      return date.toISOString().slice(0,10);
    }

    // Get the date from (daysBefore) days ago
    var getEarlierDate = function(date, daysBefore) {
      var earlierDate = angular.copy(date);
      earlierDate.setDate(earlierDate.getDate() - daysBefore);
      return earlierDate;
    }

    // Get a collection of dates as an array
    // Each date is in format YYYY-MM-D
    var _populateDateCollection = function() {
      var dateCollection = [];
      var begin = angular.copy(_date.start);
      var end = getEarlierDate(angular.copy(_date.end), -1); // TODO: cheap fix
      for (var d = begin; d <= end; d.setDate(d.getDate() + 1)) {
        dateCollection.push(toString(getEarlierDate(d,1)));
      }
      return dateCollection;
    }
    var _dateCollection = _populateDateCollection();

    // Get date object when needed
    var getDate = function() {
      return _date;
    }

    // Get the difference in days between _startDate and _getDate
    // Note that there are 86400000 milliseconds in a day
    var daysBetween = function(dateA, dateB) {
      var millisecsBetween = (dateB - dateA);
      return millisecsBetween / 86400000;
    }

    // Given dayValue from the date widget, set currentDate
    var setCurrentDate = function(dayIndex) {
      dayIndex = dayIndex || 0; // in case dayIndex is undefined
      var newDate = new Date(Date.parse(_dateCollection[dayIndex]));
      // Don't overwrite _date.current! Assign new values!
      // Otherwise, it will be servered from the $digest loop
      _date.current.setFullYear(newDate.getFullYear());
      _date.current.setMonth(newDate.getMonth());
      _date.current.setDate(newDate.getDate() + 1); // TODO: cheap fix
      _date.changeTracker = _dateCollection[dayIndex];
    }

    // Check if a date is between startDate and endDate
    var checkDate = function(date) {
      return date >= _date.start && date <= _date.end;
    }

    return {
      getDate: getDate,
      toString: toString,
      daysBetween: daysBetween,
      setCurrentDate: setCurrentDate,
      getEarlierDate: getEarlierDate,
      checkDate: checkDate
    }

  }

])
