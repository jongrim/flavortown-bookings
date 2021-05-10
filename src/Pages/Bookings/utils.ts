import { Booking } from './types';

export function sortByTime(a: Booking, b: Booking) {
  if (a.time <= b.time) return -1;
  if (a.time > b.time) return 1;
  return 0;
}
