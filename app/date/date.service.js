FG.factory('dateService',

  [

  function() {

    // Set date range as Date objects
    // Due to time zones, days actually show up as one day earlier than specified
    // setDate lines account for this offset
    var _startDate = new Date('2016-06-01');
    _startDate.setDate(_startDate.getDate() + 1);
    var _endDate = new Date('2016-12-31');
    _endDate.setDate(_endDate.getDate() + 1);

    // Initialize currentDate
    var _currentDate;

    // Get the difference in days between _startDate and _getDate
    // Note that there are 86400000 milliseconds in a day
    var daysBetween = function() {
      var millisecsBetween = (_endDate - _startDate);
      return millisecsBetween / 86400000;
    }

    // Return date as string in format 3/17/1992
    var cleanDate = function(date) {
      return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    }

    // Return startDate
    var getStartDate = function() {
      return _startDate;
    }

    // Return endDate
    var getEndDate = function() {
      return _endDate;
    }

    // Given dayValue from the date widget, determine the current date
    // Return new date and reset currentDate
    var setCurrentDate = function(dayVal) {
      dayVal = dayVal || 0; // in case dayVal is undefined
      var tempDate = angular.copy(_startDate);
      tempDate.setDate(_startDate.getDate() + dayVal);
      _currentDate = tempDate;
      return tempDate;
    }

    // Get currentDate
    var getCurrentDate = function() {
      return _currentDate;
    }

    return {
      getStartDate: getStartDate,
      getEndDate: getEndDate,
      cleanDate: cleanDate,
      daysBetween: daysBetween,
      setCurrentDate: setCurrentDate,
      getCurrentDate: getCurrentDate
    }

  }

])
