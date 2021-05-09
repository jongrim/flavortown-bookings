import * as React from 'react';
import { useParams } from 'react-router-dom';
import AllBookings from './AllBookings';
import DateBookings from './DateBookings';

export default function Bookings() {
  const { date } = useParams<{ date: string }>();

  if (date === 'all') {
    return <AllBookings />;
  }
  return <DateBookings />;
}
