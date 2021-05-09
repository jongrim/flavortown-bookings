import * as React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Image,
  Text,
  Icon,
  Box,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { FiClock } from 'react-icons/fi';
import { updateBooking } from '../../api/bookings';
import { Booking } from '../../API';
import { useBookings } from '../../Pages/Bookings/BookingsProvider';
import {
  convertISOStringToTime,
  formatDateAsHeading,
  parseFullDate,
} from '../../utils/dateFns';
import { sortByTime } from '../../Pages/Bookings/utils';
import Heading from '../../Components/Heading/Heading';

interface UpdateBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBooking: Booking;
}

export default function UpdateBookingModal({
  isOpen,
  onClose,
  initialBooking,
}: UpdateBookingModalProps) {
  const [trackedId, setTrackedId] = React.useState(initialBooking?.id ?? '');
  const {
    bookingsState: { bookings, bookingsByDate },
    loadBookingsForDate,
  } = useBookings();
  const booking = bookings[trackedId];

  const [trackedDate, setTrackedDate] = React.useState(booking?.date ?? '');
  const [name, setName] = React.useState(booking?.name ?? '');
  const [email, setEmail] = React.useState(booking?.email ?? '');
  const [partySize, setPartySize] = React.useState(booking?.partySize ?? '');

  React.useEffect(() => {
    /**
     * The booking may change if the user chooses a different date
     * and time, which is a different booking item, so sync
     */
    setTrackedId(booking?.id ?? '');
    setTrackedDate(booking?.date ?? '');
    setName(booking?.name ?? '');
    setEmail(booking?.email ?? '');
    setPartySize(booking?.partySize ?? '');
  }, [booking]);

  React.useEffect(() => {
    loadBookingsForDate(trackedDate);
  }, [trackedDate, loadBookingsForDate]);

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function handleSubmit() {
    if (!booking) return;
    setIsSubmitting(true);
    await updateBooking({
      id: booking.id,
      name,
      email,
      partySize: Number(partySize),
    });
    setIsSubmitting(false);
    onClose();
  }

  const availableBookingForDate =
    bookingsByDate[trackedDate]
      ?.map((id) => bookings[id])
      .filter((booking) => !booking.name)
      .sort(sortByTime) ?? [];

  const fullDate = parseFullDate(booking?.date);
  const time = convertISOStringToTime(`${booking.date}T${booking.time}`);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <Image
            src="https://images.unsplash.com/photo-1555254820-de584beebc96?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1598&q=80"
            alt="patio"
            objectFit="cover"
            h={48}
            borderTopRadius="md"
          />
          <ModalHeader pb={0}>{formatDateAsHeading(fullDate)}</ModalHeader>
          <Flex px={6} alignItems="center" color="gray.600">
            <Icon as={FiClock} />
            <Text pl={2}>{time}</Text>
          </Flex>
          <ModalCloseButton />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <ModalBody>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  id="name"
                  value={name}
                  required
                  onChange={({ target }) => {
                    setName(target.value);
                  }}
                />
              </FormControl>
              <FormControl id="email" isRequired mt={2}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  required
                  onChange={({ target }) => {
                    setEmail(target.value);
                  }}
                />
              </FormControl>
              <FormControl id="partySize" isRequired mt={2}>
                <FormLabel>Party Size</FormLabel>
                <Input
                  type="number"
                  value={partySize}
                  min={1}
                  onChange={({ target }) => setPartySize(target.value)}
                  required
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                colorScheme="blue"
                w="full"
                isLoading={isSubmitting}
              >
                Book
              </Button>
            </ModalFooter>
          </form>
          <Divider my={6} />
          <Box px={6} mb={6}>
            <Heading as="h4" size="sm">
              Not what you're looking for?
            </Heading>
            <Text color="gray.600" mt={1} mb={2}>
              Select a new date, and then an available time
            </Text>
            <FormControl id="date" isRequired>
              <FormLabel>Date</FormLabel>
              <Input
                id="date"
                type="date"
                value={trackedDate}
                required
                onChange={({ target }) => {
                  setTrackedDate(target.value);
                }}
              />
            </FormControl>
            <FormControl id="time" isRequired mt={2}>
              <FormLabel>Time</FormLabel>
              <Select
                placeholder="Select a time"
                onChange={({ target }) => setTrackedId(target.value)}
              >
                {availableBookingForDate.map(({ date, time, id }) => (
                  <option key={id} value={id}>
                    {convertISOStringToTime(`${date}T${time}`)}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}
