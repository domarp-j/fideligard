FG.factory('dateService',

  [

  function() {

    // Set date range
    // Due to time zones, days actually show up as one day earlier than specified
    // setDate lines account for this offset
    var _startDate = new Date('2016-10-01');
    _startDate.setDate(_startDate.getDate() + 1);
    var _endDate = new Date('2016-12-31');
    _endDate.setDate(_endDate.getDate() + 1);

    // Initialize currentDate
    var _currentDate = angular.copy(_startDate);

    // Get the difference in days between _startDate and _getDate
    // Note that there are 86400000 milliseconds in a day
    var daysBetween = function(dateA, dateB) {
      var millisecsBetween = (dateB - dateA);
      return millisecsBetween / 86400000;
    }

    // Return date as string in format MM/DD/YYYY // TODO: use the date filter instead!
    var dateSlashFormat = function(date) {
      return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    }

    // Return date as string in format YYYY-MM-DD
    var dateDashFormat = function(date) {
      return date.toISOString().slice(0,10);
    }

    // Return startDate
    var getStartDate = function() {
      return _startDate;
    }

    // Return endDate
    var getEndDate = function() {
      return _endDate;
    }

    // Given dayValue from the date widget, set currentDate
    var setCurrentDate = function(dayVal) {
      dayVal = dayVal || 0; // in case dayVal is undefined
      _currentDate = angular.copy(_startDate);
      _currentDate.setDate(_startDate.getDate() + dayVal);
    }

    // Get currentDate
    var getCurrentDate = function() {
      return _currentDate;
    }

    return {
      getStartDate: getStartDate,
      getEndDate: getEndDate,
      dateSlashFormat: dateSlashFormat,
      dateDashFormat: dateDashFormat,
      daysBetween: daysBetween,
      setCurrentDate: setCurrentDate,
      getCurrentDate: getCurrentDate,
    }

  }

])
