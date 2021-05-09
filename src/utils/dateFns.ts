import { format, parse, sub, add, parseISO } from 'date-fns';

const DATE_URL_FORMAT = 'yyyy-MM-dd';

export function formateDateForURL(date: Date) {
  return format(date, DATE_URL_FORMAT);
}

export function getToday() {
  return formateDateForURL(new Date());
}

export function parseFullDate(val: string) {
  return parse(val, DATE_URL_FORMAT, new Date());
}

export function formatDateAsHeading(val: Date) {
  try {
    return format(val, 'LLL do, yyyy');
  } catch (e) {
    return val;
  }
}

export function getYesterday(val: Date) {
  return sub(val, { days: 1 });
}

export function getYesterdayURL(val: Date) {
  const yesterday = getYesterday(val);
  const param = formateDateForURL(yesterday);
  return param;
}

export function getTomorrow(val: Date) {
  return add(val, { days: 1 });
}

export function getTomorrowURL(val: Date) {
  const tomorrow = getTomorrow(val);
  const param = formateDateForURL(tomorrow);
  return param;
}

export function addFifteenMinutes(val: Date) {
  return add(val, { minutes: 15 });
}

export function convertTimeToDate(time: string, fillInDate: Date) {
  return parse(time, 'HH:mm', fillInDate);
}

export function convertISOStringToTime(datetime: string) {
  return format(parseISO(datetime), 'h:mm aa');
}
