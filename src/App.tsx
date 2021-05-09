import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ChakraProvider, Grid } from '@chakra-ui/react';
import AppHeader from './Components/AppHeader/AppHeader';
import Nav from './Components/Nav/Nav';
import Main from './Components/Main/Main';
import BookingsProvider from './Pages/Bookings/BookingsProvider';
import Tables from './Pages/Tables/Tables';
import Bookings from './Pages/Bookings/Bookings';
import NewBookingModal from './Pages/Bookings/NewBookingModal';

function App() {
  return (
    <ChakraProvider resetCSS>
      <BrowserRouter>
        <Grid
          templateAreas={[
            `
        "header"
        "nav"
        "main"
        `,
            `
        "header header"
        "nav main"
        `,
          ]}
          templateColumns={['1fr', '150px 1fr']}
          templateRows={['auto auto 1fr', 'auto 1fr']}
          fontFamily="Lato"
          h="full"
        >
          <AppHeader />
          <Nav />
          <Main>
            <Switch>
              <Route path="/bookings/:date">
                <BookingsProvider>
                  <Bookings />
                  <NewBookingModal />
                </BookingsProvider>
              </Route>
              <Route path="/tables">
                <Tables />
              </Route>
              <Redirect from="*" to="/bookings/all" />
            </Switch>
          </Main>
        </Grid>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
