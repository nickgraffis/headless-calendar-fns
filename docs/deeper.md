# Diving Deeper

## Timezones

Inside of the `hour`, `day`, and `minute` views you get a `isCurrentHour`, `isToday`, and `isCurrentMinute` boolean. When you pass in a `timeZone` to your function it will use that timezone when determining the current hour, day, or minute.

```js
import createCalendar from 'headless-calendar-fns';

let matrix = createCalendar({
  view: 'year',
  year: 2022,
  month: 1,
  timeZone: 'America/New_York'
});
```

## Formatting

### Date Strings

When getting the date inside the `day` view it returns an `ISOString` of the date. You can pass in a format to get the date in a different format. Formatting is based on [toLocaleDateString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString), except the `locales` argument is now an optional key-value argument. Default is `en-US`.

Options key examples:

* day: The representation of the day. 
  * Possible values are "numeric", "2-digit".
* weekday: The representation of the weekday. 
  * Possible values are "narrow", "short", "long".
* year: The representation of the year. 
  * Possible values are "numeric", "2-digit".
* month: The representation of the month. 
  * Possible values are "numeric", "2-digit", "narrow", "short", "long".
* hour:  The representation of the hour. 
  * Possible values are "numeric", "2-digit".
* minute: The representation of the minute. 
  * Possible values are "numeric", "2-digit".

```js
import createCalendar from 'headless-calendar-fns';

let matrix = createCalendar({
  view: 'year',
  year: 2022,
  month: 1,
  format: {
    locales: 'en-US',
    day: 'numeric',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric'
  }
});
```

### Day of Week

If you want to get the day of the week, instead of the index in the response, you can pass in argument `dayOfWeek` as either a `boolean`, where if `true` the result will include an English _long_ day name, and if `false` (_default_) just the index.

You can also pass in either `'long'`, `'short'`, or `'narrow'` to specify the kind of day formatting (_Monday_, _Mon_, _M_), for example.

You can also pass in an array of strings, and it will return the value of string for that day's index.

```js
import createCalendar from 'headless-calendar-fns';

let matrix = createCalendar({
  view: 'year',
  year: 2022,
  month: 1,
  // Use the french word for each day of the week
  dayOfWeek: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi'
  ]
});
```

### Start of Week & Days of Week

If you want to specify a day other than _Sunday (0)_ as the start of the week pass in the `startOfWeek` option with the index that the week should start on.

You can also choose to just display weekdays, or weekends, by passing in the `daysInWeek` argument as an array of indexs to be displayed, or just the string `'weekends'` or `'weekdays'`.

```js
import createCalendar from 'headless-calendar-fns';

let matrix = createCalendar({
  view: 'year',
  year: 2022,
  month: 1,
  startOfWeek: 1,
  daysInWeek: 'weekdays'
});
```

### Start of Day & Hours in a Day

If you want the day to start at a time other than _00:00_, you can pass in the `startOfDay` option with the time in the format `H`. You can also pass in the `hoursInDay` option to specify how many hours are in a day.

```js
import createCalendar from 'headless-calendar-fns';

let matrix = createCalendar({
  view: 'year',
  year: 2022,
  month: 1,
  startOfDay: '8',
  hoursInDay: 9
});
```

## Performance

Not sure what it is worth, but it generally takes about `8ms` to create a full calendar.

And about `4MB` of heap memory to create a full calendar.