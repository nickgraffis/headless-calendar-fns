import { Timezone } from "../dist/timezones";
import createMatrix from "../";
import { MatrixViews } from "../src/types";

console.time("createMatrixYear");
createMatrix({
  view: MatrixViews.year,
  year: 2022,
  timeZone: Timezone["America/Anchorage"]
})

console.timeEnd("createMatrixYear");

console.time("createMatrixMonth");
createMatrix({
  view: MatrixViews.month,
  year: 2022,
  month: 0,
  timeZone: Timezone["America/Anchorage"]
})
console.timeEnd("createMatrixMonth");
console.time("createMatrixWeek");
createMatrix({
  view: MatrixViews.week,
  year: 2022,
  month: 0,
  week: 0,
  timeZone: Timezone["America/Anchorage"]
})
console.timeEnd("createMatrixWeek");
console.time("createMatrixDay");
createMatrix({
  view: MatrixViews.day,
  year: 2022,
  month: 0,
  day: 0,
  timeZone: Timezone["America/Anchorage"]
})
console.timeEnd("createMatrixDay");