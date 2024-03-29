import type { Plugin, Day, Hour, Minute, Month, Week, Options, Year } from "./types";
export declare function isPromise(p: any): boolean;
export declare function returnsPromise(f: Function): boolean;
export declare function getNumberOfWeeksInMonth(month: number, year: number): number;
export declare function getNumberOfDaysInMonth(month: number, year: number): number;
export declare function getDateCellByIndex(weekIndex: number, dayIndex: number, month: number, year: number): Date;
export declare function getDaysInWeek<T = {}>(weekIndex: number, month: number, year: number, options: Options, plugins?: Plugin[]): Day<T>[];
export declare function getMinutesInHour<T = {}>(hour: number, date: Date, options: Options, plugins?: Plugin[]): Minute<T>[];
export declare function getHoursinDay<T = {}>(date: Date, options?: Options, plugins?: Plugin[]): Hour<T>[];
export declare function getCurrentWeek(month: number, year: number): number;
export declare function getWeeksInMonth<T = {}>(month: number, year: number, options?: Options, plugins?: Plugin[]): Week<T>[];
export declare function getMonthsInYear<T = {}>(year: number, options: Options, plugins?: Plugin[]): Month<T>[];
export declare function getYears<T>(year: number, options: Options, plugins?: Plugin[]): Year<T>;
export declare function weeksInMonth(monthOrObjOrDate: number | Date | {
    month: number;
    year: number;
}, year?: number): number;
export declare function daysInMonth(monthOrObjOrDate: number | Date | {
    month: number;
    year: number;
}, year?: number): number;
