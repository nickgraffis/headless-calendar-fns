import { CalendarEvent, RepeatedEvent, RepeatingEvent } from './types';

export function createEvents<Event = any>(events: CalendarEvent<Event>[], viewStartDate: Date, viewEndDate: Date): CalendarEvent<Event>[] {
  const calculatedEvents: CalendarEvent<Event>[] = [];
  
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    if (event.isRepeating) {
      calculatedEvents.push(...handleRepeatingEvent(event, viewStartDate, viewEndDate));
    } else {
      calculatedEvents.push(event);
    }
  }

  // return events sorted by start date
  return calculatedEvents.sort((a, b) => a.start.getTime() - b.start.getTime());
}

function handleRepeatingEvent<Event = any>(event: CalendarEvent<Event>, viewStartDate: Date, viewEndDate: Date): CalendarEvent<Event>[] {
  if (event.repeating?.daysOfWeekToRepeat) {
    return createEventsFromRepeatingDaysOfWeek(event, viewStartDate, viewEndDate);
  } else if (event.repeating?.daysApartToRepeat) {
    return createEventsFromRepeatingDaysApart(event, viewStartDate, viewEndDate);
  } else if (event.repeating?.weeksOfMonthToRepeat) {
    return createEventsFromRepeatingWeeksOfMonth(event, viewStartDate, viewEndDate);
  }
}

export function createEventsFromRepeatingDaysOfWeek<Event = any>({
    repeating,
  }: CalendarEvent<Event>,
  viewStartDate: Date,
  viewEndDate: Date
): CalendarEvent<Event>[] {
  const events: CalendarEvent<Event>[] = [];
  while(viewStartDate < viewEndDate) {
    const day = viewStartDate.getDay();
    if (repeating?.repeatStart && viewStartDate < repeating.repeatStart) {
      viewStartDate.setDate(viewStartDate.getDate() + 1);
      continue;
    }

    if (repeating?.repeatEnd && viewStartDate > repeating.repeatEnd) {
      break;
    }

    if (repeating?.repeatQuantity && events.length >= repeating.repeatQuantity) {
      break;
    }

    if (repeating?.repeatOverwrite && repeating.repeatOverwrite[viewStartDate.toDateString()]) {
      events.push(formatRepeatingEvent(repeating.repeatOverwrite[viewStartDate.toDateString()], viewStartDate, viewEndDate, day))
    } else if (repeating?.daysOfWeekToRepeat?.[day.toString()]) {
      events.push(formatRepeatingEvent(repeating.daysOfWeekToRepeat?.[day.toString()], viewStartDate, viewEndDate, day))
    }

    viewStartDate.setDate(viewStartDate.getDate() + 1);
  }

  return events;
}

function formatRepeatingEvent<Event = any>(event: RepeatedEvent<Event>, viewStartDate: Date, viewEndDate: Date, day: number): CalendarEvent<Event> {
  return {
    ...event,
    // use the time from the original event
    start: new Date(
      viewStartDate.getFullYear(), 
      viewStartDate.getMonth(), 
      viewStartDate.getDate(), 
      event.start.getHours(), 
      event.start.getMinutes()
    ),
    end: new Date(
      viewStartDate.getFullYear(),
      viewStartDate.getMonth(),
      viewStartDate.getDate(),
      event.end.getHours(),
      event.end.getMinutes()
    ),
  }
}

export function createEventsFromRepeatingDaysApart<Event = any>({
  repeating,
}: CalendarEvent<Event>, viewStartDate: Date, viewEndDate: Date): CalendarEvent<Event>[] {
  const events: CalendarEvent<Event>[] = [];
  while(viewStartDate < viewEndDate) {
    if (repeating?.repeatStart && viewStartDate < repeating.repeatStart) {
      viewStartDate.setDate(viewStartDate.getDate() + 1);
      continue;
    }

    if (repeating?.repeatEnd && viewStartDate > repeating.repeatEnd) {
      break;
    }

    if (repeating?.repeatQuantity && events.length >= repeating.repeatQuantity) {
      break;
    }

    if (repeating?.repeatOverwrite && repeating.repeatOverwrite[viewStartDate.toDateString()]) {
      events.push(formatRepeatingEvent(repeating.repeatOverwrite[viewStartDate.toDateString()], viewStartDate, viewEndDate, viewStartDate.getDay()))
    } else if (repeating?.daysApartToRepeat && (viewStartDate.getDate() % parseInt(Object.keys(repeating.daysApartToRepeat)[0])) === 0) {
      events.push(formatRepeatingEvent(repeating.daysApartToRepeat[Object.keys(repeating.daysApartToRepeat)[0]], viewStartDate, viewEndDate, viewStartDate.getDay()))
    }

    viewStartDate.setDate(viewStartDate.getDate() + 1);
  }

  return events;
}

export function createEventsFromRepeatingWeeksOfMonth<Event = any>({
  repeating,
}: CalendarEvent<Event>, viewStartDate: Date, viewEndDate: Date): CalendarEvent<Event>[] {
  const events: CalendarEvent<Event>[] = [];
  while(viewStartDate < viewEndDate) {
    if (repeating?.repeatStart && viewStartDate < repeating.repeatStart) {
      viewStartDate.setDate(viewStartDate.getDate() + 1);
      continue;
    }

    if (repeating?.repeatEnd && viewStartDate > repeating.repeatEnd) {
      break;
    }

    if (repeating?.repeatQuantity && events.length >= repeating.repeatQuantity) {
      break;
    }

    if (repeating?.repeatOverwrite && repeating.repeatOverwrite[viewStartDate.toDateString()]) {
      events.push(formatRepeatingEvent(repeating.repeatOverwrite[viewStartDate.toDateString()], viewStartDate, viewEndDate, viewStartDate.getDay()))
    } else if (repeating?.weeksOfMonthToRepeat && repeating.weeksOfMonthToRepeat[viewStartDate.getDay().toString()]) {
      const weeksOfMonth = repeating.weeksOfMonthToRepeat[viewStartDate.getDay().toString()];
      const weekOfMonth = Math.ceil(viewStartDate.getDate() / 7);
      if (weeksOfMonth[weekOfMonth.toString()]) {
        events.push(formatRepeatingEvent(weeksOfMonth[weekOfMonth.toString()], viewStartDate, viewEndDate, viewStartDate.getDay()))
      }
    }

    viewStartDate.setDate(viewStartDate.getDate() + 1);
  }

  return events;
}