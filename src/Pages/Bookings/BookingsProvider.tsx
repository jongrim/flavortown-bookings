import * as React from 'react';
import { API } from 'aws-amplify';
import { useParams } from 'react-router-dom';
import * as subscriptions from '../../graphql/subscriptions';
import { Booking } from '../../API';
import { loadBookings, loadBookingsByDate } from '../../api/bookings';
import { keyedObjectFromArray } from '../../utils/array-utils';

interface BookingsState {
  bookings: {
    [key: string]: Booking;
  };
  bookingsByDate: {
    [key: string]: string[];
  };
}

const BookingsContext = React.createContext<{
  bookingsState: BookingsState;
  todaysBookings: Booking[];
  loadBookingsForDate: (date: string) => void;
  isLoading: boolean;
}>({
  bookingsState: { bookings: {}, bookingsByDate: {} },
  todaysBookings: [],
  loadBookingsForDate: () => {},
  isLoading: false,
});

export const useBookings = () => React.useContext(BookingsContext);

type bookingsEvent =
  | {
      type: 'BULK_LOAD';
      payload: { bookings: Booking[] };
    }
  | {
      type: 'LOAD_DATE';
      payload: { bookings: Booking[]; date: string };
    }
  | {
      type: 'ADD_BOOKING';
      payload: { booking: Booking };
    }
  | {
      type: 'UPDATE_BOOKING';
      payload: { booking: Booking };
    };

function bookingsReducer(
  state: BookingsState,
  event: bookingsEvent
): BookingsState {
  switch (event.type) {
    case 'BULK_LOAD':
      const { bookings } = event.payload;
      const dateBlock = bookings.reduce((acc, cur) => {
        if (acc[cur.date]) {
          acc[cur.date] = acc[cur.date].concat(cur.id);
        } else {
          acc[cur.date] = [cur.id];
        }
        return acc;
      }, {} as { [key: string]: string[] });
      return {
        bookings: keyedObjectFromArray(bookings),
        bookingsByDate: dateBlock,
      };
    case 'LOAD_DATE':
      if (event.payload.bookings.length === 0) return state;
      return {
        bookings: {
          ...state.bookings,
          ...keyedObjectFromArray(event.payload.bookings),
        },
        bookingsByDate: {
          ...state.bookingsByDate,
          [event.payload.date]: event.payload.bookings.map(({ id }) => id),
        },
      };
    case 'ADD_BOOKING':
      const { booking } = event.payload;
      const nextDateBlock = state.bookingsByDate[booking.date]
        ? state.bookingsByDate[booking.date].concat(booking.id)
        : [booking.id];
      return {
        bookings: {
          ...state.bookings,
          [booking.id]: booking,
        },
        bookingsByDate: {
          ...state.bookingsByDate,
          [booking.date]: nextDateBlock,
        },
      };
    case 'UPDATE_BOOKING':
      const { booking: updatedBooking } = event.payload;
      return {
        bookings: {
          ...state.bookings,
          [updatedBooking.id]: updatedBooking,
        },
        bookingsByDate: {
          ...state.bookingsByDate,
        },
      };
  }
}

export default function BookingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { date } = useParams<{ date: string }>();
  const [state, dispatch] = React.useReducer(bookingsReducer, {
    bookings: {},
    bookingsByDate: {},
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const loadBookingsForDate = React.useCallback(function loadBookingsForDate(
    date: string
  ) {
    loadBookingsByDate(date).then((results) => {
      setIsLoading(false);
      dispatch({
        type: 'LOAD_DATE',
        payload: { bookings: results, date },
      });
    });
  },
  []);

  /**
   * Load when date changes
   */
  React.useEffect(() => {
    setIsLoading(true);
    if (date === 'all') {
      loadBookings().then((bookings) => {
        setIsLoading(false);
        dispatch({
          type: 'BULK_LOAD',
          payload: { bookings },
        });
      });
    } else {
      loadBookingsForDate(date);
    }
  }, [date, loadBookingsForDate]);

  /**
   * New Booking and Update Subscriptions
   */
  React.useEffect(() => {
    const newBookingSubscription = API.graphql({
      query: subscriptions.onCreateBooking,
      // @ts-ignore
    }).subscribe({
      // @ts-ignore
      next: ({ value }) => {
        dispatch({
          type: 'ADD_BOOKING',
          payload: { booking: value.data.onCreateBooking },
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
        dispatch({ type: 'UPDATE_BOOKING', payload: { booking: updated } });
      },
    });

    return () => {
      newBookingSubscription.unsubscribe();
      updateBookingSubscription.unsubscribe();
    };
  }, []);

  const todaysBookings = React.useMemo(
    () => state.bookingsByDate[date]?.map((id) => state.bookings[id]) ?? [],
    [state, date]
  );

  return (
    <BookingsContext.Provider
      value={{
        todaysBookings,
        bookingsState: state,
        loadBookingsForDate,
        isLoading,
      }}
    >
      {children}
    </BookingsContext.Provider>
  );
}
