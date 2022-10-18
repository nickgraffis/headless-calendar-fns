import Timezone from "./_timezones";
import type { Calendar, Day, Hour, Minute, Month, Options, Plugin, Week, Year } from "./types";
import { MatrixViews } from "./types";

export function createOptionsForNextView(options: Options): Options {
  switch (options.view) {
    case MatrixViews.year:
      return {
        ...options,
        view: MatrixViews.year,
        year: options.year + 1,
      };
    case MatrixViews.month:
      return {
        ...options,
        view: MatrixViews.month,
        month: options.month ? options.month + 1 : 0,
      };
    case MatrixViews.week:
      return {
        ...options,
        view: MatrixViews.week,
        week: options.week ? options.week + 1 : 0,
      };
    case MatrixViews.day:
      return {
        ...options,
        view: MatrixViews.day,
        day: options.day ? options.day + 1 : 0,
      };
    case MatrixViews.hour:
      return {
        ...options,
        view: MatrixViews.hour,
        hour: options.hour ? options.hour + 1 : 0,
      };
    case MatrixViews.minute:
      return {
        ...options,
        view: MatrixViews.minute,
        minute: options.minute ? options.minute + 1 : 0,
      };
    default:
      return options;
  }
}

export function createOptionsForPrevView(options: Options & {
  view: MatrixViews,
  year: number,
  month?: number,
  week?: number,
  day?: number,
  hour?: number,
  minute?: number,
  plugins?: Plugin[]
}): Options {
  switch (options.view) {
    case MatrixViews.year:
      return {
        ...options,
        view: MatrixViews.year,
        year: options.year - 1,
      };
    case MatrixViews.month:
      return {
        ...options,
        view: MatrixViews.month,
        month: options.month ? options.month - 1 : 0,
      };
    case MatrixViews.week:
      return {
        ...options,
        view: MatrixViews.week,
        week: options.week ? options.week - 1 : 0,
      };
    case MatrixViews.day:
      return {
        ...options,
        view: MatrixViews.day,
        day: options.day ? options.day - 1 : 0,
      };
    case MatrixViews.hour:
      return {
        ...options,
        view: MatrixViews.hour,
        hour: options.hour ? options.hour - 1 : 0,
      };
    case MatrixViews.minute:
      return {
        ...options,
        view: MatrixViews.minute,
        minute: options.minute ? options.minute - 1 : 0,
      };
    default:
      return options;
  }
}

export function createMatrixOutputForView<T extends {} = any>(
  options: Options, 
  currentCalendar: Month<T> | Week<T> | Day<T> | Hour<T> | Minute<T> | Year<T>, 
  prevCalendar?: Month<T> | Week<T> | Day<T> | Hour<T> | Minute<T> | Year<T>,
  nextCalendar?: Month<T> | Week<T> | Day<T> | Hour<T> | Minute<T> | Year<T>
): Calendar<T> {
  switch (options.view) {
    case MatrixViews.year:
      return {
        view: options.view,
        timezone: options.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone,
        current: {
          view: options.view,
          year: currentCalendar as Year<T>,
        },
        ...(prevCalendar) && { prev: {
          view: options.view,
          year: prevCalendar as Year<T>,
        }},
        ...(nextCalendar) && { next: {
          view: options.view,
          year: nextCalendar as Year<T>,
        }},
      }
    case MatrixViews.month:
      return {
        view: options.view,
        timezone: options.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone,
        current: {
          view: options.view,
          month: currentCalendar as Month<T>,
        },
        ...(prevCalendar) && { prev: {
          view: options.view,
          month: prevCalendar as Month<T>,
        }},
        ...(nextCalendar) && { next: {
          view: options.view,
          month: prevCalendar as Month<T>,
        }},
      }
    case MatrixViews.week:
      return {
        view: options.view,
        timezone: options.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone,
        current: {
          view: options.view,
          week: currentCalendar as Week<T>,
        },
        ...(prevCalendar) && { prev: {
          view: options.view,
          week: prevCalendar as Week<T>,
        }},
        ...(nextCalendar) && { next: {
          view: options.view,
          week: nextCalendar as Week<T>,
        }},
      }
    case MatrixViews.day:
      return {
        view: options.view,
        timezone: options.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone,
        current: {
          view: options.view,
          day: currentCalendar as Day<T>,
        },
        ...(prevCalendar) && { prev: {
          view: options.view,
          day: prevCalendar as Day<T>,
        }},
        ...(nextCalendar) && { next: {
          view: options.view,
          day: nextCalendar as Day<T>,
        }},
      }
    case MatrixViews.hour:
      return {
        view: options.view,
        timezone: options.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone,
        current: {
          view: options.view,
          hour: currentCalendar as Hour<T>,
        },
        ...(prevCalendar) && { prev: {
          view: options.view,
          hour: prevCalendar as Hour<T>,
        }},
        ...(nextCalendar) && { next: {
          view: options.view,
          hour: nextCalendar as Hour<T>,
        }},
      }
    case MatrixViews.minute:
      return {
        view: options.view,
        timezone: options.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone,
        current: {
          view: options.view,
          minute: currentCalendar as Minute<T>,
        },
        ...(prevCalendar) && { prev: {
          view: options.view,
          minute: prevCalendar as Minute<T>,
        }},
        ...(nextCalendar) && { next: {
          view: options.view,
          minute: nextCalendar as Minute<T>,
        }},
      }
    default:
      throw new Error("Invalid view, must be one of: year, month, week, day, hour");
  }
} 

export function checkIfInBetweenTwoViews(viewOne: MatrixViews, viewTwo?: MatrixViews) {
  const arrayOfViews = Object.values(MatrixViews); // [year, month, week, day, hour, minute]
  const indexOfViewOne = arrayOfViews.indexOf(viewOne);
  let indexOfViewTwo;

  if (viewTwo) {
    indexOfViewTwo = arrayOfViews.indexOf(viewTwo);
  } else {
    indexOfViewTwo = arrayOfViews.length - 1;
  }

  return indexOfViewOne > indexOfViewTwo;
}