import type { Plugin, Day, Hour, Minute, Month, Week, Options, Year } from "./types"
import { getNumberOfWeeksInMonth, getDateCellByIndex, getMonth, getFullYear, getDay, getHours, getDate, getMinutes, getWeekNumber } from "./date-utils";
import { MatrixViews } from "./types";
import Timezone from "./_timezones";
import { returnsPromise } from "./promise-utils";

export class Calendar<T extends {} = any> {
  private _options: Options
  private _plugins: Plugin[];
  private pluginLoadResponse: any = {}
  private today: Date;

  constructor(options: Options) {
    this._options = options
    this._plugins = options.plugins || []
    this.today = new Date()
  }

  get options() {
    return this._options
  }

  get plugins() {
    return this._plugins
  }

  getCalendar() {
    const preLoadPlugins = this.plugins?.filter(plugin => plugin.load)
    if (preLoadPlugins?.length) {
      const preLoadPluginsReturningAPromise = preLoadPlugins.filter(plugin => plugin.load && returnsPromise(plugin.load))
      const preLoadPluginsNotReturningAPromise = preLoadPlugins.filter(plugin => plugin.load && !returnsPromise(plugin.load))
      if (preLoadPluginsReturningAPromise.length) {
        const promises = preLoadPluginsReturningAPromise.map(plugin => plugin.load && plugin.load(this.options))
        Promise.all(promises).then((values) => {
          values.forEach((value, index) => {
            this.pluginLoadResponse[preLoadPluginsReturningAPromise[index].name] = value
          })
          preLoadPluginsNotReturningAPromise.forEach(plugin => {
            this.pluginLoadResponse[plugin.name] = plugin.load && plugin.load(this.options)
          })
          return this.getCalendarView()
        })
      } else {
        preLoadPluginsNotReturningAPromise.forEach(plugin => {
          this.pluginLoadResponse[plugin.name] = plugin.load && plugin.load(this.options)
        })
        return this.getCalendarView()
      }
    } 

    return this.getCalendarView()
  }

  getCalendarView() {
    switch(this.options?.view) {
      case MatrixViews.year:
        return this.getYearView(this.options.year)
      case MatrixViews.month:
        if (this.options.month === undefined || this.options.month === null) {
          throw new Error('Month is required for month view')
        }
        return this.getMonthView(this.options.month, this.options.year)
      case MatrixViews.week:
        if (this.options.week === undefined || this.options.week === null) {
          throw new Error('Week is required for week view')
        } else if (this.options.month === undefined || this.options.month === null) {
          throw new Error('Month is required for week view')
        }
        return this.getWeekView(this.options.week, this.options.month, this.options.year)
      case MatrixViews.day:
        if (this.options.month === undefined || this.options.month === null) {
          throw new Error('Month is required for day view')
        } else if (this.options.day === undefined || this.options.day === null) {
          throw new Error('Day is required for day view')
        }
        return this.getDayView(this.options.day, this.options.month, this.options.year)
      case MatrixViews.hour:
        if (this.options.month === undefined || this.options.month === null) {
          throw new Error('Month is required for hour view')
        } else if (this.options.hour === undefined || this.options.hour === null) {
          throw new Error('Hour is required for hour view')
        } else if (this.options.day === undefined || this.options.day === null) {
          throw new Error('Day is required for hour view')
        }
        return this.getHourView(this.options.hour, this.options.year, this.options.month, this.options.day)
      default:
        throw new Error('Invalid view, must be one of: year, month, week, day, hour')
    }
  }

  getMonth(date: Date) {
    return getMonth(
      date, 
      { 
        timeZone: this.options.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone,
        locale: this.options.format?.locales || Intl.DateTimeFormat().resolvedOptions().locale as string
      }
    )
  }

  getFullYear(date: Date) {
    return getFullYear(
      date,
      {
        timeZone: this.options.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone,
        locale: this.options.format?.locales || Intl.DateTimeFormat().resolvedOptions().locale as string
      }
    )
  } 

  getDay(date: Date) {
    return getDay(
      date,
      {
        timeZone: this.options.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone,
        locale: this.options.format?.locales || Intl.DateTimeFormat().resolvedOptions().locale as string
      }
    )
  }

  getHours(date: Date) {
    return getHours(
      date,
      {
        timeZone: this.options.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone,
        locale: this.options.format?.locales || Intl.DateTimeFormat().resolvedOptions().locale as string
      }
    )
  }

  getDate(date: Date) {
    return getDate(
      date,
      {
        timeZone: this.options.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone,
        locale: this.options.format?.locales || Intl.DateTimeFormat().resolvedOptions().locale as string
      }
    )
  }

  getMinutes(date: Date) {
    return getMinutes(
      date,
      {
        timeZone: this.options.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone,
        locale: this.options.format?.locales || Intl.DateTimeFormat().resolvedOptions().locale as string
      }
    )
  }

  isCurrentMonth(month: number, year: number) {
    return this.getMonth(this.today) === month && this.getFullYear(this.today) === year
  }

