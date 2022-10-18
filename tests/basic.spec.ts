import { expect, test } from 'vitest'
import createMatrix from '..';

test('Create a year view', () => {
  const currentYear = new Date().getFullYear()
  let matrix = createMatrix({
    view: 'year',
    year: currentYear - 1,
  })

  expect(matrix.current.year?.isCurrentYear).toBe(false)
  expect(matrix.next.year?.isCurrentYear).toBe(true)
  expect(matrix.prev.year?.isCurrentYear).toBe(false)
})

test('Create a month view', () => {
  let matrix = createMatrix({
    view: 'month',
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  })

  console.group(JSON.stringify(matrix.current.months?.[7]?.weeks, null, 2))
  expect(matrix.current.months?.length).toBe(12)
  expect(matrix.current.months?.[0].weeks).toBeDefined()
  expect(matrix.current.months?.[0].weeks?.length).toBe(6)
  expect(matrix.current.months?.[0].weeks?.[0].days).toBeDefined()
  expect(matrix.current.months?.[0].weeks?.[0].days?.length).toBe(7)
})

test('Create custom length of week', () => {
  let matrix = createMatrix({
    view: 'month',
    year: new Date().getFullYear() - 1,
    month: new Date().getMonth(),
    startOfWeek: 1,
    daysInWeek: 5,
  })

  expect(matrix.current.months?.[0].weeks?.[0].days).toBeDefined()
  expect(matrix.current.months?.[0].weeks?.[0].days?.length).toBe(5)
  expect(matrix.current.months?.[0].weeks?.[0].days?.[0].day).toBe(1)
})