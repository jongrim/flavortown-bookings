import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Icon, Flex, Grid, HStack, Text } from '@chakra-ui/react';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import {
  convertISOStringToTime,
  formatDateAsHeading,
  getTomorrowURL,
  getYesterdayURL,
  parseFullDate,
} from '../../utils/dateFns';
import LinkButton from '../../Components/LinkButton/LinkButton';
import Heading from '../../Components/Heading/Heading';
import { Booking } from '../../API';
import UpdateBookingModal from './UpdateBookingModal';
import { useBookings } from './BookingsProvider';
import { sortByTime } from './utils';
import FullScreenSpinner from '../../Components/FullScreenSpinner/FullScreenSpinner';

export default function DateBookings() {
  const { todaysBookings, isLoading } = useBookings();
  const { date } = useParams<{ date: string }>();

  const fullDate = parseFullDate(date);
  const yesterdayPath = getYesterdayURL(fullDate);
  const tomorrowPath = getTomorrowURL(fullDate);

  const [bookingToUpdate, setBookingToUpdate] = React.useState<Booking>();

  const [booked, available] = React.useMemo(() => {
    const free: Booking[] = [];
    const taken: Booking[] = [];
    todaysBookings.forEach((booking) => {
      if (booking.name) {
        taken.push(booking);
      } else {
        free.push(booking);
      }
    });
    return [taken.sort(sortByTime), free.sort(sortByTime)];
  }, [todaysBookings]);

  return (
    <Box px={4} h="full">
      <Flex py={4} justifyContent="center" alignItems="center">
        <LinkButton
          to={`/bookings/${yesterdayPath}`}
          aria-label="go to yesterday"
        >
          <Icon as={FaLongArrowAltLeft} h={8} w={8} />
        </LinkButton>
        <Heading as="h1" mx={12}>
          {formatDateAsHeading(fullDate)}
        </Heading>
        <LinkButton
          to={`/bookings/${tomorrowPath}`}
          aria-label="go to tomorrow"
        >
          <Icon as={FaLongArrowAltRight} h={8} w={8} />
        </LinkButton>
      </Flex>
      <Flex justifyContent="center">
        <HStack
          spacing={4}
          divider={
            <Box px={1} mx={1} border="none">
              —
            </Box>
          }
        >
          <Text color="gray.600">{available.length} available</Text>
          <Text color="gray.600">{booked.length} booked</Text>
          <Text color="gray.600">{booked.length + available.length} total</Text>
        </HStack>
      </Flex>
      {isLoading && todaysBookings.length === 0 ? (
        /**
         * we cache bookings loaded for each date, so only show the spinner when there are no cached
         * bookings to display
         */
        <FullScreenSpinner />
      ) : (
        <>
          <Box>
            <Heading as="h3" size="md" mb={4} id="available">
              Available
            </Heading>
            <Grid
              templateColumns={[
                'repeat(1, minmax(100px, 1fr))',
                'repeat(3, minmax(100px, 1fr))',
                'repeat(5, minmax(100px, 1fr))',
              ]}
              gap={8}
            >
              {available.map((booking) => (
                <Button
                  key={booking.id}
                  colorScheme="green"
                  variant="outline"
                  onClick={() => setBookingToUpdate(booking)}
                >
                  {convertISOStringToTime(`${booking.date}T${booking.time}`)}
                </Button>
              ))}
            </Grid>
          </Box>
          <Box mt={8}>
            <Heading as="h3" size="md" mb={4} id="booked">
              Booked
            </Heading>
            <Grid
              templateColumns={[
                'repeat(1, minmax(100px, 1fr))',
                'repeat(3, minmax(100px, 1fr))',
                'repeat(5, minmax(100px, 1fr))',
              ]}
              gap={8}
            >
              {booked.map((booking) => (
                <Button
                  key={booking.id}
                  colorScheme="blue"
                  onClick={() => setBookingToUpdate(booking)}
                >
                  {convertISOStringToTime(`${booking.date}T${booking.time}`)}
                </Button>
              ))}
            </Grid>
          </Box>
        </>
      )}
      {bookingToUpdate && (
        <UpdateBookingModal
          isOpen
          onClose={() => setBookingToUpdate(undefined)}
          initialBooking={bookingToUpdate}
        />
      )}
    </Box>
  );
}
