import createMatrix from "../dist/headless-calendar-matrix.mjs";

console.time("createMatrix");
let cm = createMatrix({
  view: "year",
  year: 2020,
  month: 1,
  week: 1,
  day: 2
})

console.timeEnd("createMatrix");

// minute view -- 2.064ms
// hour view (showing min) -- 16.767ms
// day view (showing hour and min) -- 16.757ms
// week view (showing day and hour) -- 399.526ms
// month view (not showing hour and min) -- 10.916ms
// year view (not showing hour and min) -- 10.6ms