/**
 * headless-calendar-fns v0.0.1
 * Copyright 2018-2022 Nick Graffis <hi@nickgraffis.me>
 */

const __assign = Object.assign || function (target) {
    for (var source, i = 1; i < arguments.length; i++) {
        source = arguments[i];
        for (var prop in source) {
            if (Object.prototype.hasOwnProperty.call(source, prop)) {
                target[prop] = source[prop];
            }
        }
    }
    return target;
};

var MatrixViews;
(function (MatrixViews) {
    MatrixViews["year"] = "year";
    MatrixViews["month"] = "month";
    MatrixViews["week"] = "week";
    MatrixViews["day"] = "day";
    MatrixViews["hour"] = "hour";
    MatrixViews["minute"] = "minute";
})(MatrixViews || (MatrixViews = {}));

function getNumberOfWeeksInMonth(month, year) {
    var date = new Date(year, month, 1);
    var day = date.getDay();
    var lastDay = new Date(year, month + 1, 0).getDate();
    return Math.ceil((lastDay + day) / 7);
}
function getDateCellByIndex(weekIndex, dayIndex, month, year) {
    var date = new Date(year, month, 1);
    var day = date.getDay();
    var firstDayIndex = day === 0 ? 6 : day - 1;
    var index = weekIndex * 7 + dayIndex;
    var dateIndex = index - firstDayIndex;
    var dateCell = new Date(year, month, dateIndex);
    return dateCell;
}
function getDaysInWeek(weekIndex, month, year, options, plugins) {
    var _a;
    if (options === void 0) { options = {
        includeWeeks: true,
        includeDays: true,
        includeHours: true,
        includeMinutes: true
    }; }
    var days = [];
    var daysInWeek = 7;
    var startOfWeek = 0;
    var inc = 1;
    if (options === null || options === void 0 ? void 0 : options.daysInWeek) {
        if (typeof options.daysInWeek === 'number') {
            daysInWeek = options.daysInWeek + 1;
        }
        else if (typeof options.daysInWeek === 'string') {
            if (options.daysInWeek === 'weekends') {
                daysInWeek = 7;
                startOfWeek = 0;
                inc = 6;
            }
            else {
                daysInWeek = 6;
                startOfWeek = 1;
            }
        }
    }
    if (options === null || options === void 0 ? void 0 : options.startOfWeek) {
        if ((options === null || options === void 0 ? void 0 : options.daysInWeek) === 'weekends' || (options === null || options === void 0 ? void 0 : options.daysInWeek) === 'weekdays') {
            console.warn('setting startOfWeek with daysInWeek: weekends or weekdays can have wild results!');
        }
        startOfWeek = options.startOfWeek;
    }
    var today = ((options === null || options === void 0 ? void 0 : options.timeZone) ? new Date(new Date().toLocaleString("en-US", { timeZone: options.timeZone })) : new Date());
    var _loop_1 = function (j) {
        var date = getDateCellByIndex(weekIndex, j, month, year);
        var pluginResults = {};
        plugins === null || plugins === void 0 ? void 0 : plugins.forEach(function (plugin) {
            if (plugin.views.includes(MatrixViews.day)) {
                pluginResults = __assign(__assign({}, plugin.fn(date)), pluginResults);
            }
        });
        days.push(__assign(__assign(__assign({}, (options === null || options === void 0 ? void 0 : options.includeHours) && { hours: getHoursinDay(date, options, plugins) }), { date: (options === null || options === void 0 ? void 0 : options.format) ?
                new Date(date).toLocaleString(((_a = options === null || options === void 0 ? void 0 : options.format) === null || _a === void 0 ? void 0 : _a.locales) ||
                    'en-US', __assign({}, options === null || options === void 0 ? void 0 : options.format)) :
                date.toISOString().split('T')[0], isToday: date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear(), isWeekend: date.getDay() === 0 || date.getDay() === 6, day: (function () {
                if (options === null || options === void 0 ? void 0 : options.daysOfWeek) {
                    if (Array.isArray(options.daysOfWeek)) {
                        return options.daysOfWeek[date.getDay()];
                    }
                    else if (typeof options.daysOfWeek === 'string' && ['long', 'short', 'narrow'].includes(options.daysOfWeek)) {
                        return date.toLocaleDateString('en-US', { weekday: options.daysOfWeek });
                    }
                }
                else if (!options.daysOfWeek)
                    return date.getDay();
                else
                    return date.getDay();
            })(), week: weekIndex, month: month, year: year }), pluginResults));
    };
    for (var j = startOfWeek; j < daysInWeek; j = j + inc) {
        _loop_1(j);
    }
    return days;
}
function getMinutesInHour(hour, date, options, plugins) {
    var _a;
    var minutes = [];
    var _loop_2 = function (i) {
        var _date = new Date(date.getTime());
        _date.setHours(hour, i);
        var pluginResults = {};
        plugins === null || plugins === void 0 ? void 0 : plugins.forEach(function (plugin) {
            if (plugin.views.includes(MatrixViews.minute)) {
                pluginResults = __assign(__assign({}, plugin.fn(_date)), pluginResults);
            }
        });
        minutes.push(__assign({ date: (options === null || options === void 0 ? void 0 : options.format) ?
                new Date(_date).toLocaleString(((_a = options === null || options === void 0 ? void 0 : options.format) === null || _a === void 0 ? void 0 : _a.locales) ||
                    'en-US', __assign({}, options === null || options === void 0 ? void 0 : options.format)) :
                date.toISOString().split('T')[0], minute: i, hour: hour, day: _date.getDate(), month: _date.getMonth(), year: _date.getFullYear(), isCurrentMinute: _date.getMinutes() === new Date().getMinutes() }, pluginResults));
    };
    for (var i = 0; i < 60; i++) {
        _loop_2(i);
    }
    return minutes;
}
function getHoursinDay(date, options, plugins) {
    var _a;
    if (options === void 0) { options = {
        includeWeeks: true,
        includeDays: true,
        includeHours: true,
        includeMinutes: true
    }; }
    var hours = [];
    var startOfDay = 0;
    var hoursInDay = 24;
    if (options === null || options === void 0 ? void 0 : options.startOfDay) {
        startOfDay = options.startOfDay;
    }
    if (options === null || options === void 0 ? void 0 : options.hoursInDay) {
        hoursInDay = startOfDay + options.hoursInDay + 1;
    }
    var _loop_3 = function (i) {
        var pluginResults = {};
        plugins === null || plugins === void 0 ? void 0 : plugins.forEach(function (plugin) {
            if (plugin.views.includes(MatrixViews.hour)) {
                pluginResults = __assign(__assign({}, plugin.fn(new Date(date.getFullYear(), date.getMonth(), date.getDate(), i))), pluginResults);
            }
        });
        var _date = (options === null || options === void 0 ? void 0 : options.timeZone) ? new Date(new Date().toLocaleString("en-US", { timeZone: options.timeZone })) : new Date();
        var isCurrentHour = i === _date.getHours();
        var hour = __assign(__assign(__assign({ date: (options === null || options === void 0 ? void 0 : options.format) ?
                new Date(date).toLocaleString(((_a = options === null || options === void 0 ? void 0 : options.format) === null || _a === void 0 ? void 0 : _a.locales) ||
                    'en-US', __assign({}, options === null || options === void 0 ? void 0 : options.format)) :
                date.toISOString().split('T')[0] }, (options === null || options === void 0 ? void 0 : options.includeMinutes) && { minutes: getMinutesInHour(i, date, options, plugins) }), { hour: i, day: date.getDate(), month: date.getMonth(), year: date.getFullYear(), isCurrentHour: isCurrentHour }), pluginResults);
        hours.push(hour);
    };
    for (var i = startOfDay; i < hoursInDay; i++) {
        _loop_3(i);
    }
    return hours;
}
function getWeeksInMonth(month, year, options, plugins) {
    if (options === void 0) { options = {
        includeWeeks: true,
        includeDays: true,
        includeHours: true,
        includeMinutes: true
    }; }
    var weeks = [];
    var numberOfWeeks = getNumberOfWeeksInMonth(month, year);
    var _loop_4 = function (i) {
        var pluginResults = {};
        plugins === null || plugins === void 0 ? void 0 : plugins.forEach(function (plugin) {
            if (plugin.views.includes(MatrixViews.week)) {
                pluginResults = __assign(__assign({}, plugin.fn(new Date(year, month), i)), pluginResults);
            }
        });
        weeks.push(__assign(__assign(__assign({}, (options.includeDays) && { days: getDaysInWeek(i, month, year, options, plugins) }), { week: i, year: year, month: month }), pluginResults));
    };
    for (var i = 0; i < numberOfWeeks; i++) {
        _loop_4(i);
    }
    return weeks;
}
function getMonthsInYear(year, options, plugins) {
    if (options === void 0) { options = {
        includeWeeks: true,
        includeDays: true,
        includeHours: true,
        includeMinutes: true,
    }; }
    var months = [];
    var _loop_5 = function (i) {
        var pluginResults = {};
        plugins === null || plugins === void 0 ? void 0 : plugins.forEach(function (plugin) {
            if (plugin.views.includes(MatrixViews.month)) {
                pluginResults = __assign(__assign({}, plugin.fn(new Date(year, i))), pluginResults);
            }
        });
        months.push(__assign(__assign(__assign({}, (options.includeWeeks) && { weeks: getWeeksInMonth(i, year, options, plugins) }), { month: i, year: year }), pluginResults));
    };
    for (var i = 0; i < 12; i++) {
        _loop_5(i);
    }
    return months;
}

