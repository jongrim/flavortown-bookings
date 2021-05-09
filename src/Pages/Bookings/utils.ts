import { Booking } from '../../API';

export function sortByTime(a: Booking, b: Booking) {
  if (a.time <= b.time) return -1;
  if (b.time > a.time) return 1;
  return 0;
}