  isCurrentWeek(week: number, month: number, year: number) {
    return this.getWeekNumber(this.getFullYear(this.today), this.getMonth(this.today), this.getDate(this.today)) === week && this.getMonth(this.today) === month && this.getFullYear(this.today) === year
  }

  isToday(day: number, month: number, year: number) {
    return this.getDay(this.today) === day && this.getMonth(this.today) === month && this.getFullYear(this.today) === year
  }

  getYearView(year: number): Year {
    const months: Month<T>[] = this.getMonths(year)
    return {
      year,
      months,
      isCurrentYear: this.getFullYear(this.today) === year
    }
  }

  getMonthView(month: number, year: number): Month {
    const weeks: Week<T>[] = this.getWeeksInMonth(month, year)
    return {
      month,
      year,
      weeks,
      isCurrentMonth: this.isCurrentMonth(month, year)
    }
  }

  getDayView(day: number, month: number, year: number): Day {
    const hours = this.getHoursinDay(new Date(year, month, day))
    return {
      day,
      month,
      year,
      week: this.getWeekNumber(year, month, day),
      hours,
      isToday: this.isToday(day, month, year),
      isWeekend: this.isWeekend(year, month, day)
    }
  }

  getWeekView(week: number, month: number, year: number): Week {
    const days = this.getDaysInWeek(week, month, year)
    return {
      week,
      month,
      year,
      days,
      isCurrentWeek: this.isCurrentWeek(week, month, year)
    }
  }

  getHourView(hour: number, day: number, month: number, year: number): Hour {
    const minutes = this.getMinutesInHour(hour, new Date(year, month, day))
    return {
      hour,
      day,
      month,
      year,
      minutes,
      isToday: this.isToday(day, month, year),
      isCurrentHour: this.getHours(this.today) === hour && this.isToday(day, month, year)
    }
  }

  getMinuteView(minute: number, hour: number, day: number, month: number, year: number): Minute {
    return {
      minute,
      hour,
      day,
      month,
      year,
      isToday: this.isToday(day, month, year),
      isCurrentMinute: this.getMinutes(this.today) === minute && this.getHours(this.today) === hour && this.isToday(day, month, year)
    }
  }

  isWeekend(year: number, month: number, day: number) {
    return this.getDay(new Date(year, month, day)) === 0 || this.getDay(new Date(year, month, day)) === 6
  }

  getWeekNumber(year: number, month: number, day: number) {
    return getWeekNumber(
      new Date(year, month, day),
      {
        timeZone: this.options.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone,
        locale: this.options.format?.locales || Intl.DateTimeFormat().resolvedOptions().locale as string
      }
    )
  }

  getMonths(year: number) {
    const months: Month[] = []
    for (let i = 0; i < 12; i++) {
      let pluginResults = {}
      this.plugins?.forEach(plugin => {
        if (plugin.views.includes(MatrixViews.year)) {
          pluginResults = {
            // IMPORTANT: plugin.fn passes in the date as UTC!
            ...plugin.fn(new Date(new Date(year, i)), {
              ...plugin.args,
              ...this.pluginLoadResponse?.[plugin.name] || {}
            }),
            ...pluginResults
          }
        }
      })
      months.push({
        ...(this.options.includeWeeks) && { weeks: this.getWeeksInMonth(i, year) },
        month: i,
        year,
        isCurrentMonth: this.isCurrentMonth(i, year),
        ...pluginResults
      })
    }
    return months as Month<T>[]
  }

  getWeeksInMonth(month: number, year: number) {
    const weeks: Week[] = []
    const numberOfWeeks = getNumberOfWeeksInMonth(month, year)
    for (let i = 0; i < numberOfWeeks; i++) {
      let pluginResults = {}
      this.plugins?.forEach(plugin => {
        if (plugin.views.includes(MatrixViews.week)) {
          pluginResults = {
            // IMPORTANT: plugin.fn passes in the date as UTC!
            ...plugin.fn(new Date(year, month), {
              ...plugin.args,
              ...this.pluginLoadResponse?.[plugin.name] || {}
            }, i),
            ...pluginResults
          }
        }
      })
      weeks.push({
        ...(this.options.includeDays) && { days: this.getDaysInWeek(i, month, year) },
        week: i,
        year,
        month,
        isCurrentWeek: this.isCurrentWeek(i, month, year),
        ...pluginResults
      })
    }
    return weeks as Week<T>[]
  }

