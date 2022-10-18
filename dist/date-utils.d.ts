import Timezone from "./_timezones";
export declare function weeksInMonth(monthOrObjOrDate: number | Date | {
    month: number;
    year: number;
}, year?: number): number;
export declare function daysInMonth(monthOrObjOrDate: number | Date | {
    month: number;
    year: number;
}, year?: number): number;
export declare function getNumberOfWeeksInMonth(month: number, year: number): number;
export declare function getNumberOfDaysInMonth(month: number, year: number): number;
export declare function getDateCellByIndex(weekIndex: number, dayIndex: number, month: number, year: number): Date;
export declare function getCurrentWeek({ timezone, month, year }: {
    timezone?: Timezone;
    month: number;
    year: number;
}): number;
export declare function getDay(date: Date, { timeZone, locale }: {
    timeZone: Timezone;
    locale: string;
}): number;
export declare function getMonth(date: Date, { timeZone, locale }: {
    timeZone: Timezone;
    locale: string;
}): number;
export declare function getFullYear(date: Date, { timeZone, locale }: {
    timeZone: Timezone;
    locale: string;
}): number;
export declare function getHours(date: Date, { timeZone, locale }: {
    timeZone: Timezone;
    locale: string;
}): number;
export declare function getMinutes(date: Date, { timeZone, locale }: {
    timeZone: Timezone;
    locale: string;
}): number;
export declare function getDate(date: Date, { timeZone, locale }: {
    timeZone: Timezone;
    locale: string;
}): number;
export declare function getWeekNumber(date: Date, { timeZone, locale }: {
    timeZone: Timezone;
    locale: string;
}): number;
