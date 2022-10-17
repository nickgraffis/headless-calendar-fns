import Timezone from "./timezones";

/**
 * Get the number of weeks in a given month.
 * @param monthOrObjOrDate - The month as a number, or a Date object, or an object with month and year.
 * @param year  - Optionally, the year as a number.
 * @returns - The number of weeks in the month.
 * @example
 * ```ts
 * import { weeksInMonth } from 'headless-calendar-fns'
 * weeksInMonth(0, 2021) // 5
 * weeksInMonth(new Date(2021, 0)) // 5
 * weeksInMonth({ month: 0, year: 2021 }) // 5
 * ```
 */
export function weeksInMonth(monthOrObjOrDate: number | Date | { month: number, year: number }, year?: number): number {
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
    _month = new Date((monthOrObjOrDate as Date).toUTCString()).getMonth()
    year = new Date((monthOrObjOrDate as Date).toUTCString()).getFullYear()
  }
  
  return getNumberOfWeeksInMonth(_month, year)
}

/**
 * Get the number of days in a given month.
 * @param monthOrObjOrDate - The month as a number, or a Date object, or an object with month and year.
 * @param year - Optionally, the year as a number.
 * @returns - The number of days in the month.
 * @example
 * ```ts
 * import { daysInMonth } from 'headless-calendar-fns'
 * daysInMonth(0, 2020) // 31
 * daysInMonth(new Date(2020, 0, 1)) // 31
 * daysInMonth({ month: 0, year: 2020 }) // 31
 * ```
 */
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
    _month = new Date((monthOrObjOrDate as Date).toUTCString()).getMonth()
    year = new Date((monthOrObjOrDate as Date).toUTCString()).getFullYear()
  }
  
  return getNumberOfDaysInMonth(_month, year)
}

/**
 * A stricter version of {@link weeksInMonth | weeksInMonth}
 * that returns the number of weeks in a given month and year.
 * @param month - The month as a number.
 * @param year  - The year as a number.
 * @returns - The number of weeks in the month.
 * @throws - If the month is not a number between 0 and 11.
 * @throws - If the year is not a number.
 * @example
 * ```ts
 * import { getNumberOfWeeksInMonth } from 'headless-calendar-fns'
 * getNumberOfWeeksInMonth(0, 2021) // 5
 * getNumberOfWeeksInMonth(1, 2021) // 4
 * ```
 */
export function getNumberOfWeeksInMonth(
  month: number, 
  year: number
): number {
  if (typeof month !== 'number' || month < 0 || month > 11) {
    throw new Error('Month must be a number between 0 and 11.')
  }

  if (typeof year !== 'number') {
    throw new Error('Year must be a number.')
  }

  const date = new Date (Date.UTC(year, month, 1))
  const day = date.getDay()
  const lastDay = new Date(Date.UTC(year, month + 1, 0)).getDate()
  return Math.ceil((lastDay + day) / 7)
}

/**
 * A stricter version of {@link daysInMonth | daysInMonth}
 * that returns the number of days in a given month and year.
 * @param month - The month as a number.
 * @param year - The year as a number.
 * @returns The number of days in the month.
 * @throws - If the month is not a number between 0 and 11.
 * @throws - If the year is not a number.
 * @example
 * ```ts
 * import { getNumberOfDaysInMonth } from 'headless-calendar-fns'
 * getNumberOfDaysInMonth(0, 2020) // 31
 * getNumberOfDaysInMonth(1, 2020) // 29
 * getNumberOfDaysInMonth(1, 2021) // 28
 * ```
 */
export function getNumberOfDaysInMonth(
  month: number,
  year: number
): number {
  if (typeof month !== 'number' || month < 0 || month > 11) {
    throw new Error('Month must be a number between 0 and 11.')
  }

  if (typeof year !== 'number') {
    throw new Error('Year must be a number.')
  }

  const lastDay = new Date(year, month + 1, 0).getDate()
  return lastDay
}

/**
 * Get the date based on the given week, day, month, and year.
 * @param weekIndex - The week index as a number. (0-5)
 * @param dayIndex - The day index as a number. (0-6)
 * @param month - The month as a number. (0-11)
 * @param year - The year as a number.
 * @returns - The date as a Date object.
 * @throws - If the week index is not a number between 0 and 5.
 * @throws - If the day index is not a number between 0 and 6.
 * @throws - If the month is not a number between 0 and 11.
 * @throws - If the year is not a number.
 * @example
 * ```ts
 * import { getDate } from 'headless-calendar-fns'
 * getDate(0, 0, 0, 2021) // 2021-01-04
 * getDate(0, 1, 0, 2021) // 2021-01-05
 * ```
 */
