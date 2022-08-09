import { MatrixViews } from './../src/types';
import createMatrix from "..";
export { EMoonPhase, EMoonPhaseName, MOON_PHASE_NAMES, moonPhase };
const { round, trunc: truncate } = Math;
var EMoonPhase;
(function (EMoonPhase) {
    EMoonPhase[EMoonPhase["New"] = 0] = "New";
    EMoonPhase[EMoonPhase["WaxingCrescent"] = 1] = "WaxingCrescent";
    EMoonPhase[EMoonPhase["QuarterMoon"] = 2] = "QuarterMoon";
    EMoonPhase[EMoonPhase["WaxingGibbous"] = 3] = "WaxingGibbous";
    EMoonPhase[EMoonPhase["Full"] = 4] = "Full";
    EMoonPhase[EMoonPhase["WaningGibbous"] = 5] = "WaningGibbous";
    EMoonPhase[EMoonPhase["LastQuarter"] = 6] = "LastQuarter";
    EMoonPhase[EMoonPhase["WaningCrescent"] = 7] = "WaningCrescent";
    EMoonPhase[EMoonPhase["COUNT"] = 8] = "COUNT";
})(EMoonPhase || (EMoonPhase = {}));
var EMoonPhaseName;
(function (EMoonPhaseName) {
    EMoonPhaseName["New"] = "New";
    EMoonPhaseName["WaxingCrescent"] = "Waxing Crescent";
    EMoonPhaseName["QuarterMoon"] = "Quarter Moon";
    EMoonPhaseName["WaxingGibbous"] = "Waxing Gibbous";
    EMoonPhaseName["Full"] = "Full";
    EMoonPhaseName["WaningGibbous"] = "Waning Gibbous";
    EMoonPhaseName["LastQuarter"] = "Last Quarter";
    EMoonPhaseName["WaningCrescent"] = "Waning Crescent";
    EMoonPhaseName["COUNT"] = "COUNT";
})(EMoonPhaseName || (EMoonPhaseName = {}));
const MOON_PHASE_NAMES = [
    EMoonPhaseName.New,
    EMoonPhaseName.WaxingCrescent,
    EMoonPhaseName.QuarterMoon,
    EMoonPhaseName.WaxingGibbous,
    EMoonPhaseName.Full,
    EMoonPhaseName.WaningGibbous,
    EMoonPhaseName.LastQuarter,
    EMoonPhaseName.WaningCrescent,
    EMoonPhaseName.COUNT
];
// Reference: http://individual.utoronto.ca/kalendis/lunar/#FALC
// Also known as a synodic month.
// An average synodic month takes 29 days, 12 hours, 44 minutes, 3 seconds.
const LUNAR_CYCLE = 29.53058770576;
const DAYS_PER_YEAR = 365.25;
const DAYS_PER_MONTH = 30.6;
// Number of days since known new moon on `1900-01-01`.
const DAYS_SINCE_NEW_MOON_1900_01_01 = 694039.09;
// Ported from `http://www.voidware.com/moon_phase.htm`.
function moonPhase(date = new Date()) {
    // let year = date.getYear()
    let year = date.getFullYear();
    let month = date.getMonth();
    const day = date.getDay();
    if (month < 3) {
        year--;
        month += 12;
    }
    month++;
    let totalDaysElapsed = DAYS_PER_YEAR
        * year
        + DAYS_PER_MONTH
            * month
        + day
        - DAYS_SINCE_NEW_MOON_1900_01_01;
    totalDaysElapsed /= LUNAR_CYCLE; // Divide by the lunar cycle.
    let phase = truncate(totalDaysElapsed);
    /*
      Subtract integer part to leave fractional part of original
      `totalDaysElapsed`.
     */
    totalDaysElapsed -= phase;
    // Scale fraction from `0-8`.
    phase = round(totalDaysElapsed * 8);
    phase = phase & 7; // `0` and `8` are the same so turn `8` into `0`.
    if (phase >= EMoonPhase.COUNT || phase < EMoonPhase.New)
        throw new Error(`Invalid moon phase: ${phase}`);
    return { phase, name: MOON_PHASE_NAMES[phase] };
}
let moonphaseMatrix = createMatrix({
    view: MatrixViews.year,
    year: new Date().getFullYear(),
    plugins: [{
            name: 'moonphase',
            version: '1.0.0',
            views: [MatrixViews.year],
            fn: (date) => {
                const { name } = moonPhase(date);
                return { phase: name };
            }
        }],
    includeDays: false,
});
console.log(moonphaseMatrix);
