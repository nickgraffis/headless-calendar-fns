export type Plugin = {
  name: string
  version: string
  views: MatrixViews[]
  fn: (date: Date, week?: number) => any
}

export enum MatrixViews {
  year = 'year',
  month = 'month',
  week = 'week',
  day = 'day',
  hour = 'hour',
  minute = 'minute'
}

export type Matrix<T = {}> = {
  view: MatrixViews
  months?: Month<T>[]
  weeks?: Week<T>[]
  days?: Day<T>[]
  hours?: Hour<T>[]
  minutes?: Minute<T>[]
}

export type Calendar<T = {}> = {
  view: MatrixViews,
  prev: Matrix<T>,
  current: Matrix<T>,
  next: Matrix<T>
}

export type Minute<T = {}> = {
	unix: number
	minute: number
	hour: number
	day: number
	month: number
	year: number
	isCurrentMinute: boolean
} & T

export type Hour<T = {}> = {
	unix: number
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
  day: number
} & T

export type Week<T = {}> = {
	days?: Day[]
	week: number
	month: number
	year: number
} & T

export type Month<T = {}> = {
	weeks?: Week[]
	month: number
	year: number
} & T

export type Year<T = {}> = {
	months?: Month[]
	year: number
} & T

export type Event = {
  
}