import type { Calendar, Options } from "./types";
export default function createMatrix<T extends {} = any>(options: Options): Calendar<T>;
