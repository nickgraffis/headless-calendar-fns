export enum MatrixViews {
  year = 'year',
  month = 'month',
  week = 'week',
  day = 'day',
  hour = 'hour'
}

export type Matrix = {
  view: MatrixViews
  months?: Month[]
  weeks?: Week[]
  days?: Day[]
  hours?: Hour[]
  minutes?: Minute[]
}

export type Calendar = {
  view: MatrixViews,
  prev: Matrix,
  current: Matrix,
  next: Matrix
}

export type Minute = {
	unix: number
	minute: number
	hour: number
	day: number
	month: number
	year: number
	isCurrentMinute: boolean
}

export type Hour = {
	unix: number
	minutes?: Minute[]
	hour: number
	day: number
	month: number
	year: number
	isCurrentHour: boolean
}

export type Day = {
	hours?: Hour[]
  date: string
  isToday: boolean
  isWeekend: boolean
  week: number
  month: number
  year: number
  day: number
}

export type Week = {
	days?: Day[]
	week: number
	month: number
	year: number
}

export type Month = {
	weeks?: Week[]
	month: number
	year: number
}

export type Year = {
	months?: Month[]
	year: number
}

export type Event = {
  
}