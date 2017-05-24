(function() {
  function MomentFormatConfig() {
    this.localTimezone = 'Etc/UTC';
    this.serverTimezone = 'Etc/UTC';

    this.$get = function() {
      var config = {
        localTimezone: this.localTimezone,
        serverTimezone: this.serverTimezone
      };

      return {
        getLocalTimezone: function() {
          return config.localTimezone;
        },
        getServerTimezone: function() {
          return config.serverTimezone;
        }
      };
    };

    this.setConfig = function(config) {
      this.localTimezone = config.localTimezone ? config.localTimezone : this.localTimezone;
      this.serverTimezone = config.serverTimezone ? config.serverTimezone : this.serverTimezone;
    };
  }

  function MomentFormatFilter() {
    return function(dt, formatString, hideErrors) {
      var mom = _getMomentFromDate(dt);
      if (hideErrors && !mom)
        return '';

      return moment(mom).format(formatString);
    };
  }

  function MomentFormatServerTimestampFilter(momentFormatConfig) {
    return function(dt, formatString, hideErrors) {
      var mom = _getConvertedMomentFromDate(dt, momentFormatConfig);
      if (hideErrors && !mom)
        return '';

      return moment(mom).format(formatString);
    };
  }

  function MomentFromNowFilter() {
    return function(dt, hideErrors) {
      var mom = _getMomentFromDate(dt);
      if (hideErrors && !mom)
        return '';

      return moment(mom).fromNow();
    };
  }

  function MomentFromNowServerTimestampFilter(momentFormatConfig) {
    return function(dt, hideErrors) {
      var mom = _getConvertedMomentFromDate(dt, momentFormatConfig);
      if (hideErrors && !mom)
        return '';

      return moment(mom).fromNow();
    };
  }

  angular.module('angular-moment-format-filters', [])
    .provider('momentFormatConfig', MomentFormatConfig)
    .filter('momentFormat', MomentFormatFilter)
    .filter('momentFormatServerTimestamp', ['momentFormatConfig', MomentFormatServerTimestampFilter])
    .filter('momentFromNow', MomentFromNowFilter)
    .filter('momentFromNowServerTimestamp', ['momentFormatConfig', MomentFromNowServerTimestampFilter]);

  ////////////////////

  function _getMomentFromDate(dt) {
    var mom = moment(dt);
    if (!mom.isValid())
      return null;

    return mom;
  }

  function _getConvertedMomentFromDate(dt, momentFormatConfig) {
    // use the other method to check validity and exit early
    var mom = _getMomentFromDate(dt);
    if (!mom)
      return null;

    return moment.tz(dt, momentFormatConfig.getServerTimezone())
      .tz(momentFormatConfig.getLocalTimezone());
  }

})();
