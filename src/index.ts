import { returnsPromise } from './promise-utils';
import { Calendar as CalendarConstructor } from "./dates";
import type { Options, View } from "./types";
import { MatrixViews } from "./types";
import { checkIfInBetweenTwoViews, createMatrixOutputForView, createMatrixOutputForViewAsPromise, createOptionsForNextView, createOptionsForPrevView } from "./utils";

export default function createMatrix<T extends {} = any>(
  options: Options
) {

  // By default, we want to include months for year
  if (checkIfInBetweenTwoViews(MatrixViews.year, MatrixViews.year)) 
    options.includeMonths = options.includeMonths || true
  else options.includeMonths = options.includeMonths || false
  // By default, we want to include weeks for year, or month view
  if (checkIfInBetweenTwoViews(MatrixViews.year, MatrixViews.month))
    options.includeWeeks = options.includeWeeks || true
  else options.includeWeeks = options.includeWeeks || false
  // By default, we want to include days for year, month, or week view
  if (checkIfInBetweenTwoViews(MatrixViews.year, MatrixViews.week))
    options.includeDays = options.includeDays || true
  else options.includeDays = options.includeDays || false
  // By default, we want to include hours for week, or day view
  if (checkIfInBetweenTwoViews(MatrixViews.week, MatrixViews.hour))
    options.includeHours = options.includeHours || true
  else options.includeHours = options.includeHours || false
  // By default, we want to include minutes for week, day, or hour view
  if (checkIfInBetweenTwoViews(MatrixViews.week, MatrixViews.minute))
    options.includeMinutes = options.includeMinutes || true
  else options.includeMinutes = options.includeMinutes || false

  // By default, we create a calendar for the current view, previous view, and next view
  options.createPrevNext = options.createPrevNext || true

  let calendar = new CalendarConstructor<T>(options)
  let nextCalendar
  if (options.createPrevNext) nextCalendar = new CalendarConstructor<T>(createOptionsForNextView(options))
  let prevCalendar 
  if (options.createPrevNext) prevCalendar = new CalendarConstructor<T>(createOptionsForPrevView(options))

  let usePromise = returnsPromise(calendar.getCalendar)
  let matrix;

  if (usePromise) {
    matrix = createMatrixOutputForViewAsPromise<T>([
      options,
      calendar.getCalendar() as Promise<View<T>>,
      (prevCalendar ? prevCalendar.getCalendar() : null) as Promise<View<T>> | undefined,
      (nextCalendar ? nextCalendar.getCalendar() : null) as Promise<View<T>> | undefined
    ])
  } else {
    matrix = createMatrixOutputForView(
      options,
      calendar.getCalendar() as View<T>,
      prevCalendar?.getCalendar() as View<T>,
      nextCalendar?.getCalendar() as View<T>
    )
  }

  return matrix
}

