describe('moment format filters', function() {

  var $filter;

  beforeEach(function() {
    module('angular-moment-format-filters');
  });

  it('should configure properly', function() {
    module(function(momentFormatConfigProvider) {
      momentFormatConfigProvider.setConfig({
        local_timezone: 'America/New_York',
        server_timezone: 'America/Los_Angeles'
      });
    });

    inject(function(momentFormatConfig) {
      expect(momentFormatConfig.getLocalTimezone()).toEqual('America/New_York');
      expect(momentFormatConfig.getServerTimezone()).toEqual('America/Los_Angeles');
    });
  });
  


  describe('test filter output', function() {

    beforeEach(function() {
      module(function(momentFormatConfigProvider) {
        momentFormatConfigProvider.setConfig({
          local_timezone: 'America/New_York',
          server_timezone: 'America/Los_Angeles'
        });
      });

      inject(function(_$filter_) {
        $filter = _$filter_;
      });
    });


    it('should format date properly', function() {
      var dt = '2016-01-18 12:00:00',
          result = $filter('momentFormat')(dt, 'MM/DD/YYYY');

      expect(result).toEqual('01/18/2016');
    });

    it('should format timezone converted date properly', function() {
      var dt = '2016-01-18 12:00:00',
          result = $filter('momentFormatServerTimestamp')(dt, 'MM/DD/YYYY HH:mm');
      expect(result).toEqual('01/18/2016 15:00');
    });

    it('should format date from now properly', function() {
      var dt = '2016-01-18 12:00:00',
          expected = moment(dt).fromNow(),
          result = $filter('momentFromNow')(dt);

      expect(result).toEqual(expected);
    });

    it('should format timezone converted date from now properly', function() {
      var dt = '2016-01-18 12:00:00',
          expected = moment.tz(dt, 'America/Los_Angeles').tz('America/New_York').fromNow(),
          result = $filter('momentFromNowServerTimestamp')(dt);

      expect(result).toEqual(expected);
    });

  });

});