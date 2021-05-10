import { Booking as APIBooking } from '../../API';

export interface Booking extends APIBooking {
  id: string;
  date: string;
  time: string;
}
