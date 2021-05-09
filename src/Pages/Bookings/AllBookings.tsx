import * as React from 'react';
import {
  Box,
  Text,
  Link,
  Grid,
  HStack,
  Icon,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Button,
  FormHelperText,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown } from 'react-icons/fa';
import { useBookings } from './BookingsProvider';
import Heading from '../../Components/Heading/Heading';
import { formatDateAsHeading, parseFullDate } from '../../utils/dateFns';
import { Link as ReactRouterLink } from 'react-router-dom';
import FullScreenSpinner from '../../Components/FullScreenSpinner/FullScreenSpinner';
import { isValid } from 'date-fns';

const randomNumber = (Math.random() * 10).toFixed(2);

export default function AllBookings() {
  const {
    bookingsState: { bookingsByDate, bookings },
    isLoading,
  } = useBookings();

  const [date, setDate] = React.useState('');
  const [dateError, setDateError] = React.useState('');
  const history = useHistory();

  const allBookingsGroupedByDate = Object.entries(bookingsByDate).sort(
    ([dateA], [dateB]) => {
      if (dateA < dateB) return -1;
      if (dateB < dateA) return 1;
      return 0;
    }
  );

  return (
    <Box py={1}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const maybeDate = parseFullDate(date);
          if (isValid(maybeDate)) {
            history.push(`/bookings/${date}`);
          } else {
            setDateError('Please eneter a date in YYYY-MM-DD format');
          }
        }}
      >
        <Flex alignItems="flex-end" w="lg" mx="auto" mb={6}>
          <FormControl
            id="date"
            mr={3}
            isRequired
            isInvalid={Boolean(dateError)}
          >
            <FormLabel>Jump to Date</FormLabel>
            {dateError && <FormHelperText>{dateError}</FormHelperText>}
            <Input
              name="date"
              type="date"
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />
          </FormControl>
          <Button colorScheme="teal" variant="outline" type="submit">
            Go
          </Button>
        </Flex>
      </form>
      {isLoading ? (
        <FullScreenSpinner />
      ) : (
        <Grid
          gap={4}
          templateColumns={[
            'repeat(1, 1fr)',
            'repeat(1, 1fr)',
            'repeat(2, 1fr)',
            'repeat(3, 1fr)',
          ]}
        >
          {allBookingsGroupedByDate.map(([date, bookingIds], i) => {
            const fullDate = parseFullDate(date);
            let free = 0;
            let taken = 0;
            bookingIds.forEach((id) => {
              if (bookings[id].name) {
                taken += 1;
              } else {
                free += 1;
              }
            });
            return (
              <Link
                as={ReactRouterLink}
                to={`/bookings/${date}`}
                key={date}
                cursor="pointer"
                _hover={{
                  textDecoration: 'none',
                }}
              >
                <Box
                  px={4}
                  py={3}
                  borderRadius="md"
                  border="1px solid"
                  borderColor="gray.100"
                  boxShadow="md"
                  _hover={{ boxShadow: 'lg' }}
                >
                  <Heading size="sm">{formatDateAsHeading(fullDate)}</Heading>
                  <Text>{free} available</Text>
                  <HStack spacing={3}>
                    <Text fontSize="lg" fontWeight="600">
                      {taken} booked
                    </Text>
                    {i % 2 === 0 ? (
                      <HStack>
                        <Icon
                          as={FaRegArrowAltCircleUp}
                          h={4}
                          w={4}
                          color="green.400"
                        />
                        <Text fontSize="sm">
                          {randomNumber}% higher than usual
                        </Text>
                      </HStack>
                    ) : (
                      <HStack>
                        <Icon
                          as={FaRegArrowAltCircleDown}
                          h={4}
                          w={4}
                          color="red.400"
                        />
                        <Text fontSize="sm">
                          {randomNumber}% lower than usual
                        </Text>
                      </HStack>
                    )}
                  </HStack>
                  <Text>{bookingIds.length} total</Text>
                </Box>
              </Link>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}