export function getDateCellByIndex(
  weekIndex: number, 
  dayIndex: number, 
  month: number, 
  year: number
): Date {
  if (typeof weekIndex !== 'number' || weekIndex < 0 || weekIndex > 5) {
    throw new Error('Week index must be a number between 0 and 5.')
  }

  if (typeof dayIndex !== 'number' || dayIndex < 0 || dayIndex > 6) {
    throw new Error('Day index must be a number between 0 and 6.')
  }

  if (typeof month !== 'number' || month < 0 || month > 11) {
    throw new Error('Month must be a number between 0 and 11.')
  }

  if (typeof year !== 'number') {
    throw new Error('Year must be a number.')
  }

  const date = new Date(Date.UTC(year, month, 1))
  const day = date.getDay()
  const firstDayIndex = day === 0 ? 6 : day - 1
  const index = weekIndex * 7 + dayIndex
  const dateIndex = index - firstDayIndex
  const dateCell = new Date(Date.UTC(year, month, dateIndex))
  return dateCell
}

/**
 * Get the current week index given a timezone and a month and year.
 * @param args
 * @param args.timezone - The timezone as a timezone string. {@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones List of tz database time zones}.
 * @param args.month - The month as a number.
 * @param args.year - The year as a number.
 * @returns - The current week index as a number.
 * @throws - If the timezone is not a timezone string.
 * @throws - If the month is not a number between 0 and 11.
 * @throws - If the year is not a number.
 * @example
 * ```ts
 * import { getCurrentWeekIndex } from 'headless-calendar-fns'
 * getCurrentWeekIndex({ timezone: 'America/New_York', month: 0, year: 2021 }) // 0
 * getCurrentWeekIndex({ timezone: 'America/New_York', month: 1, year: 2021 }) // 4
 * ```
 */
export function getCurrentWeek({
  timezone = Timezone.UTC,
  month,
  year
}: {
  timezone?: Timezone,
  month: number,
  year: number
}) {
  if (typeof timezone !== 'string') {
    throw new Error('Timezone must be a string.')
  }

  if (typeof month !== 'number' || month < 0 || month > 11) {
    throw new Error('Month must be a number between 0 and 11.')
  }

  if (typeof year !== 'number') {
    throw new Error('Year must be a number.')
  }

  const date = new Date()
  const tzDate = new Date(
    date.toLocaleString('en-US', { timeZone: timezone })
  )
  const day = tzDate.getDate()
  const firstDayOfMonth = new Date(year, month, 1)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const firstDayOfWeekInMonth = day - firstDayOfWeek
  const week = Math.ceil(firstDayOfWeekInMonth / 7)
  return week
}

function checkArgs(args: [Date, { timeZone: string, locale: string }]) {
  const [date, options] = args
  if (!(date instanceof Date)) {
    throw new Error('Date must be a Date object.')
  }

  if (typeof options !== 'object') {
    throw new Error('Options must be an object.')
  }

  if (typeof options.timeZone !== 'string') {
    throw new Error('Timezone must be a string.')
  }

  if (typeof options.locale !== 'string') {
    throw new Error('Locale must be a string.')
  }
}

const narrowWeekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
/**
 * A locale and timezone aware version of {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay Date.getDay}.
 * @param date - The date as a Date object.
 * @param options 
 * @param options.timezone - The timezone as a timezone string. {@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones List of tz database time zones}.
 * @param options.locale - The locale as a locale string. {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation Locale identification and negotiation}.
 * @returns - The day index as a number.
 * @throws - If the date is not a Date object.
 * @throws - If the timezone is not a timezone string.
 * @throws - If the locale is not a locale string.
 * @example
 * ```ts
 * import { getDay } from 'headless-calendar-fns'
 * getDay(new Date('2021-01-01'), { timezone: 'America/New_York', locale: 'en-US' }) // 0
 * getDay(new Date('2021-01-02'), { timezone: 'America/New_York', locale: 'en-US' }) // 1
 * ```
 */
export function getDay(date: Date, { timeZone, locale }: { timeZone: Timezone, locale: string }): number {
  checkArgs([date, { timeZone, locale }])

  const dateString = date.toLocaleString(locale, { timeZone, weekday: 'narrow' })
  const day = narrowWeekdays.indexOf(dateString)
  return day
}

/**
 * A locale and timezone aware version of {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth Date.getMonth}.
 * @param date - The date as a Date object.
 * @param options
 * @param options.timezone - The timezone as a timezone string. {@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones List of tz database time zones}.
 * @param options.locale - The locale as a locale string. {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation Locale identification and negotiation}.
 * @returns - The month index as a number.
 * @throws - If the date is not a Date object.
 * @throws - If the timezone is not a timezone string.
 * @throws - If the locale is not a locale string.
 * @example
 * ```ts
 * import { getMonth } from 'headless-calendar-fns'
 * getMonth(new Date('2021-01-01'), { timezone: 'America/New_York', locale: 'en-US' }) // 0
 * getMonth(new Date('2021-02-01'), { timezone: 'America/New_York', locale: 'en-US' }) // 1
 * ```
 */
