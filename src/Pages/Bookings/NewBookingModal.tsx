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
  Box,
  Input,
  FormHelperText,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { RiAddFill } from 'react-icons/ri';
import { formatISO, isBefore, isValid } from 'date-fns';
import {
  addFifteenMinutes,
  convertTimeToDate,
  formatDateAsHeading,
  getToday,
  parseFullDate,
} from '../../utils/dateFns';
import { createBooking } from '../../api/bookings';

export default function NewBookingModal() {
  const { date } = useParams<{ date: string }>();
  const [newBookingModalOpen, setNewBookingModalOpen] = React.useState(false);
  const [bookingDate, setBookingDate] = React.useState(() => {
    if (date === 'all') return getToday();
    return date;
  });

  React.useEffect(() => {
    // Keep the date sync locally
    if (date === 'all') {
      setBookingDate(getToday());
    } else {
      setBookingDate(date);
    }
  }, [date]);

  const [dateError, setDateError] = React.useState('');
  const [startTime, setStartTime] = React.useState('');
  const [endTime, setEndTime] = React.useState('');
  const [frequency, setFrequency] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const fullDate = parseFullDate(bookingDate);

  function handleSubmit() {
    setIsSubmitting(true);
    const targetStart = convertTimeToDate(startTime, fullDate);
    const targetEnd = convertTimeToDate(endTime, fullDate);
    let intermediateTime = targetStart;
    let promises = [];
    while (isBefore(intermediateTime, targetEnd)) {
      for (let i = 0; i < Number(frequency); i++) {
        promises.push(
          createBooking({
            date: bookingDate,
            time: formatISO(intermediateTime, { representation: 'time' }),
          })
        );
      }
      intermediateTime = addFifteenMinutes(intermediateTime);
    }
    Promise.allSettled(promises).then(() => {
      setIsSubmitting(false);
      setNewBookingModalOpen(false);
    });
  }

  return (
    <>
      <Button
        rightIcon={<RiAddFill />}
        colorScheme="teal"
        position="fixed"
        onClick={() => setNewBookingModalOpen(true)}
        bottom={8}
        right={8}
        boxShadow="lg"
      >
        Add
      </Button>
      <Modal
        isOpen={newBookingModalOpen}
        onClose={() => setNewBookingModalOpen(false)}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            New Bookings for {formatDateAsHeading(fullDate)}
          </ModalHeader>
          <ModalCloseButton />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <ModalBody>
              <Box>
                <FormControl
                  id="date"
                  isRequired
                  isInvalid={Boolean(dateError)}
                >
                  <FormLabel>Booking Date</FormLabel>
                  <Input
                    id="date"
                    type="date"
                    defaultValue={bookingDate}
                    required
                    onBlur={({ target }) => {
                      const date = parseFullDate(target.value);
                      if (isValid(date)) {
                        setBookingDate(target.value);
                        setDateError('');
                      } else {
                        setDateError(
                          'Please eneter a date in YYYY-MM-DD format'
                        );
                      }
                    }}
                  />
                  <FormHelperText>{dateError}</FormHelperText>
                </FormControl>
                <FormControl id="startTime" isRequired mt={2}>
                  <FormLabel>Start Time</FormLabel>
                  <Input
                    id="startTime"
                    type="time"
                    value={startTime}
                    min="09:00" // times could have come from org specific data loaded
                    max="23:00"
                    step="900" // 60 seconds * 15
                    required
                    onChange={({ target }) => {
                      setStartTime(target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="endTime" isRequired mt={2}>
                  <FormLabel>End Time</FormLabel>
                  <Input
                    type="time"
                    value={endTime}
                    min="09:00"
                    max="23:00"
                    step="900"
                    required
                    onChange={({ target }) => {
                      setEndTime(target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="frequency" isRequired mt={2}>
                  <FormLabel>Frequency</FormLabel>
                  <FormHelperText>
                    How many reservations should be availabe every 15 minutes?
                  </FormHelperText>
                  <Input
                    type="number"
                    value={frequency}
                    min={1}
                    onChange={({ target }) => setFrequency(target.value)}
                    required
                  />
                </FormControl>
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                colorScheme="blue"
                mr={3}
                isLoading={isSubmitting}
              >
                Create
              </Button>
              <Button
                onClick={() => setNewBookingModalOpen(false)}
                variant="ghost"
              >
                Close
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
