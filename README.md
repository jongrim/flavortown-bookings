# Flavortown Bookings

This is a sample project created to explore the design of a restaurant bookings platform. You can [view this project live](https://main.d2lk3mm8k1gcdu.amplifyapp.com/bookings/all) or clone and (run locally)[#running-locally].

## System design

There are three user stories covered by the system:

1. Create new bookings to add inventory
2. Update a booking so that it is booked or available
3. View available bookings

The application structure provides two routes for working with bookings:

- `/bookings/all`: this page shows a snapshot of bookings available and booked on each day. The user can then select a day to jump to it and work with individual bookings.
- `/bookings/:date`: this is a dynamic page which takes a date in YYYY-MM-DD format. On this page, the user is shown the bookings for this date, and they are broken into Available and Booked categories.

To ensure a user can only operate on an existing booking, the Dates page displays each booking in a grid format sorted by time. Selecting a booking opens a dialog to edit the booking's details including the guest name, email, and party size. For simplicity, a booking is considered "booked" if there is a name assigned to the booking.

Results are live updating and available across clients once the update is received via web socket. Additionally, data requests a cached to allow fast navigation between dates. If a user has visited a date and loaded its bookings, they display immediately. The system still fetches bookings in the background and will update the display if needed.

To create new booking inventory, there is an Add button available from both bookings pages. It sits in the lower right corner, and clicking it opens a dialog where the user provides information about what bookings to create. If opened from a Date page, it is pre-filled with that date, and if opened from the `/all` route it defaults to today's date.

## Tech stack

- TypeScript
- React
- DynamoDB database with GraphQL API
- Chakra UI for styling and UI components

## Running locally

You can run the project locally by cloning and then running the `amplify init` command in the root of the project. When prompted, create your own backend so that you have your own sandbox. Learn more [about the per developer sandbox flow](https://docs.aws.amazon.com/amplify/latest/userguide/team-workflows-with-amplify-cli-backend-environments.html#sandbox_).

You will then need to create the API in your sandbox. Run `amplify update api` to create your settings for the API, and then `amplify push` to provision it.

Note, this requires the amplify CLI tool to be installed and you should be familiar with initializing Amplify projects. [Learn more about Amplify and how to get started](https://docs.amplify.aws/).
