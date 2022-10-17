export type CalendarEvent<EventData = any> = {
  /* The date of the event. */
  start: Date,
  end: Date,
  /* The actual event data */
  meta?: EventData,
  /* A nanoid */
  id: string,
  /* Weather or not the event is repeating */
  isRepeating?: boolean,
  repeating?: RepeatingEvent<EventData>,
  /* Weather or not the event is all day*/
  isAllDay?: boolean
}

export type RepeatingEvent<EventData> = {
  /* For example, repeat every W or W & F */
  daysOfWeekToRepeat?: RepeatingCalendarEventDays<EventData>,
  /* For example, repeat every 14 days */
  daysApartToRepeat?: RepeatingCalendarEventDaysApart<EventData>,
  /* For example, repeat first and third weeks every month */
  weeksOfMonthToRepeat?: RepeatingCalendarEventWeeks<EventData>,
  /* For example, repeat every 3 weeks */
  weeksApartToRepeat?: RepeatingCalendarEventWeeksApart<EventData>,
  /* For example, repeat every 2 months */
  monthsApartToRepeat?: RepeatingCalendarEventMonthsApart<EventData>,
  /* For example, repeat every January */
  monthsToRepeat?: RepeatingCalendarEventMonths<EventData>,
  /* For example, repeat every 2 years */
  yearsToRepeat?: RepeatingCalendarEventYearsHoursMinutes<EventData>,
  hoursToRepeat?: RepeatingCalendarEventYearsHoursMinutes<EventData>,
  minutesToRepeat?: RepeatingCalendarEventYearsHoursMinutes<EventData>,
  repeatStart?: Date,
  repeatEnd?: Date,
  repeatQuantity?: number,
  repeatOverwrite?: RepeatingCalendarEventYearsHoursMinutes<EventData>,
}

export type RepeatedEvent<EventData> = Omit<CalendarEvent<EventData>, 'repeating' | 'isRepeating'>

type RepeatingCalendarEventDays<EventData> = {
  [key in '0' | '1' | '2' | '3' | '4' | '5' | '6']: RepeatedEvent<EventData>
}

type RepeatingCalendarEventDaysApart<EventData> = {
  [key: string]: RepeatedEvent<EventData>
}

type RepeatingCalendarEventWeeks<EventData> = {
  [key in '0' | '1' | '2' | '3' | '4']: RepeatedEvent<EventData>
}

type RepeatingCalendarEventWeeksApart<EventData> = {
  [key: string]: RepeatedEvent<EventData>
}

type RepeatingCalendarEventMonths<EventData> = {
  [key in '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11']: RepeatedEvent<EventData>
}

type RepeatingCalendarEventMonthsApart<EventData> = {
  [key: string]: RepeatedEvent<EventData>
}

type RepeatingCalendarEventYearsHoursMinutes<EventData> = {
  [key: string]: RepeatedEvent<EventData>,
}