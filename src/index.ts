import { getDaysInWeek, getHoursinDay, getMinutesInHour, getMonthsInYear, getWeeksInMonth, Options } from "./dates";
import { MatrixViews } from "./types";
import type { Calendar } from "./types";

export default function createMatrix(
  options: Options & {
    view: MatrixViews,
    year: number,
    month?: number,
    week?: number,
    day?: number,
    hour?: number,
  }
): Calendar {
  const { 
    view,
    year,
    month,
    week,
    day,
    hour,
  } = options

  options.includeWeeks = options.includeWeeks || true
  options.includeDays = options.includeDays || true
  options.includeHours = options.includeHours || false
  options.includeMinutes = options.includeMinutes || false

  switch(view) {
    case MatrixViews.year:
      return {
        view,
        current: {
          view,
          months: getMonthsInYear(year, options)
        },
        prev: {
          view,
          months: getMonthsInYear(year - 1, options)
        },
        next: {
          view,
          months: getMonthsInYear(year + 1, options)
        }
      }
    case MatrixViews.month:
      if (!month || !year) {
        throw new Error('month and year is required, when creating a matrix for month view')
      }
      return {
        view,
        current: {
          view,
          weeks: getWeeksInMonth(month, year, options)
        },
        prev: {
          view,
          weeks: getWeeksInMonth(month - 1, year, options)
        },
        next: {
          view,
          weeks: getWeeksInMonth(month + 1, year, options)
        }
      }
    case MatrixViews.week:
      if (!week || !month || !year) {
        throw new Error('week, month, year is required, when creating a matrix for week view')
      }
      return {
        view,
        current: {
          view,
          days: getDaysInWeek(week, month, year, options)
        },
        prev: {
          view,
          days: getDaysInWeek(week - 1, month, year, options)
        },
        next: {
          view,
          days: getDaysInWeek(week + 1, month, year, options)
        }
      }
    case MatrixViews.day:
      if (!day || !month || !year) {
        throw new Error('day, month, year is required, when creating a matrix for day view')
      }
      return {
        view,
        current: {
          view,
          hours: getHoursinDay(new Date(year, month, day), options)
        },
        prev: {
          view,
          hours: getHoursinDay(new Date(year, month, day - 1), options)
        },
        next: {
          view,
          hours: getHoursinDay(new Date(year, month, day + 1), options)
        }
      }
    case MatrixViews.hour:
      if (!hour || !day || !month || !year) {
        throw new Error('hour, day, month, year is required, when creating a matrix for hour view')
      }
      return {
        view,
        current: {
          view,
          minutes: getMinutesInHour(hour, new Date(year, month, day))
        },
        prev: {
          view,
          minutes: getMinutesInHour(hour - 1, new Date(year, month, day))
        },
        next: {
          view,
          minutes: getMinutesInHour(hour + 1, new Date(year, month, day))
        }
      }
      default:
        throw new Error('Invalid view, must be one of: year, month, week, day, hour')
    }
}
