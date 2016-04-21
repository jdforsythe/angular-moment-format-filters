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
    return function(dt, formatString) {
      return moment(dt).format(formatString);
    };
  }

  function MomentFormatServerTimestampFilter(momentFormatConfig) {
    return function(dt, formatString) {
      return moment.tz(dt, momentFormatConfig.getServerTimezone())
                   .tz(momentFormatConfig.getLocalTimezone()).format(formatString);
    };
  }

  function MomentFromNowFilter() {
    return function(dt) {
      return moment(dt).fromNow();
    };
  }

  function MomentFromNowServerTimestampFilter(momentFormatConfig) {
    return function(dt) {
      return moment.tz(dt, momentFormatConfig.getServerTimezone())
                   .tz(momentFormatConfig.getLocalTimezone()).fromNow();
    };
  }

  angular.module('angular-moment-format-filters', [])
    .provider('momentFormatConfig', MomentFormatConfig)
    .filter('momentFormat', MomentFormatFilter)
    .filter('momentFormatServerTimestamp', ['momentFormatConfig', MomentFormatServerTimestampFilter])
    .filter('momentFromNow', MomentFromNowFilter)
    .filter('momentFromNowServerTimestamp', ['momentFormatConfig', MomentFromNowServerTimestampFilter]);

})();
