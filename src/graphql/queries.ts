/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBooking = /* GraphQL */ `
  query GetBooking($id: ID!) {
    getBooking(id: $id) {
      id
      name
      email
      partySize
      date
      time
      createdAt
      updatedAt
    }
  }
`;
export const listBookings = /* GraphQL */ `
  query ListBookings(
    $filter: ModelBookingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBookings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        partySize
        date
        time
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const bookingsByDate = /* GraphQL */ `
  query BookingsByDate(
    $date: AWSDate
    $sortDirection: ModelSortDirection
    $filter: ModelBookingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bookingsByDate(
      date: $date
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        email
        partySize
        date
        time
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