export function getMonth(date: Date, { timeZone, locale }: { timeZone: Timezone, locale: string }): number {
  checkArgs([date, { timeZone, locale }])

  const dateString = date.toLocaleString(locale, { timeZone, month: 'numeric' })
  const month = parseInt(dateString) - 1
  return month
}

/**
 * A locale and timezone aware version of {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear Date.getFullYear}.
 * @param date - The date as a Date object.
 * @param options
 * @param options.timezone - The timezone as a timezone string. {@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones List of tz database time zones}.
 * @param options.locale - The locale as a locale string. {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation Locale identification and negotiation}.
 * @returns - The year as a number.
 * @throws - If the date is not a Date object.
 * @throws - If the timezone is not a timezone string.
 * @throws - If the locale is not a locale string.
 * @example
 * ```ts
 * import { getFullYear } from 'headless-calendar-fns'
 * getFullYear(new Date('2021-01-01'), { timezone: 'America/New_York', locale: 'en-US' }) // 2021
 * getFullYear(new Date('2022-01-01'), { timezone: 'America/New_York', locale: 'en-US' }) // 2022
 * ```
 */
export function getFullYear(date: Date, { timeZone, locale }: { timeZone: Timezone, locale: string }): number {
  checkArgs([date, { timeZone, locale }])

  const dateString = date.toLocaleString(locale, { timeZone, year: 'numeric' })
  const year = parseInt(dateString)
  return year
}

/**
 * A locale and timezone aware version of {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate Date.getDate}.
 * @param date - The date as a Date object.
 * @param options
 * @param options.timezone - The timezone as a timezone string. {@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones List of tz database time zones}.
 * @param options.locale - The locale as a locale string. {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation Locale identification and negotiation}.
 * @returns - The day of the month as a number.
 * @throws - If the date is not a Date object.
 * @throws - If the timezone is not a timezone string.
 * @throws - If the locale is not a locale string.
 * @example
 * ```ts
 * import { getHours } from 'headless-calendar-fns'
 * getHours(new Date('2021-01-01T04:00:00'), { timezone: 'America/New_York', locale: 'en-US' }) // 4
 * getHours(new Date('2021-01-01T05:00:00'), { timezone: 'America/New_York', locale: 'en-US' }) // 5
 * ```
 */
export function getHours(date: Date, { timeZone, locale }: { timeZone: Timezone, locale: string }): number {
  checkArgs([date, { timeZone, locale }])

  const dateString = date.toLocaleString(locale, { timeZone, hour: 'numeric' })
  const hours = parseInt(dateString)
  return hours
}

/**
 * A locale and timezone aware version of {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMinutes Date.getMinutes}.
 * @param date - The date as a Date object.
 * @param options
 * @param options.timezone - The timezone as a timezone string. {@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones List of tz database time zones}.
 * @param options.locale - The locale as a locale string. {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation Locale identification and negotiation}.
 * @returns - The minutes as a number.
 * @throws - If the date is not a Date object.
 * @throws - If the timezone is not a timezone string.
 * @throws - If the locale is not a locale string.
 * @example
 * ```ts
 * import { getMinutes } from 'headless-calendar-fns'
 * getMinutes(new Date('2021-01-01T04:00:00'), { timezone: 'America/New_York', locale: 'en-US' }) // 0
 * getMinutes(new Date('2021-01-01T04:01:00'), { timezone: 'America/New_York', locale: 'en-US' }) // 1
 * ```
 */
export function getMinutes(date: Date, { timeZone, locale }: { timeZone: Timezone, locale: string }): number {
  checkArgs([date, { timeZone, locale }])

  const dateString = date.toLocaleString(locale, { timeZone, minute: 'numeric' })
  const minutes = parseInt(dateString)
  return minutes
}

/**
 * A locale and timezone aware version of {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate Date.getDate}.
 * @param date - The date as a Date object.
 * @param options
 * @param options.timezone - The timezone as a timezone string. {@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones List of tz database time zones}.
 * @param options.locale - The locale as a locale string. {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation Locale identification and negotiation}.
 * @returns - The day of the month.
 * @throws - If the date is not a Date object.
 * @throws - If the timezone is not a timezone string.
 * @throws - If the locale is not a locale string.
 * @example
 * ```ts
 * import { getDate } from 'headless-calendar-fns'
 * getDate(new Date('2021-01-01T04:00:00'), { timezone: 'America/New_York', locale: 'en-US' }) // 1
 * getDate(new Date('2021-01-01T04:00:01'), { timezone: 'America/New_York', locale: 'en-US' }) // 1
 * ```
 */
export function getDate(date: Date, { timeZone, locale }: { timeZone: Timezone, locale: string }): number {
  checkArgs([date, { timeZone, locale }])

  const dateString = date.toLocaleString(locale, { timeZone, day: 'numeric' })
  const day = parseInt(dateString)
  return day
}