angular-moment-format-filters
==============================

[![Build Status](https://travis-ci.org/jdforsythe/angular-moment-format-filters.svg?branch=master)](https://travis-ci.org/jdforsythe/angular-moment-format-filters)

A set of Angular display filters for use with the [Moment.js](http://momentjs.com) and [Moment Timezone](http://moment.js/timezone) libraries

## Dependencies
1. Angular (`bower install -S angular`)
2. Moment JS (`bower install -S moment`)
3. Moment Timezone (optional - for use with the timezone conversion filters - `bower install -S moment-timezone`)

## Installation
```bash
$ bower install angular-moment-format-filters
```

## Setup

Include `angular-moment-format-filters'` in your module's dependencies:

```js
angular.module('myApp', ['angular-moment-format-filters']);
```

And add the dependencies as script tags:

```html
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/moment/moment.js"></script>
<script src="bower_components/moment-timezone/builds/moment-timezone-with-data-2010-2020.js"></script>
```

## Examples

To see the examples below in action, check out the [Fiddle](https://jsfiddle.net/jdforsythe/mjq5whk5/1/)
## Filters

There are two pairs of filters.

1. `momentFormat` and `momentFormatServerTimestamp`
2. `momentFromNow` and `momentFromNowServerTimestamp`

### momentFormat Filter

The `momentFormat` filter will format a moment-able object (string, JS Date object, existing moment object, etc.) based on the [Moment format string](http://momentjs.com/docs/#/displaying/format).

Parameters to the filter are:
  - formatString (required) - [Moment format string](http://momentjs.com/docs/#/displaying/format)
  - hideErrors (optional - default false) - whether to suppress errors (returns empty string on invalid date input)


```js
$scope.date_one = '2016-01-18';
$scope.date_two = new Date(2016, 0, 18);
$scope.date_three = moment('2016-01-18');
$scope.date_four = moment(null);
```

```html
<p>{{ date_one | momentFormat:'MM/DD/YYYY' }}</p>
<p>{{ date_two | momentFormat:'DD/MM/YYYY' }}</p>
<p>{{ date_three | momentFormat:'MMMM Do, YYYY' }}</p>
<p>{{ date_four | momentFormat:'MM/DD/YYYY',false }}</p>
<p>{{ date_four | momentFormat:'MM/DD/YYYY',true }}</p>
```

```
01/18/2016
18/01/2016
January 18th, 2016
Invalid Date
[empty string]
```

### momentFromNow Filter

The `momentFromNow` filter will format a moment-able object (string, JS Date object, existing moment object, etc.) as a [human-readable time difference from now](http://momentjs.com/docs/#/displaying/fromnow).

Parameter to the filter:
  - hideErrors (optional - default false) - whether to suppress errors (returns empty string on invalid date input)

```js
$scope.date_one = new Date();
$scope.date_two = '2016-04-19 15:04:00';
$scope.date_three = moment('2015-04-19');
$scope.date_four = moment(null);
```

```html
<p>{{ date_one | momentFromNow }}</p>
<p>{{ date_two | momentFromNow }}</p>
<p>{{ date_three | momentFromNow }}</p>
<p>{{ date_four | momentFromNow }}</p>
<p>{{ date_four | momentFromNow:true }}</p>
```

```
a few seconds ago
an hour ago
a year ago
Invalid Date
[empty string]
```

### ServerTimestamp filter varieties

In many cases, when using timestamps in a database, the timestamps will be stored in UTC time (or some other base time) and the users are in different timezones.
The Moment Timezone library makes it easy to convert times across timezones.

To set the proper timezones, configure the filters:

```js
angular.module('myApp', ['angular-moment-format-filters'])
.config(function(momentFormatConfigProvider) {
  momentFormatConfigProvider.setConfig({
    localTimezone: 'America/New_York',
    serverTimezone: 'America/Los_Angeles'
  });
});
```

#### Config Options

* `localTimezone`: (string) the standard timezone string for the _end user_ (i.e. browser timezone)
  * default: `'Etc/UTC'`
* `serverTimezone`: (string) the standard timezone string for the _server_
  * default: `'Etc/UTC'`

Conversions will be made *from* `serverTimezone`, *to* `localTimezone`

#### Example

Assuming the configuration example provided above...

```js
$scope.server_timestamp_one = '2016-01-18 12:00:00';
$scope.server_timestamp_two = '2016-04-19 12:16:00';
```

```html
<p>{{ server_timestamp_one | momentFormatServerTimestamp:'MM/DD/YYYY HH:mm' }}</p>
<p>{{ server_timestamp_two | momentFromNowServerTimestamp }}</p>
```

```
01/18/2016 15:00 (converted 12:00pm Pacific to 3:00pm Eastern)
a minute ago (assuming it's 3:17pm Eastern, 12:16pm Pacific is a minute ago)
```

## Tests

A round of tests is included. To run the tests, execute:

```
gulp test
```

## Contributions

Contributions are always welcome. Please submit issues and pull requests.

## License

[MIT](LICENSE)
