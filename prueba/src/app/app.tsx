import React from 'react'
import Router from '../_routing/router';
import { BrowserRouter } from 'react-router-dom';
import StoreProvider from '../_store/store';

/**
 * App component that renders the BrowserRouter and Router components.
 *
 * @return {JSX.Element} The rendered JSX element
 */
const App = () => {
  return (
    <StoreProvider>
      <BrowserRouter>
         <Router/>
      </BrowserRouter>
    </StoreProvider>
  
  )
}

export default App;