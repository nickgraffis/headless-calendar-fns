import type { Calendar, Day, Hour, Matrix, Minute, Month, Options, Plugin, Week, Year } from "./types";
import { MatrixViews } from "./types";

export function createOptionsForNextView(options: Options & {
  view: MatrixViews,
  year: number,
  month?: number,
  week?: number,
  day?: number,
  hour?: number,
  plugins?: Plugin[]
}): Options & {
  view: MatrixViews,
  year: number,
  month?: number,
  week?: number,
  day?: number,
  hour?: number,
  plugins?: Plugin[]
} {
  switch (options.view) {
    case MatrixViews.year:
      return {
        ...options,
        view: MatrixViews.month,
        year: options.year + 1,
      };
    case MatrixViews.month:
      return {
        ...options,
        view: MatrixViews.week,
        month: options.month ? options.month + 1 : 0,
      };
    case MatrixViews.week:
      return {
        ...options,
        view: MatrixViews.day,
        week: options.week ? options.week + 1 : 0,
      };
    case MatrixViews.day:
      return {
        ...options,
        view: MatrixViews.hour,
        day: options.day ? options.day + 1 : 0,
      };
    case MatrixViews.hour:
      return {
        ...options,
        view: MatrixViews.minute,
        hour: options.hour ? options.hour + 1 : 0,
      };
    default:
      return options;
  }
}

export function createOptionsForPrevView(options: Options & {
  view: MatrixViews,
  year: number,
  month?: number,
  week?: number,
  day?: number,
  hour?: number,
  plugins?: Plugin[]
}): Options & {
  view: MatrixViews,
  year: number,
  month?: number,
  week?: number,
  day?: number,
  hour?: number,
  plugins?: Plugin[]
} {
  switch (options.view) {
    case MatrixViews.year:
      return {
        ...options,
        view: MatrixViews.month,
        year: options.year - 1,
      };
    case MatrixViews.month:
      return {
        ...options,
        view: MatrixViews.week,
        month: options.month ? options.month - 1 : 0,
      };
    case MatrixViews.week:
      return {
        ...options,
        view: MatrixViews.day,
        week: options.week ? options.week - 1 : 0,
      };
    case MatrixViews.day:
      return {
        ...options,
        view: MatrixViews.hour,
        day: options.day ? options.day - 1 : 0,
      };
    case MatrixViews.hour:
      return {
        ...options,
        view: MatrixViews.minute,
        hour: options.hour ? options.hour - 1 : 0,
      };
    default:
      return options;
  }
}

export function createMatrixOutputForView<T>(
  options: Options & {
    view: MatrixViews,
    year: number,
    month?: number,
    week?: number,
    day?: number,
    hour?: number,
    plugins?: Plugin[]
  }, 
  currentCalendar: Month<T>[] | Week<T>[] | Day<T>[] | Hour<T>[] | Minute<T>[], 
  prevCalendar: Month<T>[] | Week<T>[] | Day<T>[] | Hour<T>[] | Minute<T>[],
  nextCalendar: Month<T>[] | Week<T>[] | Day<T>[] | Hour<T>[] | Minute<T>[]
): Matrix<T> {
  switch (options.view) {
    case MatrixViews.year:
      return {
        view: options.view,
        year: {
          months: currentCalendar as Month<T>[],
          year: options.year,
          isCurrentYear: true,
        } as unknown as Year<T>,
        prev: {
          view: options.view,
          years: prevCalendar,
        },
        next: {
          view: options.view,
          years: nextCalendar,
        },
      }
    default:
      throw new Error("Invalid view, must be one of: year, month, week, day, hour");
  }
} 