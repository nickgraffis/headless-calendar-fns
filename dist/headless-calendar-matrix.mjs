function getNumberOfWeeksInMonth(month, year) {
  const date = new Date(year, month, 1);
  const day = date.getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();
  return Math.ceil((lastDay + day) / 7);
}
function getDateCellByIndex(weekIndex, dayIndex, month, year) {
  const date = new Date(year, month, 1);
  const day = date.getDay();
  const firstDayIndex = day === 0 ? 6 : day - 1;
  const index = weekIndex * 7 + dayIndex;
  const dateIndex = index - firstDayIndex;
  const dateCell = new Date(year, month, dateIndex);
  return dateCell;
}
function getDaysInWeek(weekIndex, month, year, options, plugins) {
  var _a;
  const days = [];
  let daysInWeek = 7;
  let startOfWeek = 0;
  let inc = 1;
  if (options == null ? void 0 : options.daysInWeek) {
    if (typeof options.daysInWeek === "number") {
      daysInWeek = options.daysInWeek + 1;
    } else if (typeof options.daysInWeek === "string") {
      if (options.daysInWeek === "weekends") {
        daysInWeek = 7;
        startOfWeek = 0;
        inc = 6;
      } else {
        daysInWeek = 6;
        startOfWeek = 1;
      }
    }
  }
  if (options == null ? void 0 : options.startOfWeek) {
    if ((options == null ? void 0 : options.daysInWeek) === "weekends" || (options == null ? void 0 : options.daysInWeek) === "weekdays") {
      console.warn("setting startOfWeek with daysInWeek: weekends or weekdays can have wild results!");
    }
    startOfWeek = options.startOfWeek;
  }
  let today = (options == null ? void 0 : options.timeZone) ? new Date(new Date().toLocaleString("en-US", { timeZone: options.timeZone })) : new Date();
  for (let j = startOfWeek; j < daysInWeek; j = j + inc) {
    const date = getDateCellByIndex(weekIndex, j, month, year);
    let pluginResults = {};
    plugins == null ? void 0 : plugins.forEach((plugin) => {
      if (plugin.views.includes("day")) {
        pluginResults = {
          ...plugin.fn(date),
          ...pluginResults
        };
      }
    });
    let day = date.getDay();
    if (options == null ? void 0 : options.daysOfWeek) {
      if (Array.isArray(options.daysOfWeek)) {
        day = options.daysOfWeek[date.getDay()];
      } else if (typeof options.daysOfWeek === "string" && ["long", "short", "narrow"].includes(options.daysOfWeek)) {
        day = date.toLocaleDateString("en-US", { weekday: options.daysOfWeek });
      }
    } else if (!options.daysOfWeek)
      day = date.getDay();
    else
      day = date.getDay();
    days.push({
      ...(options == null ? void 0 : options.includeHours) && { hours: getHoursinDay(date, options, plugins) },
      date: (options == null ? void 0 : options.format) ? new Date(date).toLocaleString(((_a = options == null ? void 0 : options.format) == null ? void 0 : _a.locales) || "en-US", { ...options == null ? void 0 : options.format }) : date.toISOString().split("T")[0],
      isToday: date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear(),
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
      day,
      week: weekIndex,
      month,
      year,
      ...pluginResults
    });
  }
  return days;
}
function getMinutesInHour(hour, date, options, plugins) {
  var _a;
  const minutes = [];
  for (let i = 0; i < 60; i++) {
    const _date = new Date(date.getTime());
    _date.setHours(hour, i);
    let pluginResults = {};
    plugins == null ? void 0 : plugins.forEach((plugin) => {
      if (plugin.views.includes("minute")) {
        pluginResults = {
          ...plugin.fn(_date),
          ...pluginResults
        };
      }
    });
    minutes.push({
      date: (options == null ? void 0 : options.format) ? new Date(_date).toLocaleString(((_a = options == null ? void 0 : options.format) == null ? void 0 : _a.locales) || "en-US", { ...options == null ? void 0 : options.format }) : date.toISOString().split("T")[0],
      minute: i,
      hour,
      day: _date.getDate(),
      month: _date.getMonth(),
      year: _date.getFullYear(),
      isCurrentMinute: _date.getMinutes() === new Date().getMinutes(),
      ...pluginResults
    });
  }
  return minutes;
}
function getHoursinDay(date, options = {
  includeWeeks: true,
  includeDays: true,
  includeHours: true,
  includeMinutes: true
}, plugins) {
  var _a;
  let hours = [];
  let startOfDay = 0;
  let hoursInDay = 24;
  if (options == null ? void 0 : options.startOfDay) {
    startOfDay = options.startOfDay;
  }
  if (options == null ? void 0 : options.hoursInDay) {
    hoursInDay = startOfDay + options.hoursInDay + 1;
  }
  for (let i = startOfDay; i < hoursInDay; i++) {
    let pluginResults = {};
    plugins == null ? void 0 : plugins.forEach((plugin) => {
      if (plugin.views.includes("hour")) {
        pluginResults = {
          ...plugin.fn(new Date(date.getFullYear(), date.getMonth(), date.getDate(), i)),
          ...pluginResults
        };
      }
    });
    let _date = (options == null ? void 0 : options.timeZone) ? new Date(new Date().toLocaleString("en-US", { timeZone: options.timeZone })) : new Date();
    let isCurrentHour = i === _date.getHours();
    let hour = {
      date: (options == null ? void 0 : options.format) ? new Date(date).toLocaleString(((_a = options == null ? void 0 : options.format) == null ? void 0 : _a.locales) || "en-US", { ...options == null ? void 0 : options.format }) : date.toISOString().split("T")[0],
      ...(options == null ? void 0 : options.includeMinutes) && { minutes: getMinutesInHour(i, date, options, plugins) },
      hour: i,
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      isCurrentHour,
      ...pluginResults
    };
    hours.push(hour);
  }
  return hours;
}
function getCurrentWeek(month, year) {
  const date = new Date();
  const day = date.getDate();
  const firstDayOfMonth = new Date(year, month, 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const firstDayOfWeekInMonth = day - firstDayOfWeek;
  const week = Math.ceil(firstDayOfWeekInMonth / 7);
  return week;
}
function getWeeksInMonth(month, year, options = {
  includeWeeks: true,
  includeDays: true,
  includeHours: true,
  includeMinutes: true
}, plugins) {
  const weeks = [];
  const numberOfWeeks = getNumberOfWeeksInMonth(month, year);
  for (let i = 0; i < numberOfWeeks; i++) {
    let pluginResults = {};
    plugins == null ? void 0 : plugins.forEach((plugin) => {
      if (plugin.views.includes("week")) {
        pluginResults = {
          ...plugin.fn(new Date(year, month), i),
          ...pluginResults
        };
      }
    });
    weeks.push({
      ...options.includeDays && { days: getDaysInWeek(i, month, year, options, plugins) },
      week: i,
      year,
      month,
      isCurrentWeek: i === getCurrentWeek(month, year),
      ...pluginResults
    });
  }
  return weeks;
}
function getMonthsInYear(year, options, plugins) {
  const months = [];
  for (let i = 0; i < 12; i++) {
    let pluginResults = {};
    plugins == null ? void 0 : plugins.forEach((plugin) => {
      if (plugin.views.includes("month")) {
        pluginResults = {
          ...plugin.fn(new Date(year, i)),
          ...pluginResults
        };
      }
    });
    months.push({
      ...options.includeWeeks && { weeks: getWeeksInMonth(i, year, options, plugins) },
      month: i,
      year,
      isCurrentMonth: i === new Date().getMonth(),
      ...pluginResults
    });
  }
  return months;
}
function getYears(year, options, plugins) {
  let pluginResults = {};
  plugins == null ? void 0 : plugins.forEach((plugin) => {
    if (plugin.views.includes("year")) {
      pluginResults = {
        ...plugin.fn(new Date(year)),
        ...pluginResults
      };
    }
  });
  return {
    ...options.includeMonths && { months: getMonthsInYear(year, options, plugins) },
    year,
    isCurrentYear: year === new Date().getFullYear(),
    ...pluginResults
  };
}
function createMatrix(options) {
  const { view, year, month, week, day, hour, plugins } = options;
  options.includeMonths = options.includeMonths || true;
  options.includeWeeks = options.includeWeeks || true;
  options.includeDays = options.includeDays || true;
  options.includeHours = options.includeHours || false;
  options.includeMinutes = options.includeMinutes || false;
  switch (view) {
    case "year":
      return {
        view,
        prev: {
          view: "year",
          year: getYears(year - 1, options, plugins)
        },
        current: {
          view: "year",
          year: getYears(year, options, plugins)
        },
        next: {
          view: "year",
          year: getYears(year + 1, options, plugins)
        }
      };
    case "month":
      return {
        view,
        current: {
          view,
          months: getMonthsInYear(year, options, plugins)
        },
        prev: {
          view,
          months: getMonthsInYear(year - 1, options, plugins)
        },
        next: {
          view,
          months: getMonthsInYear(year + 1, options, plugins)
        }
      };
    case "week":
      if (!month && month !== 0 || !year) {
        throw new Error("month and year is required, when creating a matrix for month view");
      }
      return {
        view,
        current: {
          view,
          weeks: getWeeksInMonth(month, year, options, plugins)
        },
        prev: {
          view,
          weeks: getWeeksInMonth(month - 1, year, options, plugins)
        },
        next: {
          view,
          weeks: getWeeksInMonth(month + 1, year, options, plugins)
        }
      };
    case "day":
      if (!week || !month || !year) {
        throw new Error("week, month, year is required, when creating a matrix for week view");
      }
      return {
        view,
        current: {
          view,
          days: getDaysInWeek(week, month, year, options, plugins)
        },
        prev: {
          view,
          days: getDaysInWeek(week - 1, month, year, options, plugins)
        },
        next: {
          view,
          days: getDaysInWeek(week + 1, month, year, options, plugins)
        }
      };
    case "hour":
      if (!day || !month || !year) {
        throw new Error("day, month, year is required, when creating a matrix for day view");
      }
      return {
        view,
        current: {
          view,
          hours: getHoursinDay(new Date(year, month, day), options, plugins)
        },
        prev: {
          view,
          hours: getHoursinDay(new Date(year, month, day - 1), options, plugins)
        },
        next: {
          view,
          hours: getHoursinDay(new Date(year, month, day + 1), options, plugins)
        }
      };
    case "minute":
      if (!hour || !day || !month || !year) {
        throw new Error("hour, day, month, year is required, when creating a matrix for hour view");
      }
      return {
        view,
        current: {
          view,
          minutes: getMinutesInHour(hour, new Date(year, month, day), options, plugins)
        },
        prev: {
          view,
          minutes: getMinutesInHour(hour - 1, new Date(year, month, day), options, plugins)
        },
        next: {
          view,
          minutes: getMinutesInHour(hour + 1, new Date(year, month, day), options, plugins)
        }
      };
    default:
      throw new Error("Invalid view, must be one of: year, month, week, day, hour");
  }
}
export { createMatrix as default };
