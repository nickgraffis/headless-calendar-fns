# Plugins

Plugins are a way of adding data to the outputed views within the matrix. For example, you may want to add a phases of the moon to the `day` view. Or maybe an `isItDark` boolean to the `hour` or `minute` views.

## Using a Plugin

To use a plugin, pass an array of them to your options.

```js
import createCalendar from 'headless-calendar-fns';
import moonPhaseCalendarPlugin from 'headless-calendar-fns-plugin-moon-phase';

let matrix = createCalendar({
  view: 'year',
  year: 2022,
  month: 1,
  plugins: [moonPhaseCalendarPlugin]
});

```

## Writing a Plugin

A plugin is an object that contains a `name`, `view`, an optional `version`, and a `fn` that is a function that returns some data, that will be added to the specificed view.

```js
export const moonPhaseHeadlessCalendarFnsPlugin = {
  name: 'moon-phase',
  view: 'day',
  version: '1.0.0',
  fn: (date) => ({
      phase: getMoonPhase(date)
    })
}
```

Because this is being applied to the _day_ view it will be run every time a new day view is created. 

:::tip 🤪 Gotchas
When creating a plugin for the `hour` view, or the `week` view, the `fn` function will be given an extra argument. Along with the date, the `fn` function will be given the _week index_, in the week view, and the _hour_ in the hour view.
:::

## Example Plugins

Checkout these plugins:

  * 🌝 [headless-calendar-fns-plugin-moonphase](): 
    * Adds the moon phase to the _day_ view 
  * 🎉 [headless-calendar-fns-plugin-holidays](): 
    * Adds US holidays to the _day_ view, 
    * Adds an array of holidays to the _month_ view
    * Adds an array of holidays to the _week_ view
    * Adds the number of working days to the _week_ view
  * 🌃 [headless-calendar-fns-plugin-sunrise-sunset](): 
    * Adds the sunrise and sunset to the _day_ view
    * Adds the sunrise and sunset to the _hour_ view
    * Adds the sunrise and sunset to the _minute_ view

## Async Plugins

:::info Future Development
Async plugins are a really valueable idea, but are not currently implemented. Here are some thoughts.
:::

As of now, there is no option for asynchronous plugins. The goal of of asynchronous plugin would be to return the matrix first, along with an _update hook_ of somekind that could be run, and the function to return the new matrix, with the result of the asynchronous plugins. 

In a real world example, you could imagine that you had a UI with a calendar and a plugin that provided the result of some API call for office birthdays, you would want to skeleton of the calendar to appear as soon as possible, and then update the with result of the API call.

The biggest change that would make is that currently, every view runs plugins for that view. A plugin that shows holidays will run on the day view. An async plugin should _at least_ have the option of being run once for a large number of views.

Back to the office birthdays API call, we could run this plugin at the most shallow view, and then apply that data into the nested views, at say the day view. This would also be useful for plugins that are not async, but are computationally expensive.