function createMatrix(options) {
    var view = options.view, year = options.year, month = options.month, week = options.week, day = options.day, hour = options.hour, plugins = options.plugins;
    options.includeWeeks = options.includeWeeks || true;
    options.includeDays = options.includeDays || true;
    options.includeHours = options.includeHours || false;
    options.includeMinutes = options.includeMinutes || false;
    switch (view) {
        case MatrixViews.year:
            return {
                view: view,
                current: {
                    view: view,
                    months: getMonthsInYear(year, options, plugins)
                },
                prev: {
                    view: view,
                    months: getMonthsInYear(year - 1, options, plugins)
                },
                next: {
                    view: view,
                    months: getMonthsInYear(year + 1, options, plugins)
                }
            };
        case MatrixViews.month:
            if (!month || !year) {
                throw new Error('month and year is required, when creating a matrix for month view');
            }
            return {
                view: view,
                current: {
                    view: view,
                    weeks: getWeeksInMonth(month, year, options, plugins)
                },
                prev: {
                    view: view,
                    weeks: getWeeksInMonth(month - 1, year, options, plugins)
                },
                next: {
                    view: view,
                    weeks: getWeeksInMonth(month + 1, year, options, plugins)
                }
            };
        case MatrixViews.week:
            if (!week || !month || !year) {
                throw new Error('week, month, year is required, when creating a matrix for week view');
            }
            return {
                view: view,
                current: {
                    view: view,
                    days: getDaysInWeek(week, month, year, options, plugins)
                },
                prev: {
                    view: view,
                    days: getDaysInWeek(week - 1, month, year, options, plugins)
                },
                next: {
                    view: view,
                    days: getDaysInWeek(week + 1, month, year, options, plugins)
                }
            };
        case MatrixViews.day:
            if (!day || !month || !year) {
                throw new Error('day, month, year is required, when creating a matrix for day view');
            }
            return {
                view: view,
                current: {
                    view: view,
                    hours: getHoursinDay(new Date(year, month, day), options, plugins)
                },
                prev: {
                    view: view,
                    hours: getHoursinDay(new Date(year, month, day - 1), options, plugins)
                },
                next: {
                    view: view,
                    hours: getHoursinDay(new Date(year, month, day + 1), options, plugins)
                }
            };
        case MatrixViews.hour:
            if (!hour || !day || !month || !year) {
                throw new Error('hour, day, month, year is required, when creating a matrix for hour view');
            }
            return {
                view: view,
                current: {
                    view: view,
                    minutes: getMinutesInHour(hour, new Date(year, month, day), options, plugins)
                },
                prev: {
                    view: view,
                    minutes: getMinutesInHour(hour - 1, new Date(year, month, day), options, plugins)
                },
                next: {
                    view: view,
                    minutes: getMinutesInHour(hour + 1, new Date(year, month, day), options, plugins)
                }
            };
        default:
            throw new Error('Invalid view, must be one of: year, month, week, day, hour');
    }
}

export { createMatrix as default };
