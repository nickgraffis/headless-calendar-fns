import { MatrixViews } from "./types";
import type { Calendar, Plugin, Options } from "./types";
export default function createMatrix<T = {}>(options: Options & {
    view: MatrixViews;
    year: number;
    month?: number;
    week?: number;
    day?: number;
    hour?: number;
    plugins?: Plugin[];
}): Calendar<T>;
