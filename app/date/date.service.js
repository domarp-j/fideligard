FG.factory('dateService',

  [

  function() {

    // Set date object
    var _date = {
      startDate: new Date('2016-10-01'),
      endDate: new Date('2016-12-31'),
      currentDate: new Date('2016-10-01')
    }

    // Due to time zones, days actually show up as one day earlier than specified
    // This code accounts for this offset
    _date.startDate.setDate(_date.startDate.getDate() + 1);
    _date.endDate.setDate(_date.endDate.getDate() + 1);

    // Get date object when needed
    var getDate = function() {
      return _date;
    }

    // Get the date from (daysBefore) days ago
    var getEarlierDate = function(date, daysBefore) {
      var earlierDate = angular.copy(date);
      earlierDate.setDate(earlierDate.getDate() - daysBefore);
      return earlierDate;
    }

    // Get the difference in days between _startDate and _getDate
    // Note that there are 86400000 milliseconds in a day
    var daysBetween = function(dateA, dateB) {
      var millisecsBetween = (dateB - dateA);
      return millisecsBetween / 86400000;
    }

    // Return date as string in format YYYY-MM-DD
    var dateDashFormat = function(date) {
      return date.toISOString().slice(0,10);
    }

    // Given dayValue from the date widget, set currentDate
    var setCurrentDate = function(dayVal) {
      dayVal = dayVal || 0; // in case dayVal is undefined
      _date.currentDate = angular.copy(_date.startDate);
      _date.currentDate.setDate(_date.currentDate.getDate() + dayVal);
    }

    return {
      getDate: getDate,
      dateDashFormat: dateDashFormat,
      daysBetween: daysBetween,
      setCurrentDate: setCurrentDate,
      getEarlierDate: getEarlierDate
    }

  }

])
