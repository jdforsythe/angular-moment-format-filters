(function() {
	function MomentFormatConfig() {
		this.local_timezone = 'Etc/UTC';
		this.server_timezone = 'Etc/UTC';

		this.$get = function() {
			var config = {
				local_timezone: this.local_timezone,
				server_timezone: this.server_timezone
			};

			return {
				getLocalTimezone: function() {
					return config.local_timezone;
				},
				getServerTimezone: function() {
					return config.server_timezone;
				}
			};
		};

		this.setConfig = function(config) {
			this.local_timezone = config.local_timezone ? config.local_timezone : this.local_timezone;
			this.server_timezone = config.server_timezone ? config.server_timezone : this.server_timezone;
		};
	}

	function MomentFormatFilter() {
		return function(dt, formatString) {
			return moment(dt).format(formatString);
		};
	}

	function MomentFormatServerTimestampFilter(momentFormatConfig) {
		return function(dt, formatString) {
			return moment.tz(dt, momentFormatConfig.getServerTimezone()).tz(momentFormatConfig.getLocalTimezone()).format(formatString);
		};
	}

	function MomentFromNowFilter() {
		return function(dt) {
			return moment(dt).fromNow();
		};
	}

	function MomentFromNowServerTimestampFilter(momentFormatConfig) {
		return function(dt) {
			return moment.tz(dt, momentFormatConfig.getServerTimezone()).tz(momentFormatConfig.getLocalTimezone()).fromNow();
		};
	}

	angular.module('angular-moment-format-filters', [])
				 .provider('momentFormatConfig', MomentFormatConfig)
		     .filter('momentFormat', MomentFormatFilter)
		     .filter('momentFormatServerTimestamp', ['momentFormatConfig', MomentFormatServerTimestampFilter])
		     .filter('momentFromNow', MomentFromNowFilter)
		     .filter('momentFromNowServerTimestamp', ['momentFormatConfig', MomentFromNowServerTimestampFilter]);
})();
