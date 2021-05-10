/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateBookingInput = {
  id?: string | null,
  name?: string | null,
  email?: string | null,
  partySize?: number | null,
  date: string,
  time: string,
};

export type ModelBookingConditionInput = {
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  partySize?: ModelIntInput | null,
  date?: ModelStringInput | null,
  time?: ModelStringInput | null,
  and?: Array< ModelBookingConditionInput | null > | null,
  or?: Array< ModelBookingConditionInput | null > | null,
  not?: ModelBookingConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Booking = {
  __typename: "Booking",
  id?: string,
  name?: string | null,
  email?: string | null,
  partySize?: number | null,
  date?: string,
  time?: string,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateBookingInput = {
  id: string,
  name?: string | null,
  email?: string | null,
  partySize?: number | null,
  date?: string | null,
  time?: string | null,
};

export type DeleteBookingInput = {
  id?: string | null,
};

export type ModelBookingFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  partySize?: ModelIntInput | null,
  date?: ModelStringInput | null,
  time?: ModelStringInput | null,
  and?: Array< ModelBookingFilterInput | null > | null,
  or?: Array< ModelBookingFilterInput | null > | null,
  not?: ModelBookingFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelBookingConnection = {
  __typename: "ModelBookingConnection",
  items?:  Array<Booking | null > | null,
  nextToken?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type CreateBookingMutationVariables = {
  input?: CreateBookingInput,
  condition?: ModelBookingConditionInput | null,
};

export type CreateBookingMutation = {
  createBooking?:  {
    __typename: "Booking",
    id: string,
    name?: string | null,
    email?: string | null,
    partySize?: number | null,
    date: string,
    time: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateBookingMutationVariables = {
  input?: UpdateBookingInput,
  condition?: ModelBookingConditionInput | null,
};

export type UpdateBookingMutation = {
  updateBooking?:  {
    __typename: "Booking",
    id: string,
    name?: string | null,
    email?: string | null,
    partySize?: number | null,
    date: string,
    time: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteBookingMutationVariables = {
  input?: DeleteBookingInput,
  condition?: ModelBookingConditionInput | null,
};

export type DeleteBookingMutation = {
  deleteBooking?:  {
    __typename: "Booking",
    id: string,
    name?: string | null,
    email?: string | null,
    partySize?: number | null,
    date: string,
    time: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetBookingQueryVariables = {
  id?: string,
};

export type GetBookingQuery = {
  getBooking?:  {
    __typename: "Booking",
    id: string,
    name?: string | null,
    email?: string | null,
    partySize?: number | null,
    date: string,
    time: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListBookingsQueryVariables = {
  filter?: ModelBookingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListBookingsQuery = {
  listBookings?:  {
    __typename: "ModelBookingConnection",
    items?:  Array< {
      __typename: "Booking",
      id: string,
      name?: string | null,
      email?: string | null,
      partySize?: number | null,
      date: string,
      time: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type BookingsByDateQueryVariables = {
  date?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelBookingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type BookingsByDateQuery = {
  bookingsByDate?:  {
    __typename: "ModelBookingConnection",
    items?:  Array< {
      __typename: "Booking",
      id: string,
      name?: string | null,
      email?: string | null,
      partySize?: number | null,
      date: string,
      time: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateBookingSubscription = {
  onCreateBooking?:  {
    __typename: "Booking",
    id: string,
    name?: string | null,
    email?: string | null,
    partySize?: number | null,
    date: string,
    time: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateBookingSubscription = {
  onUpdateBooking?:  {
    __typename: "Booking",
    id: string,
    name?: string | null,
    email?: string | null,
    partySize?: number | null,
    date: string,
    time: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteBookingSubscription = {
  onDeleteBooking?:  {
    __typename: "Booking",
    id: string,
    name?: string | null,
    email?: string | null,
    partySize?: number | null,
    date: string,
    time: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
