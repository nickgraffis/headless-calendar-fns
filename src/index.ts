import { getDaysInWeek, getHoursinDay, getMinutesInHour, getMonthsInYear, getWeeksInMonth, getYears } from "./dates";
import { MatrixViews } from "./types";
import type { Calendar, Plugin, Options } from "./types";

export default function createMatrix<T = {}>(
  options: Options & {
    view: MatrixViews,
    year: number,
    month?: number,
    week?: number,
    day?: number,
    hour?: number,
		plugins?: Plugin[]
  }
): Calendar<T> {
  const { 
    view,
    year,
    month,
    week,
    day,
    hour,
		plugins,
  } = options

  options.includeMonths = options.includeMonths || true
  options.includeWeeks = options.includeWeeks || true
  options.includeDays = options.includeDays || true
  options.includeHours = options.includeHours || false
  options.includeMinutes = options.includeMinutes || false

  let loadedPluginData;
  if (options?.plugins?.some(plugin => plugin?.load)) {
    for (const plugin of options.plugins) {
      if (plugin.load) {
        // loadedPluginData = await plugin.load(options);
      }
    }
  }


  switch(view) {
    case 'year':
      return {
        view,
        prev: {
          view: 'year',
          year: getYears<T>(year -1, options, plugins),
        },
        current: {
          view: 'year',
          year: getYears<T>(year, options, plugins),
        },
        next: {
          view: 'year',
          year: getYears<T>(year + 1, options, plugins),
        }
      }
    case 'month':
      return {
        view,
        current: {
          view,
          months: getMonthsInYear<T>(year, options, plugins)
        },
        prev: {
          view,
          months: getMonthsInYear<T>(year - 1, options, plugins)
        },
        next: {
          view,
          months: getMonthsInYear<T>(year + 1, options, plugins)
        }
      }
    case 'week':
      if ((!month && month !== 0) || !year) {
        throw new Error('month and year is required, when creating a matrix for month view')
      }
      return {
        view,
        current: {
          view,
          weeks: getWeeksInMonth<T>(month, year, options, plugins)
        },
        prev: {
          view,
          weeks: getWeeksInMonth<T>(month - 1, year, options, plugins)
        },
        next: {
          view,
          weeks: getWeeksInMonth<T>(month + 1, year, options, plugins)
        }
      }
    case 'day':
      if (!week || !month || !year) {
        throw new Error('week, month, year is required, when creating a matrix for week view')
      }
      return {
        view,
        current: {
          view,
          days: getDaysInWeek<T>(week, month, year, options, plugins)
        },
        prev: {
          view,
          days: getDaysInWeek<T>(week - 1, month, year, options, plugins)
        },
        next: {
          view,
          days: getDaysInWeek<T>(week + 1, month, year, options, plugins)
        }
      }
    case 'hour':
      if (!day || !month || !year) {
        throw new Error('day, month, year is required, when creating a matrix for day view')
      }
      return {
        view,
        current: {
          view,
          hours: getHoursinDay<T>(new Date(year, month, day), options, plugins)
        },
        prev: {
          view,
          hours: getHoursinDay<T>(new Date(year, month, day - 1), options, plugins)
        },
        next: {
          view,
          hours: getHoursinDay<T>(new Date(year, month, day + 1), options, plugins)
        }
      }
    case 'minute':
      if (!hour || !day || !month || !year) {
        throw new Error('hour, day, month, year is required, when creating a matrix for hour view')
      }
      return {
        view,
        current: {
          view,
          minutes: getMinutesInHour<T>(hour, new Date(year, month, day), options, plugins)
        },
        prev: {
          view,
          minutes: getMinutesInHour<T>(hour - 1, new Date(year, month, day), options, plugins)
        },
        next: {
          view,
          minutes: getMinutesInHour<T>(hour + 1, new Date(year, month, day), options, plugins)
        }
      }
      default:
        throw new Error('Invalid view, must be one of: year, month, week, day, hour')
    }
}
