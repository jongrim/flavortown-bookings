import { API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import {
  Booking,
  CreateBookingInput,
  ListBookingsQueryVariables,
  UpdateBookingInput,
} from '../API';

export function createBooking(input: CreateBookingInput) {
  return API.graphql({
    query: mutations.createBooking,
    variables: {
      input,
    },
  });
}

export function updateBooking(update: UpdateBookingInput) {
  return API.graphql({
    query: mutations.updateBooking,
    variables: {
      input: update,
    },
  });
}

export async function loadBookings(
  variables?: ListBookingsQueryVariables
): Promise<Booking[]> {
  return API.graphql({
    query: queries.listBookings,
    variables,
    // @ts-ignore
  }).then(async ({ data }) => {
    const items = data?.listBookings?.items;
    if (data.listBookings.nextToken) {
      const nextItems = await loadBookings({
        ...variables,
        nextToken: data.listBookings.nextToken,
      });
      items.push(...nextItems);
    }
    return items;
  });
}

export async function loadBookingsByDate(
  date: string,
  variables?: ListBookingsQueryVariables
): Promise<Booking[]> {
  return API.graphql({
    query: queries.bookingsByDate,
    variables: {
      date,
      ...variables,
    },
    // @ts-ignore
  }).then(async ({ data }) => {
    const items = data?.bookingsByDate?.items;
    if (data.bookingsByDate.nextToken) {
      const nextItems = await loadBookingsByDate(date, {
        ...variables,
        nextToken: data.bookingsByDate.nextToken,
      });
      items.push(...nextItems);
    }
    return items;
  });
}
