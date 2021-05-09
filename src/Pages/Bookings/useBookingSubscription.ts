import * as React from 'react';
import { API } from 'aws-amplify';
import * as subscriptions from '../../graphql/subscriptions';
import { loadBookings } from '../../api/bookings';
import { Booking } from '../../API';

function sortByTime(a: Booking, b: Booking) {
  if (a.time <= b.time) return -1;
  if (b.time > a.time) return 1;
  return 0;
}

export default function useBookingSubscription({ date }: { date: string }) {
  const [loading, setLoading] = React.useState(false);
  const [bookings, setBookings] = React.useState<Booking[]>([]);

  React.useEffect(() => {
    setLoading(true);
    loadBookings({
      filter: {
        date: {
          eq: date,
        },
      },
    })
      // @ts-ignore
      .then(({ data }) => {
        setBookings(data?.listBookings?.items.sort(sortByTime));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [date]);

  React.useEffect(() => {
    const newBookingSubscription = API.graphql({
      query: subscriptions.onCreateBooking,
      // @ts-ignore
    }).subscribe({
      // @ts-ignore
      next: ({ value }) => {
        setBookings((cur) => {
          return cur.concat(value.data.onCreateBooking);
        });
      },
    });

    const updateBookingSubscription = API.graphql({
      query: subscriptions.onUpdateBooking,
      // @ts-ignore
    }).subscribe({
      // @ts-ignore
      next: ({ value }) => {
        const updated = value.data.onUpdateBooking;
        setBookings((cur) => {
          const next = cur.map((booking) => {
            if (booking.id === updated.id) {
              return updated;
            }
            return booking;
          });
          return next;
        });
      },
    });

    return () => {
      newBookingSubscription.unsubscribe();
      updateBookingSubscription.unsubscribe();
    };
  }, []);

  return { bookings, isLoading: loading };
}
