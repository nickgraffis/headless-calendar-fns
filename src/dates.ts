import type { Day, Hour, Minute, Month, Week } from "./types"

export type Options = {
  includeWeeks?: boolean
  includeDays?: boolean
  includeHours?: boolean
  includeMinutes?: boolean
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

export function getDaysInWeek(
  weekIndex: number,
  month: number,
  year: number,
  options: Options = {
    includeWeeks: true,
    includeDays: true,
    includeHours: true,
    includeMinutes: true
  }
): Day[] {
  const days = []
  for (let j = 0; j < 7; j++) {
    const date = getDateCellByIndex(weekIndex, j, month, year)
    days.push({
      ...(options?.includeHours) && { hours: getHoursinDay(date, options) },
      date: date.toISOString().split('T')[0],
      isToday: 
        date.getDate() === new Date().getDate() && 
        date.getMonth() === new Date().getMonth() && 
        date.getFullYear() === new Date().getFullYear(),
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
      day: date.getDay(),
      week: weekIndex,
      month,
      year,
    })
  }

  return days
}

export function getMinutesInHour(
  hour: number,
  date: Date,
): Minute[] {
  const minutes = []
  for (let i = 0; i < 60; i++) {
    const _date = new Date(date.getTime())
    _date.setHours(hour, i)
    minutes.push({
      unix: _date.getTime(),
      minute: i,
      hour,
      day: _date.getDate(),
      month: _date.getMonth(),
      year: _date.getFullYear(),
      isCurrentMinute: _date.getMinutes() === new Date().getMinutes(),
    })
  }
  return minutes
}

export function getHoursinDay(
  date: Date,
  options: Options = {
    includeWeeks: true,
    includeDays: true,
    includeHours: true,
    includeMinutes: true
  }
): Hour[] {
  let hours = []
  for (let i = 0; i < 24; i++) {
    let hour = {
      unix: Math.floor(
        (
          date.getTime() + (i * 60 * 60 * 1000)
        ) / 1000
      ),
      ...(options?.includeMinutes) && { minutes: getMinutesInHour(i, date) },
      hour: i,
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      isCurrentHour: date.getHours() === new Date().getHours()
    }
    hours.push(hour)
  }

  return hours
}

export function getWeeksInMonth(
  month: number, 
  year: number,
  options: Options = {
    includeWeeks: true,
    includeDays: true,
    includeHours: true,
    includeMinutes: true
  }
): Week[] {
  const weeks: Week[] = []
  const numberOfWeeks = getNumberOfWeeksInMonth(month, year)
  for (let i = 0; i < numberOfWeeks; i++) {
    weeks.push({
      ...(options.includeDays) && { days: getDaysInWeek(i, month, year, options) },
      week: i,
      year,
      month,
    })
  }
  return weeks
}

export function getMonthsInYear(
  year: number,
  options: Options = {
    includeWeeks: true,
    includeDays: true,
    includeHours: true,
    includeMinutes: true
  }
): Month[] {
  const months: Month[] = []
  for (let i = 0; i < 12; i++) {
    months.push({
      ...(options.includeWeeks) && { weeks: getWeeksInMonth(i, year, options) },
      month: i,
      year,
    })
  }
  return months
}