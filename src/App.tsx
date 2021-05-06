import React from 'react';
import { ChakraProvider, Button } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider resetCSS>
      <div>hello</div>
      <Button>test</Button>
    </ChakraProvider>
  );
}

export default App;
