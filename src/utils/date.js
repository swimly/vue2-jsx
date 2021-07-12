import { startOfMonth, endOfMonth, eachDayOfInterval, subMonths, addMonths, getDay, subYears, addYears, eachYearOfInterval, startOfYear, endOfYear, eachMonthOfInterval, eachWeekOfInterval } from "date-fns"

const thisMonthDays = (date) => {
  const start = startOfMonth(date)
  const end = endOfMonth(date)
  return eachDayOfInterval({
    start,
    end
  })
}
const splitArray = (array, subGroupLength) => {
  let index = 0;
  let newArray = [];
  while (index < array.length) {
    newArray.push(array.slice(index, index += subGroupLength));
  }
  return newArray;
}
const thisFullMonthDays = (date, startW) => {
  const C = date
  const P = subMonths(C, 1)
  const N = addMonths(C, 1)
  const start = startOfMonth(C)
  let arr = thisMonthDays(C)
  let prev = thisMonthDays(P)
  let next = thisMonthDays(N)
  const fw = getDay(start)
  prev = prev.splice(prev.length - fw + startW, prev.length)
  const length = 42 - (prev.length + arr.length)
  next = next.splice(0, length)
  let result = [...prev, ...arr, ...next]
  let nr = [result]
  if (result.length > 7) {
    nr = splitArray(result, 7)
  }
  return nr
}

const latest15Years = (date) => {
  const start = subYears(date, 7)
  const end = addYears(date, 7)
  return eachYearOfInterval({
    start,
    end
  })
}

const thisYearMonths = (date) => {
  const start = startOfYear(date)
  const end = endOfYear(date)
  return eachMonthOfInterval({
    start,
    end
  })
}


const generateArray = (start, end) => {
  var arr = [];
  for (var i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
}


const timeData = () => {
  const hours = generateArray(0, 23);
  const minutes = generateArray(0, 59);
  const seconds = generateArray(0, 59);
  return [hours, minutes, seconds];
}

const quartData = () => {
  const quart = generateArray(1, 4);
  return quart;
}

export default {
  thisFullMonthDays,
  latest15Years,
  thisYearMonths,
  timeData,
  quartData
}