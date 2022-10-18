import type { Calendar, Day, Hour, Minute, Month, Options, Plugin, Week, Year } from "./types";
import { MatrixViews } from "./types";
export declare function createOptionsForNextView(options: Options): Options;
export declare function createOptionsForPrevView(options: Options & {
    view: MatrixViews;
    year: number;
    month?: number;
    week?: number;
    day?: number;
    hour?: number;
    minute?: number;
    plugins?: Plugin[];
}): Options;
export declare function createMatrixOutputForView<T extends {} = any>(options: Options, currentCalendar: Month<T> | Week<T> | Day<T> | Hour<T> | Minute<T> | Year<T>, prevCalendar?: Month<T> | Week<T> | Day<T> | Hour<T> | Minute<T> | Year<T>, nextCalendar?: Month<T> | Week<T> | Day<T> | Hour<T> | Minute<T> | Year<T>): Calendar<T>;
export declare function checkIfInBetweenTwoViews(viewOne: MatrixViews, viewTwo?: MatrixViews): boolean;
