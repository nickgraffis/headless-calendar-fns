# Typescript

The library is fully typed. :mechanical_arm:

## Generic Type

You can pass in a generic type if you are expecting additional data in your view responses. For example, if you are expecting a moon phase, you can pass in the following:

```ts
import createCalendar from 'headless-calendar-fns';
import moonPhaseCalendarPlugin, { MoonPhase } from 'headless-calendar-fns-plugin-moonphase';

let matrix = createCalendar<{ phase: MoonPhase }>({
  view: 'year',
  year: 2022,
  month: 1,
  plugins: [moonPhaseCalendarPlugin]
});
```

:::tip 🤔 Make a type when you make a plugin
When making a plugin, export a type with the additional data you are expecting.
:::