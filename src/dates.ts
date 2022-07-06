import { Plugin, Day, Hour, Minute, Month, Week, MatrixViews, Options } from "./types"

// ✅ Promise check
export function isPromise(p: any) {
  if (typeof p === 'object' && typeof p.then === 'function') {
    return true;
  }

  return false;
}

// ✅ Check if return value is promise
export function returnsPromise(f: Function) {
  if (
    f.constructor.name === 'AsyncFunction' ||
    (typeof f === 'function' && isPromise(f()))
  ) {
    //console.log('✅ Function returns promise');
    return true;
  }

  // console.log('⛔️ Function does NOT return promise');
  return false;
}


export function getNumberOfWeeksInMonth(
  month: number, 
  year: number
): number {
  const date = new Date(year, month, 1)
  const day = date.getDay()
  const lastDay = new Date(year, month + 1, 0).getDate()
  return Math.ceil((lastDay + day) / 7)
}

export function getDateCellByIndex(
  weekIndex: number, 
  dayIndex: number, 
  month: number, 
  year: number
): Date {
  const date = new Date(year, month, 1)
  const day = date.getDay()
  const firstDayIndex = day === 0 ? 6 : day - 1
  const index = weekIndex * 7 + dayIndex
  const dateIndex = index - firstDayIndex
  const dateCell = new Date(year, month, dateIndex)
  return dateCell
}

export function getDaysInWeek<T = {}>(
  weekIndex: number,
  month: number,
  year: number,
  options: Options = {
    includeWeeks: true,
    includeDays: true,
    includeHours: true,
    includeMinutes: true
  },
  plugins: Plugin[]
): Day<T>[] {
  const days = []
  let today = (options?.timeZone ? new Date(new Date().toLocaleString("en-US", { timeZone: options.timeZone })) : new Date())
  for (let j = 0; j < 7; j++) {
    const date = getDateCellByIndex(weekIndex, j, month, year)
    let pluginResults = {}
    plugins?.forEach(plugin => {
      if (plugin.views.includes(MatrixViews.day)) {
        pluginResults = {
          ...plugin.fn(date),
          ...pluginResults
        }
      }
    })
    days.push({
      ...(options?.includeHours) && { hours: getHoursinDay(date, options, plugins) },
      date: 
        options?.format ? 
          new Date(date).toLocaleString(
            options?.format?.locales || 
            'en-US', { ...options?.format }
          ) : 
          date.toISOString().split('T')[0],
      isToday: 
        date.getDate() === today.getDate() && 
        date.getMonth() === today.getMonth() && 
        date.getFullYear() === today.getFullYear(),
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
      day: (() => {
        if (options?.daysOfWeek) {
          if (Array.isArray(options.daysOfWeek)) {
            return options.daysOfWeek[date.getDay()]
          } else if (typeof options.daysOfWeek === 'string' && ['long', 'short', 'narrow'].includes(options.daysOfWeek)) {
            return date.toLocaleDateString('en-US', { weekday: options.daysOfWeek })
          }
        } else if (!options.daysOfWeek) return date.getDay()
        else return date.getDay()
      })(),
      week: weekIndex,
      month,
      year,
      ...pluginResults
    })
  }

  return days as Day<T>[]
}

export function getMinutesInHour<T = {}>(
  hour: number,
  date: Date,
  options: Options,
  plugins: Plugin[]
): Minute<T>[] {
  const minutes = []
  for (let i = 0; i < 60; i++) {
    const _date = new Date(date.getTime())
    _date.setHours(hour, i)
    let pluginResults = {}
    plugins?.forEach(plugin => {
      if (plugin.views.includes(MatrixViews.minute)) {
        pluginResults = {
          ...plugin.fn(_date),
          ...pluginResults
        }
      }
    })
    minutes.push({
      date: options?.format ? 
        new Date(_date).toLocaleString(
          options?.format?.locales || 
          'en-US', { ...options?.format }
        ) : 
        date.toISOString().split('T')[0],
      minute: i,
      hour,
      day: _date.getDate(),
      month: _date.getMonth(),
      year: _date.getFullYear(),
      isCurrentMinute: _date.getMinutes() === new Date().getMinutes(),
      ...pluginResults
    })
  }
  return minutes as Minute<T>[]
}

export function getHoursinDay<T = {}>(
  date: Date,
  options: Options = {
    includeWeeks: true,
    includeDays: true,
    includeHours: true,
    includeMinutes: true
  },
  plugins: Plugin[]
): Hour<T>[] {
  let hours = []
  for (let i = 0; i < 24; i++) {
    let pluginResults = {}
    plugins?.forEach(plugin => {
      if (plugin.views.includes(MatrixViews.hour)) {
        pluginResults = {
          ...plugin.fn(new Date(date.getFullYear(), date.getMonth(), date.getDate(), i)),
          ...pluginResults
        }
      }
    })
    let hour = {
      date: options?.format ? 
        new Date(date).toLocaleString(
          options?.format?.locales || 
          'en-US', { ...options?.format }
        ) : 
        date.toISOString().split('T')[0],
      ...(options?.includeMinutes) && { minutes: getMinutesInHour(i, date, options, plugins) },
      hour: i,
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      isCurrentHour: date.getHours() === (options?.timeZone ? new Date(new Date().toLocaleString("en-US", { timeZone: options.timeZone })) : new Date()).getHours(),
      ...pluginResults
    }
    hours.push(hour)
  }

  return hours as Hour<T>[]
}

export function getWeeksInMonth<T = {}>(
  month: number, 
  year: number,
  options: Options = {
    includeWeeks: true,
    includeDays: true,
    includeHours: true,
    includeMinutes: true
  },
  plugins: Plugin[]
): Week<T>[] {
  const weeks: Week[] = []
  const numberOfWeeks = getNumberOfWeeksInMonth(month, year)
  for (let i = 0; i < numberOfWeeks; i++) {
    let pluginResults = {}
    plugins?.forEach(plugin => {
      if (plugin.views.includes(MatrixViews.week)) {
        pluginResults = {
          ...plugin.fn(new Date(year, month), i),
          ...pluginResults
        }
      }
    })
    weeks.push({
      ...(options.includeDays) && { days: getDaysInWeek(i, month, year, options, plugins) },
      week: i,
      year,
      month,
      ...pluginResults
    })
  }
  return weeks as Week<T>[]
}

export function getMonthsInYear<T = {}>(
  year: number,
  options: Options = {
    includeWeeks: true,
    includeDays: true,
    includeHours: true,
    includeMinutes: true,
  },
  plugins: Plugin[]
): Month<T>[] {
  const months: Month[] = []
  for (let i = 0; i < 12; i++) {
    let pluginResults = {}
    plugins?.forEach(plugin => {
      if (plugin.views.includes(MatrixViews.month)) {
        pluginResults = {
          ...plugin.fn(new Date(year, i)),
          ...pluginResults
        }
      }
    })
    months.push({
      ...(options.includeWeeks) && { weeks: getWeeksInMonth(i, year, options, plugins) },
      month: i,
      year,
      ...pluginResults
    })
  }
  return months as Month<T>[]
}