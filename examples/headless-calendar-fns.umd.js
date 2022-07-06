/**
 * headless-calendar-fns v0.0.1
 * Copyright 2018-2022 Nick Graffis <hi@nickgraffis.me>
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["headless-calendar-fns"] = factory());
})(this, (function () { 'use strict';

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
        if (options === void 0) { options = {
            includeWeeks: true,
            includeDays: true,
            includeHours: true,
            includeMinutes: true
        }; }
        var days = [];
        var _loop_1 = function (j) {
            var date = getDateCellByIndex(weekIndex, j, month, year);
            var pluginResults = {};
            plugins === null || plugins === void 0 ? void 0 : plugins.forEach(function (plugin) {
                if (plugin.views.includes(MatrixViews.day)) {
                    pluginResults = __assign(__assign({}, plugin.fn(date)), pluginResults);
                }
            });
            days.push(__assign(__assign(__assign({}, (options === null || options === void 0 ? void 0 : options.includeHours) && { hours: getHoursinDay(date, options, plugins) }), { date: date.toISOString().split('T')[0], isToday: date.getDate() === new Date().getDate() &&
                    date.getMonth() === new Date().getMonth() &&
                    date.getFullYear() === new Date().getFullYear(), isWeekend: date.getDay() === 0 || date.getDay() === 6, day: date.getDay(), week: weekIndex, month: month, year: year }), pluginResults));
        };
        for (var j = 0; j < 7; j++) {
            _loop_1(j);
        }
        return days;
    }
    function getMinutesInHour(hour, date, plugins) {
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
            minutes.push(__assign({ unix: _date.getTime(), minute: i, hour: hour, day: _date.getDate(), month: _date.getMonth(), year: _date.getFullYear(), isCurrentMinute: _date.getMinutes() === new Date().getMinutes() }, pluginResults));
        };
        for (var i = 0; i < 60; i++) {
            _loop_2(i);
        }
        return minutes;
    }
    function getHoursinDay(date, options, plugins) {
        if (options === void 0) { options = {
            includeWeeks: true,
            includeDays: true,
            includeHours: true,
            includeMinutes: true
        }; }
        var hours = [];
        var _loop_3 = function (i) {
            var pluginResults = {};
            plugins === null || plugins === void 0 ? void 0 : plugins.forEach(function (plugin) {
                if (plugin.views.includes(MatrixViews.hour)) {
                    pluginResults = __assign(__assign({}, plugin.fn(new Date(date.getFullYear(), date.getMonth(), date.getDate(), i))), pluginResults);
                }
            });
            var hour = __assign(__assign(__assign({ unix: Math.floor((date.getTime() + (i * 60 * 60 * 1000)) / 1000) }, (options === null || options === void 0 ? void 0 : options.includeMinutes) && { minutes: getMinutesInHour(i, date, plugins) }), { hour: i, day: date.getDate(), month: date.getMonth(), year: date.getFullYear(), isCurrentHour: date.getHours() === new Date().getHours() }), pluginResults);
            hours.push(hour);
        };
        for (var i = 0; i < 24; i++) {
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
                        minutes: getMinutesInHour(hour, new Date(year, month, day), plugins)
                    },
                    prev: {
                        view: view,
                        minutes: getMinutesInHour(hour - 1, new Date(year, month, day), plugins)
                    },
                    next: {
                        view: view,
                        minutes: getMinutesInHour(hour + 1, new Date(year, month, day), plugins)
                    }
                };
            default:
                throw new Error('Invalid view, must be one of: year, month, week, day, hour');
        }
    }

    return createMatrix;

}));