  getDaysInWeek(weekIndex: number, month: number, year: number) {
    const days: Day[] = []
    let daysInWeek = 7
    let startOfWeek = 0
    let inc = 1
    if (this.options?.daysInWeek) {
      if (typeof this.options.daysInWeek === 'number') {
        daysInWeek = this.options.daysInWeek + 1
      } else if (typeof this.options.daysInWeek === 'string') {
        if (this.options.daysInWeek === 'weekends') {
          daysInWeek = 7
          startOfWeek = 0
          inc = 6
        } else {
          daysInWeek = 6
          startOfWeek = 1
        }
      }
    }
    if (this.options?.startOfWeek) {
      if (this.options?.daysInWeek === 'weekends' || this.options?.daysInWeek === 'weekdays') {
        console.warn('setting startOfWeek with daysInWeek: weekends or weekdays can have wild results!')
      }

      startOfWeek = this.options.startOfWeek
    }
    for (let j = startOfWeek; j < daysInWeek; j = j + inc) {
      const date = getDateCellByIndex(weekIndex, j, month, year)
      let pluginResults = {}
      this.plugins?.forEach(plugin => {
        if (plugin.views.includes(MatrixViews.day)) {
          pluginResults = {
            // IMPORTANT: plugin.fn passes in the date as UTC!
            ...plugin.fn(date, {
              ...plugin.args,
              ...this.pluginLoadResponse[plugin.name]
            }),
            ...pluginResults
          }
        }
      })

      let day: string | number = this.getDay(date)
      if (this.options?.daysOfWeek) {
        if (Array.isArray(this.options.daysOfWeek)) {
          day = this.options.daysOfWeek[this.getDate(date)]
        } else if (typeof this.options.daysOfWeek === 'string' && ['long', 'short', 'narrow'].includes(this.options.daysOfWeek)) {
          day = date.toLocaleDateString(this.options.format?.locales || 'en-us', { weekday: this.options.daysOfWeek, timeZone: this.options.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone })
        }
      } else if (!this.options.daysOfWeek) day = this.getDate(date)
      else day = this.getDate(date)
      
      days.push({
        ...(this.options?.includeHours) && { hours: this.getHoursinDay(date) },
        date: new Date(date).toLocaleString(
            this.options?.format?.locales || 
            'en-US', { 
              ...this.options?.format || {},
              timeZone: this.options?.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone
            }
          ),
        isToday: this.isToday(this.getDate(date), this.getMonth(date), this.getFullYear(date)),
        isWeekend: this.getDay(date) === 0 || this.getDay(date) === 6,
        day,
        week: weekIndex,
        month,
        year,
        ...pluginResults
      })
    }

    return days as Day<T>[]
  }

  getHoursinDay(date: Date) {
    let hours: Hour[] = []
    let startOfDay = 0
    let hoursInDay = 24

    if (this.options?.startOfDay) {
      startOfDay = this.options.startOfDay
    }

    if (this.options?.hoursInDay) {
      hoursInDay = startOfDay + this.options.hoursInDay + 1
    }

    for (let i = startOfDay; i < hoursInDay; i++) {
      let pluginResults = {}
      this.plugins?.forEach(plugin => {
        if (plugin.views.includes(MatrixViews.hour)) {
          pluginResults = {
            // IMPORTANT: plugin.fn passes in the date as UTC!
            ...plugin.fn(new Date(date.getFullYear(), date.getMonth(), date.getDate(), i), {
              ...plugin.args,
              ...this.pluginLoadResponse?.[plugin.name] || {}
            }),
            ...pluginResults
          }
        }
      })
      let _date = new Date(new Date().toLocaleString(this.options?.format?.locales || 'en-us', { timeZone: this.options.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone }))
      let isCurrentHour = i === this.getHours(_date)
      let hour = {
        date: new Date(date).toLocaleString(
            this.options?.format?.locales || 
            'en-US', { 
              ...this.options?.format || {},
              timeZone: this.options?.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone
            }
          ),
        ...(this.options?.includeMinutes) && { minutes: this.getMinutesInHour(i, date) },
        hour: i,
        day: this.getDate(date),
        month: this.getMonth(date),
        year: this.getFullYear(date),
        isCurrentHour,
        ...pluginResults
      }
      hours.push(hour)
    }

    return hours as Hour<T>[]
  }

  getMinutesInHour(hour: number, date: Date) {
    const minutes: Minute[] = []
    for (let i = 0; i < 60; i++) {
      const _date = new Date(date.getTime())
      _date.setHours(hour, i)
      let pluginResults = {}
      this.plugins?.forEach(plugin => {
        if (plugin.views.includes(MatrixViews.minute)) {
          pluginResults = {
            // IMPORTANT: plugin.fn passes in the date as UTC!
            ...plugin.fn(_date, {
              ...plugin.args,
              ...this.pluginLoadResponse?.[plugin.name] || {}
            }),
            ...pluginResults
          }
        }
      })
      minutes.push({
        date: new Date(_date).toLocaleString(
            this.options?.format?.locales || 
            'en-US', { 
              ...this.options?.format || {},
              timeZone: this.options?.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone
           }
          ),
        minute: i,
        hour,
        day: this.getDate(_date),
        month: this.getMonth(_date),
        year: this.getFullYear(_date),
        isCurrentMinute: this.getMinutes(_date) === this.getMinutes(this.today),
        ...pluginResults
      })
    }
    return minutes as Minute<T>[]
  }
}