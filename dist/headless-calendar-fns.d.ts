declare type Plugin = {
    name: string;
    version: string;
    views: MatrixViews[];
    fn: (date: Date, week?: number) => any;
};
declare enum MatrixViews {
    year = "year",
    month = "month",
    week = "week",
    day = "day",
    hour = "hour",
    minute = "minute"
}
declare type Matrix<T = {}> = {
    view: MatrixViews;
    months?: Month<T>[];
    weeks?: Week<T>[];
    days?: Day<T>[];
    hours?: Hour<T>[];
    minutes?: Minute<T>[];
};
declare type Calendar<T = {}> = {
    view: MatrixViews;
    prev: Matrix<T>;
    current: Matrix<T>;
    next: Matrix<T>;
};
declare type Minute<T = {}> = {
    unix: number;
    minute: number;
    hour: number;
    day: number;
    month: number;
    year: number;
    isCurrentMinute: boolean;
} & T;
declare type Hour<T = {}> = {
    unix: number;
    minutes?: Minute[];
    hour: number;
    day: number;
    month: number;
    year: number;
    isCurrentHour: boolean;
} & T;
declare type Day<T = {}> = {
    hours?: Hour[];
    date: string;
    isToday: boolean;
    isWeekend: boolean;
    week: number;
    month: number;
    year: number;
    day: number;
} & T;
declare type Week<T = {}> = {
    days?: Day[];
    week: number;
    month: number;
    year: number;
} & T;
declare type Month<T = {}> = {
    weeks?: Week[];
    month: number;
    year: number;
} & T;

declare type Options = {
    includeWeeks?: boolean;
    includeDays?: boolean;
    includeHours?: boolean;
    includeMinutes?: boolean;
};

declare function createMatrix<T = {}>(options: Options & {
    view: MatrixViews;
    year: number;
    month?: number;
    week?: number;
    day?: number;
    hour?: number;
    plugins: Plugin[];
}): Calendar<T>;

export { createMatrix as default };
