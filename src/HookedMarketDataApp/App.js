import React from 'react';
import OrderBook from './OrderBook';
import ExchangeProvider from './ExchangeContextProvider';

function App() { 
  return (
    <ExchangeProvider>
      <header>Market Data with React Hooks</header>
      <OrderBook />
    </ExchangeProvider>
  );
}

export default App;
