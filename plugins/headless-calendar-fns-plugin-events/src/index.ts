import { MatrixViews } from "../../../src/types";

export const headlessCalendarFnsPluginEvents = {
  name: 'moonphase',
  version: '1.0.0',
  views: [MatrixViews.year],
  fn: (date: Date) => {
    const { name } = moonPhase(date)
    return { phase: name }
  }
}

export default headlessCalendarFnsPluginEvents;