import Timezone from "./_timezones"

export type Plugin<PluginArgs extends {} = any, PluginResponse extends {} = any, PluginLoadResponse extends {} = any> = {
  args?: PluginArgs,
  name: string
  version: string
  views: MatrixViews[]
  fn: (date: Date, args?: any, week?: number) => PluginResponse,
  load?: (args?: PluginArgs) => Promise<PluginLoadResponse> | PluginResponse
}

// Is this in use?
// export type PluginArg = (args: any) => Plugin

export type Options = {
  includeMonths?: boolean
  includeWeeks?: boolean
  includeDays?: boolean
  includeHours?: boolean
  includeMinutes?: boolean
  // Pass in true to create prev and next *default
  // Pass in false to create only current 
  // Pass in [true, false] to create prev and current
  // Pass in [false, true] to create current and next
  createPrevNext?: boolean | boolean[] | { prev?: boolean, next?: boolean }
  timeZone?: Timezone
  startOfDay?: number
  hoursInDay?: number
  daysInWeek?: number | 'weekends' | 'weekdays'
  startOfWeek?: number
  view: MatrixViews,
  year: number,
  month?: number,
  week?: number,
  day?: number,
  hour?: number,
  minute?: number,
  plugins?: Plugin[]
  daysOfWeek?: string[] | 'long' | 'short' | 'narrow' | boolean
  dateRange?: {
    start: Date,
    end: Date
  }
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

export enum MatrixViews {
  'year' = 'year',
  'month' = 'month',
  'week' = 'week',
  'day' = 'day',
  'hour' = 'hour',
  'minute' = 'minute',
}

export type Matrix<T extends {} = any> = {
  view: MatrixViews
  year?: Year<T>
  month?: Month<T>
  week?: Week<T>
  day?: Day<T>
  hour?: Hour<T>
  minute?: Minute<T>
  currentDay?: number
  currentMonth?: number
  currentYear?: number
  currentHour?: number
  currentMinute?: number
  currentWeek?: number
}

export type Calendar<T extends {} = any> = {
  view: MatrixViews,
  timezone: Timezone,
  prev?: Matrix<T>,
  current: Matrix<T>,
  next?: Matrix<T>
}

export type Minute<T extends {} = any> = {
	date: string
	minute: number
	hour: number
	day: number
	month: number
	year: number
	isCurrentMinute: boolean
} & T

export type Hour<T extends {} = any> = {
	date: string
	minutes?: Minute<T>[]
	hour: number
	day: number
	month: number
	year: number
	isCurrentHour: boolean
} & T

export type Day<T extends {} = any> = {
	hours?: Hour<T>[]
  date: string
  isToday: boolean
  isWeekend: boolean
  week: number
  month: number
  year: number
  day: string | number
} & T

export type Week<T extends {} = any> = {
	days?: Day<T>[]
	week: number
	month: number
	year: number
  isCurrentWeek: boolean
} & T

export type Month<T extends {} = any> = {
	weeks?: Week<T>[]
	month: number
	year: number
  isCurrentMonth: boolean
} & T

export type Year<T extends {} = any> = {
	months?: Month<T>[]
	year: number
  isCurrentYear: boolean
} & T

export type View<T extends {} = any> = {
  months?: Month<T>[]
	year?: number
  isCurrentYear?: boolean
  weeks?: Week<T>[]
	month?: number
  isCurrentMonth?: boolean
  days?: Day<T>[]
	week?: number
  isCurrentWeek?: boolean
  hours?: Hour<T>[]
  date?: string
  isToday?: boolean
  isWeekend?: boolean
  day?: string | number
	minutes?: Minute<T>[]
	hour?: number
	isCurrentHour?: boolean
	minute?: number
	isCurrentMinute: boolean
} & T

export type CreateMatrixOutputForViewAsPromiseArgs<T extends {} = any> = [
  options: Options, 
  currentCalendar: Promise<View<T>>, 
  prevCalendar?: Promise<View<T>>,
  nextCalendar?: Promise<View<T>>,
]