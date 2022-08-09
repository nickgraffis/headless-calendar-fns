import type { Plugin, Day, Hour, Minute, Month, Week, Options, Year } from "./types"

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

export function getNumberOfDaysInMonth(
  month: number,
  year: number
): number {
  const lastDay = new Date(year, month + 1, 0).getDate()
  return lastDay
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
  options: Options,
  plugins?: Plugin[]
): Day<T>[] {
  const days: Day[] = []
  let daysInWeek = 7
  let startOfWeek = 0
  let inc = 1
  if (options?.daysInWeek) {
    if (typeof options.daysInWeek === 'number') {
      daysInWeek = options.daysInWeek + 1
    } else if (typeof options.daysInWeek === 'string') {
      if (options.daysInWeek === 'weekends') {
        daysInWeek = 7
        startOfWeek = 0
        inc = 6
      } else {
        daysInWeek = 6
        startOfWeek = 1
      }
    }
  }
  if (options?.startOfWeek) {
    if (options?.daysInWeek === 'weekends' || options?.daysInWeek === 'weekdays') {
      console.warn('setting startOfWeek with daysInWeek: weekends or weekdays can have wild results!')
    }

    startOfWeek = options.startOfWeek
  }
  let today = (options?.timeZone ? new Date(new Date().toLocaleString("en-US", { timeZone: options.timeZone })) : new Date())
  for (let j = startOfWeek; j < daysInWeek; j = j + inc) {
    const date = getDateCellByIndex(weekIndex, j, month, year)
    let pluginResults = {}
    plugins?.forEach(plugin => {
      if (plugin.views.includes('day')) {
        pluginResults = {
          ...plugin.fn(date, plugin.args),
          ...pluginResults
        }
      }
    })

    let day: string | number = date.getDay();
    if (options?.daysOfWeek) {
      if (Array.isArray(options.daysOfWeek)) {
        day = options.daysOfWeek[date.getDay()]
      } else if (typeof options.daysOfWeek === 'string' && ['long', 'short', 'narrow'].includes(options.daysOfWeek)) {
        day = date.toLocaleDateString('en-US', { weekday: options.daysOfWeek })
      }
    } else if (!options.daysOfWeek) day = date.getDay()
    else day = date.getDay()
    
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
      day,
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
  plugins?: Plugin[]
): Minute<T>[] {
  const minutes: Minute[] = []
  for (let i = 0; i < 60; i++) {
    const _date = new Date(date.getTime())
    _date.setHours(hour, i)
    let pluginResults = {}
    plugins?.forEach(plugin => {
      if (plugin.views.includes('minute')) {
        pluginResults = {
          ...plugin.fn(_date, plugin.args),
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
  plugins?: Plugin[]
): Hour<T>[] {
  let hours: Hour[] = []
  let startOfDay = 0
  let hoursInDay = 24

  if (options?.startOfDay) {
    startOfDay = options.startOfDay
  }

  if (options?.hoursInDay) {
    hoursInDay = startOfDay + options.hoursInDay + 1
  }

  for (let i = startOfDay; i < hoursInDay; i++) {
    let pluginResults = {}
    plugins?.forEach(plugin => {
      if (plugin.views.includes('hour')) {
        pluginResults = {
          ...plugin.fn(new Date(date.getFullYear(), date.getMonth(), date.getDate(), i), plugin.args),
          ...pluginResults
        }
      }
    })
    let _date = options?.timeZone ? new Date(new Date().toLocaleString("en-US", { timeZone: options.timeZone })) : new Date()
    let isCurrentHour = i === _date.getHours()
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
      isCurrentHour,
      ...pluginResults
    }
    hours.push(hour)
  }

  return hours as Hour<T>[]
}

export function getCurrentWeek(month: number, year: number) {
  const date = new Date()
  const day = date.getDate()
  const firstDayOfMonth = new Date(year, month, 1)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const firstDayOfWeekInMonth = day - firstDayOfWeek
  const week = Math.ceil(firstDayOfWeekInMonth / 7)
  return week
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
  plugins?: Plugin[]
): Week<T>[] {
  const weeks: Week[] = []
  const numberOfWeeks = getNumberOfWeeksInMonth(month, year)
  for (let i = 0; i < numberOfWeeks; i++) {
    let pluginResults = {}
    plugins?.forEach(plugin => {
      if (plugin.views.includes('week')) {
        pluginResults = {
          ...plugin.fn(new Date(year, month), plugin.args, i),
          ...pluginResults
        }
      }
    })
    weeks.push({
      ...(options.includeDays) && { days: getDaysInWeek(i, month, year, options, plugins) },
      week: i,
      year,
      month,
      isCurrentWeek: i === getCurrentWeek(month, year),
      ...pluginResults
    })
  }
  return weeks as Week<T>[]
}

export function getMonthsInYear<T = {}>(
  year: number,
  options: Options,
  plugins?: Plugin[]
): Month<T>[] {
  const months: Month[] = []
  for (let i = 0; i < 12; i++) {
    let pluginResults = {}
    plugins?.forEach(plugin => {
      if (plugin.views.includes('month')) {
        pluginResults = {
          ...plugin.fn(new Date(year, i), plugin.args),
          ...pluginResults
        }
      }
    })
    months.push({
      ...(options.includeWeeks) && { weeks: getWeeksInMonth(i, year, options, plugins) },
      month: i,
      year,
      isCurrentMonth: i === new Date().getMonth(),
      ...pluginResults
    })
  }
  return months as Month<T>[]
}

export function getYears<T>(
  year: number,
  options: Options,
  plugins?: Plugin[]
): Year<T> {
  let pluginResults = {}
  plugins?.forEach(plugin => {
    if (plugin.views.includes('year')) {
      pluginResults = {
        ...plugin.fn(new Date(year), plugin.args),
        ...pluginResults
      }
    }
  })

  return {
    ...(options.includeMonths) && { months: getMonthsInYear(year, options, plugins) },
    year,
    isCurrentYear: year === new Date().getFullYear(),
    ...pluginResults
  } as Year<T>
}

export function weeksInMonth(monthOrObjOrDate: number | Date | { month: number, year: number }, year?: number) {
  let _month;
  if (
    typeof monthOrObjOrDate === 'object' && 
    'year' in monthOrObjOrDate && 
    'month' in monthOrObjOrDate
  ) {
    year = monthOrObjOrDate.year
    _month = monthOrObjOrDate.month
  } else if (
    typeof monthOrObjOrDate === 'number' && year
  ) {
    _month = monthOrObjOrDate
  } else {
    _month = new Date(monthOrObjOrDate).getMonth()
    year = new Date(monthOrObjOrDate).getFullYear()
  }
  
  return getNumberOfWeeksInMonth(_month, year)
}

export function daysInMonth(monthOrObjOrDate: number | Date | { month: number, year: number }, year?: number) {
  let _month;
  if (
    typeof monthOrObjOrDate === 'object' && 
    'year' in monthOrObjOrDate && 
    'month' in monthOrObjOrDate
  ) {
    year = monthOrObjOrDate.year
    _month = monthOrObjOrDate.month
  } else if (
    typeof monthOrObjOrDate === 'number' && year
  ) {
    _month = monthOrObjOrDate
  } else {
    _month = new Date(monthOrObjOrDate).getMonth()
    year = new Date(monthOrObjOrDate).getFullYear()
  }
  
  return getNumberOfDaysInMonth(_month, year)
}