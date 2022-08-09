import Timezone from "./timezones"

export type Plugin = {
  args?: any,
  name: string
  version: string
  views: MatrixViews[]
  fn: (date: Date, args?: any, week?: number) => any,
  load?: (args?: any) => Promise<any>
}

export type PluginArg = (args: any) => Plugin

export type Options = {
  includeMonths?: boolean
  includeWeeks?: boolean
  includeDays?: boolean
  includeHours?: boolean
  includeMinutes?: boolean
  timeZone?: Timezone
  startOfDay?: number
  hoursInDay?: number
  daysInWeek?: number | 'weekends' | 'weekdays'
  startOfWeek?: number
  daysOfWeek?: string[] | 'long' | 'short' | 'narrow' | boolean
  format?: {
    locales?: string, // default: 'en-US'
    day?: 'numeric' | '2-digit',
    month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow',
    year?: 'numeric' | '2-digit',
    weekday?: 'long' | 'short' | 'narrow',
    hour?: 'numeric' | '2-digit',
    minute?: 'numeric' | '2-digit',
  },
}

export type MatrixViews = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute'

export type Matrix<T = {}> = {
  view: MatrixViews
  year?: Year<T>
  months?: Month<T>[]
  weeks?: Week<T>[]
  days?: Day<T>[]
  hours?: Hour<T>[]
  minutes?: Minute<T>[]
  currentDay?: number
  currentMonth?: number
  currentYear?: number
  currentHour?: number
  currentMinute?: number
  currentWeek?: number
}

export type Calendar<T = {}> = {
  view: MatrixViews,
  prev: Matrix<T>,
  current: Matrix<T>,
  next: Matrix<T>
}

export type Minute<T = {}> = {
	date: string
	minute: number
	hour: number
	day: number
	month: number
	year: number
	isCurrentMinute: boolean
} & T

export type Hour<T = {}> = {
	date: string
	minutes?: Minute[]
	hour: number
	day: number
	month: number
	year: number
	isCurrentHour: boolean
} & T

export type Day<T = {}> = {
	hours?: Hour[]
  date: string
  isToday: boolean
  isWeekend: boolean
  week: number
  month: number
  year: number
  day: string | number
} & T

export type Week<T = {}> = {
	days?: Day[]
	week: number
	month: number
	year: number
  isCurrentWeek: boolean
} & T

export type Month<T = {}> = {
	weeks?: Week[]
	month: number
	year: number
  isCurrentMonth: boolean
} & T

export type Year<T = {}> = {
	months?: Month[]
	year: number
  isCurrentYear: boolean
} & T