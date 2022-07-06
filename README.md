# Headless Calendar Fns

An extendible, pure, function that returns a matrix of years, months, days, hours, and minuets for a given view and period of time. 

Perfect for building a calendar ui, no matter what ui library you use, even vanilla js.

## Installation

### Node
```bash
yarn add headless-calendar-fns
```

_or use npm or pnpm_

### CDN 
```html
<script src="https://unpkg.com/headless-calendar-fns@latest/dist/headless-calendar-fns.js"></script>
```

## Basic Useage

A basic view may be to create a matrix of _months_, _weeks_, and _days_.

```js
import createMatrix from 'headless-calendar-fns';

let matrix = createMatrix({
  view: 'month',
  year: 2022,
  month: 1,
})

```

This will return an object with `prev`, `next`, and `current` where current will be the current month provided (_February, 2022_ in this case). `prev` and `next` will be the previous and next months. 

Each _matrix_ (current, prev, next) depneds on the view, but in the case of the _month_ view, it will include:

* `year`: the year (_2022_ in this case)
* `month`: the month (_1_ in this case)
* `weeks`: An array of weeks views
  * `days`: An array of days views
    * `date`: the date of this day
    * `day`: the day of the week (_0_ to _6_)
    * `isToday`: whether this day is today (`true` or `false`)
    * `isWeekend`: whether this day is a weekend (`true` or `false`)
    * `week`: the week of the month (`1` to `5`)
    * `month`: the month of the year (`1` to `12`)
    * `year`: the year (`2022` in this case)
  * `week`: the week of the month (`1` to `5`)
  * `month`: the month of the year (`1` to `12`)
  * `year`: the year (`2022` in this case)

```js
let response = {
  view: 'year',
  current: {
    view: 'year',
    months: [
      {
        weeks: [ 
          {
            days: [
            {
              date: '2020-01-04',
              isToday: false,
              isWeekend: true,
              day: 6,
              week: 0,
              month: 0,
              year: 2020,
            },
            ...
          ],
          week: 0,
          year: 2020,
          month: 0,
        }
          ...
        ],
        month: 1,
        year: 2020
      },
      ...
    ]
  },
  prev: { ... },
  next: { ... }
}
```

## Include/Disinclude Views

If you want to either include some views, or disinclude them, you can pass in the following options:

* `includeWeeks`: whether to include the weeks view (`true` or `false`)
  * Default: `true`
* `includeDays`: whether to include the days view (`true` or `false`)
  * Default: `true`
* `includeHours`: whether to include the hours view (`true` or `false`)
  * Default: `false`
* `includeMinutes`: whether to include the minutes view (`true` or `false`)
  * Default: `false`

```js
import createCalendar from 'headless-calendar-fns';

let matrix = createCalendar({
  view: 'year',
  year: 2022,
  month: 1,
  includeWeeks: false,
  includeDays: false,
})

let response = {
  view: 'year',
  current: {
    view: 'year',
    months: [
      {
        month: 1,
        year: 2020
      },
      ...
    ]
  },
  prev: { ... },
  next: { ... }
}

```

## Views

When you pick a view, that is your starting point. So by choosing `year` as your view, you are going to get a matrix of a year with it's months, etc.

If you choose `month` as the view, then you will just get a month with a matrix of weeks, etc.

```ts
export enum MatrixViews {
  year = 'year',
  month = 'month',
  week = 'week',
  day = 'day',
  hour = 'hour',
  minute = 'minute'
}
```